export function useRequest<T>(
  api: () => Promise<App.ServerResult<T>>,
  defaultValue = [] as unknown as T,
  isLoading = true,
) {
  const [loading, { setFalse }] = useBoolean(isLoading)
  const response = ref<T>(defaultValue)

  api()
    .then(({ data }: any) => {
      response.value = data
    })
    .finally(() => {
      setFalse()
    })
  return { loading, response }
}
