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
  test: {
    globals: true,
    environment: 'jsdom',
    api: {
      host: '0.0.0.0',
      port: 51204
    },
    env: {
      TZ: 'Europe/Berlin'
    },
    include: ['tests/**/*.{spec,test}.{js,ts}'],
    setupFiles: ['./tests/setup.js'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      include: ['src/utils/*.js', 'src/mixins/*.js', 'src/lib/*.js', 'src/components/**/*.vue'],
      reporter: ['clover', 'json', 'lcov', 'text']
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: '__demos_europe_demosplan_ui',
      formats: ['es']
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
