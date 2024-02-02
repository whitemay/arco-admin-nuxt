export function successResponseWrap(data: unknown): App.ServerResult {
  return {
    data,
    status: 'ok',
    msg: '请求成功',
    code: 200,
  }
}

export function failResponseWrap(data: unknown, msg: string, code = 500): App.ServerResult {
  return {
    data,
    status: 'fail',
    msg,
    code,
  }
}
