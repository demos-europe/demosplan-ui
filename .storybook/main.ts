import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: [
    '../src/index.mdx',
    '../src/components/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/directives/**/*.mdx',
    '../tokens/**/*.mdx'
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs'
  ],

  framework: '@storybook/vue3-vite'
}

export default config
