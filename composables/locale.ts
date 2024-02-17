import { useI18n } from 'vue-i18n'

export function useLocale() {
  const i18 = useI18n()
  const currentLocale = computed(() => {
    return i18.locale.value
  })
  const changeLocale = (value: string) => {
    if (i18.locale.value === value)
      return

    i18.locale.value = value
    localStorage.setItem('arco-locale', value)
    useNotify({ type: 'success', config: i18.t('navbar.action.locale') })
    // Message.success(i18.t('navbar.action.locale'))
  }
  return {
    currentLocale,
    changeLocale,
  }
}
