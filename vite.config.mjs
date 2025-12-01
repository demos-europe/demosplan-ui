import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    postcss: './postcss.config.mjs'
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: '__demos_europe_demosplan_ui',
      fileName: (format) => {
        if (format === 'es') return 'demosplan-ui.esm.js'
        if (format === 'umd') return 'demosplan-ui.umd.js'
        return `demosplan-ui.${format}.js`
      },
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [
        'vue',
        '@braintree/sanitize-url',
        /^@uppy\/.+$/,
        'dayjs',
        'dompurify',
        'lscache',
        'plyr',
        'tippy.js',
        'uuid',
        'v-tooltip',
        'vue-multiselect',
        'vuedraggable'
      ],
      output: {
        inlineDynamicImports: true,
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'demosplan-ui.css'
          return assetInfo.name
        }
      }
    }
  }
})