export default eventHandler((event) => {
  // 检查请求是否以/api开头
  if (event.path.startsWith('/api') && !event.path.startsWith('/api/auth')) {
    // 获取cookie中的token
    checkAuth(event)
  }
})
