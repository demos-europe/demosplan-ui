import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

/*
 * vue-sliding-pagination ships only a UMD that calls require('vue'). Rolldown's own handling leaves either a
 * `__require` shim that throws in browsers or a facade reading `vue["module.exports"]`, which webpack consumers
 * reject as a missing export. Rewriting the UMD into an ES module here avoids both.
 */
const vueSlidingPaginationUmdToEsm = () => ({
  name: 'vue-sliding-pagination-umd-to-esm',
  transform (code, id) {
    if (!id.endsWith('vue-sliding-pagination/dist/vue-sliding-pagination.umd.js')) {
      return
    }

    return {
      code: [
        "import * as vue from 'vue'",
        'const module = { exports: {} }',
        'const exports = module.exports',
        code.replace(/require\("vue"\)/g, 'vue'),
        'export default module.exports.default'
      ].join('\n'),
      map: null
    }
  }
})

export default defineConfig({
  plugins: [vue(), vueSlidingPaginationUmdToEsm()],
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, 'src')
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
      entry: path.resolve(import.meta.dirname, 'src/index.js'),
      name: '__demos_europe_demosplan_ui',
      formats: ['es']
    },
    rolldownOptions: {
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
