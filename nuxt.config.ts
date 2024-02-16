import process from 'node:process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import type { NuxtPage } from 'nuxt/schema'
import { pwa } from './config/pwa'
import { appDescription, appName } from './config/const'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    'nuxt-lodash',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
    'arco-design-nuxt-module',
    // '@vrx-arco/nuxt',
    '@nuxtjs/color-mode',
    '@sidebase/nuxt-auth',
    'nuxt-module-eslint-config',
    // '@nuxtjs/eslint-module',
    '@vite-pwa/nuxt',
    '@nuxtjs/html-validator',
    'nuxt-particles',
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      viewport: 'width=device-width,initial-scale=1',
      title: appName,
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
  arco: {
    importStyle: 'css', // 目前没有考虑使用less变量，所以直接引入css
    // theme: '@arco-themes/vue-digitforce', // 主题会自动引入整体CSS。如果不使用主题，就需要在CSS段中引入Arco的CSS
  },
  auth: {
    provider: {
      type: 'local',
      endpoints: {
        getSession: { path: '/user' },
        // refresh: { path: '/refresh', method: 'post' },
      },
      pages: {
        login: '/login',
      },
      token: {
        // signInResponseTokenPointer: '/tokens/accessToken',
        maxAgeInSeconds: 60 * 5, // 5 min
        sameSiteAttribute: 'lax',
      },
      /* refreshToken: {
        signInResponseRefreshTokenPointer: '/tokens/refreshToken',
      }, */
    },
    session: {
      enableRefreshPeriodically: 3600 * 1000, // 1 hour
      enableRefreshOnWindowFocus: false,
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },
  colorMode: {
    classSuffix: '',
  },
  css: [
    // '@unocss/reset/tailwind-compat.css', // 怀疑Arco做了，所以不再引入
    '@arco-design/web-vue/dist/arco.min.css',
  ],
  components: {
    dirs: ['components'],
  },
  eslintConfig: {
    setup: false,
  },
  pwa,
  unocss: {
    components: false,
    // injectPosition: 'first',
  },

  build: {
    transpile: ['jsonwebtoken', /vue-i18n/, /echarts/, 'zrender', 'tslib'],
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },
  features: {
    // For UnoCSS
    inlineStyles: false,
  },
  hooks: { // 忽略掉ts文件结尾的page router，以及components目录下的文件
    'pages:extend': function (pages) {
      // remove routes
      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove = []
        for (const page of pages) {
          if (pattern.test(page.file!))
            pagesToRemove.push(page)
          else
            removePagesMatching(pattern, page.children)
        }
        for (const page of pagesToRemove)
          pages.splice(pages.indexOf(page), 1)
      }
      removePagesMatching(/(\/components\/|\.ts$)/, pages)
    },
  },
  imports: {
    dirs: ['stores'],
    presets: [{
      from: 'v3hooks',
      imports: ['useBoolean'],
    }],
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },
  runtimeConfig: {
    jwt: { secret: process.env.JWT_SECRET || 'dummy_secret' },
  },
  sourcemap: {
    // 是否生成 sourcemaps。
    server: true,
    client: false,
  },
  ssr: false,
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./assets/style/global.less"; @import "./assets/style/breakpoint.less"; ',
        },
      },
    },
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
    },
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json'),
        ],
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            arco: ['@arco-design/web-vue'],
            chart: ['echarts', 'vue-echarts'],
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  },
})
