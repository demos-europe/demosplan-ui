import React from 'react'
import PropTypes from 'prop-types'

const extractPaletteColors = (tokens) => {
    const result = []
    for (let key in tokens) {
        if (typeof tokens[key] === 'object' && tokens[key] !== null) {
            if (tokens[key].value) {
                const localPath = tokens[key].path.toSpliced(0, 2)
                const keyName = localPath.filter(Boolean).join('-').replace(/-DEFAULT/g, '')
                const nameModified = keyName => {
                    let k = keyName.replace(/^color-/, '(text|bg|border...)-')
                    k =  k.replace(/^textColor-/, 'text-')
                    k =  k.replace(/^backgroundColor-/, 'bg-')
                    return  k.replace(/^borderColor-/, 'border-')
                }
                result.push({
                    twClass: keyName.replace(/^(color|textColor|backgroundColor|borderColor)-/, 'bg-'),
                    name: keyName,
                    nameModified: nameModified(keyName),
                    value: tokens[key].value,
                    description: tokens[key].$description
                })
            } else {
                result.push(...extractPaletteColors(tokens[key]))
            }
        }
    }
    return result
}


const plugins = ['color', 'textColor', 'backgroundColor', 'borderColor']

const groupedTokens = {}
plugins.forEach(plugin => {
    groupedTokens[plugin] = {}
})

const tailwindModules = extractPaletteColors(require('../../tokens/dist/js/color.ui-tailwind').color['ui-tailwind'])

tailwindModules.forEach(token => {
    plugins.forEach(plugin => {
        if (token.name.startsWith(`${plugin}-`)) {
            groupedTokens[plugin][token.name] = token
        }
    })
})

const ColorTableGrouped = ({module}) => (
  <table>
    <thead>
    <tr>
        <th className="whitespace-nowrap">Color</th>
        <th className="whitespace-nowrap">Name</th>
        <th className="whitespace-nowrap">Hex value</th>
        <th className="whitespace-nowrap">Description</th>
    </tr>
    </thead>
    <tbody>
    {Object.keys(groupedTokens[module]).map((color) => (
        <tr className="align-top" key={color.name}>
            <td className="whitespace-nowrap">
                <div className={'w-4 h-4'} style={{ backgroundColor: groupedTokens[module][color].value}}></div>
            </td>
            <td className="whitespace-nowrap">{groupedTokens[module][color].nameModified}</td>
            <td className="whitespace-nowrap">{groupedTokens[module][color].value}</td>
            <td>{groupedTokens[module][color].description}</td>
        </tr>
    ))}
    </tbody>
  </table>
)

ColorTableGrouped.propTypes = {
    module: PropTypes.string.isRequired
}

export default ColorTableGrouped
