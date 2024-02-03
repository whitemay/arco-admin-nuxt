declare module '#app' {
  interface PageMeta {
    hidden?: boolean
    icon?: string
    ignoreCache?: boolean
    locale?: string
    noAffix?: boolean
    order?: number
  }
  interface ServerResult {
    data: any
    status: string
    msg: string
    code: number
  }
}

// declare global {}

// It is always important to ensure you import/export something when augmenting a type
// export {}
declare module 'sortablejs'
