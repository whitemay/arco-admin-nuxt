declare module '#app' {
  interface PageMeta {
    locale?: string
    ignoreCache?: boolean
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
