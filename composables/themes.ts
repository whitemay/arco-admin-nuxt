export function useThemes() {
  const appStore = useAppStore()
  const isDark = computed(() => {
    return appStore.theme === 'dark'
  })
  return {
    isDark,
  }
}
