import { createI18n } from 'vue-i18n'
import cn from '../locales/zh-CN.json'
import en from '../locales/en-US.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'zh-CN',
    messages: {
      'zh-CN': cn,
      'en-US': en,
    },
  })

  vueApp.use(i18n)
})
