import process from 'node:process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import { pwa } from './config/pwa'
import { appDescription } from './config/const'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    'nuxt-lodash',
    '@unocss/nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
    'arco-design-nuxt-module',
    // '@vrx-arco/nuxt',
    '@nuxtjs/color-mode',
    '@sidebase/nuxt-auth',
    'nuxt-module-eslint-config',
  ],

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
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
    importStyle: 'css',
    // theme: '@arco-themes/vue-digitforce',
  },
  css: [
    // '@unocss/reset/tailwind-compat.css', // 怀疑Arco做了，所以不再引入
    '@arco-design/web-vue/dist/arco.min.css',
  ],
  components: {
    dirs: ['components'],
  },
  imports: {
    dirs: ['stores'],
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  runtimeConfig: {
    jwt: { secret: process.env.JWT_SECRET || 'dummy_secret' },
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

  pwa,
  ssr: false,

  devtools: {
    enabled: true,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslintConfig: {
    setup: false,
  },

  build: {
    transpile: ['jsonwebtoken', /vue-i18n/],
  },

  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./assets/style/global.less";',
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
  },
})
