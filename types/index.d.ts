declare module '#app' {
  interface PageMeta {
    hidden?: boolean
    icon?: string
    ignoreCache?: boolean
    locale?: string
    order?: number
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
