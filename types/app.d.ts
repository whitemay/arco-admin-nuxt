declare namespace App {
  export interface ServerResult<T = any> {
    data: T
    status: string
    msg: string
    code: number
  }
}
