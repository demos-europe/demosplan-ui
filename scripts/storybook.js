const { spawn } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

// Storybook >= 10.6.2 listens on loopback only; inside a container the host browser needs the container's own address
const getContainerAddress = () => {
  if (!fs.existsSync('/.dockerenv')) {
    return null
  }

  const addresses = Object.values(os.networkInterfaces())
    .flat()
    .filter(({ family, internal }) => family === 'IPv4' && !internal)

  return addresses.length > 0 ? addresses[0].address : null
}

const userArgs = process.argv.slice(2)
const args = ['dev', '-p', '3000', '--no-open']
const address = getContainerAddress()

if (address && !userArgs.includes('--host')) {
  args.push('--host', address)
}

const storybookPackagePath = require.resolve('storybook/package.json')
const storybookBin = path.join(path.dirname(storybookPackagePath), require(storybookPackagePath).bin)

const child = spawn(process.execPath, [storybookBin, ...args, ...userArgs], { stdio: 'inherit' })

child.on('exit', code => process.exit(code ?? 1))
