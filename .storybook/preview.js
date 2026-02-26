import './theme.css'

import { html as beautifyHtml }from 'js-beautify'
import { setup } from '@storybook/vue3'

setup((app) => {
  app.directive('dp-validate-multiselect', {
    // This creates an empty directive implementation that won't throw errors
    mounted: () => {},
    updated: () => {}
  })
})

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    transformSource: (src) => {
      /*
       * This strips the `<template>` tags from the source code shown in the "show code" view.
       * 'js-beautify' is responsible for fixing code indentation afterwards.
       */
      const strippedTemplate = src.substr(0, src.length - 12).substr(10)
      return beautifyHtml(strippedTemplate)
    }
  }
}
export const tags = ['autodocs'];
