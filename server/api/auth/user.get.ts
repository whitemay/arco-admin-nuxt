export default eventHandler((event) => {
  const user = ensureAuth(event)
  return user
})
