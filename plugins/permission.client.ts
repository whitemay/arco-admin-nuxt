import type { DirectiveBinding } from 'nuxt/dist/app/compat/vue-demi'

export default defineNuxtPlugin((nuxtApp) => {
  function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    const userStore = useUserStore()
    const { role } = userStore

    if (Array.isArray(value)) {
      if (value.length > 0) {
        const permissionValues = value

        const hasPermission = permissionValues.includes(role)
        if (!hasPermission && el.parentNode)
          el.parentNode.removeChild(el)
      }
    }
    else {
      throw new TypeError(`need roles! Like v-permission="['admin','user']"`)
    }
  }

  nuxtApp.vueApp.directive('permission', /* (el, binding) => {
    // this will be called for both `mounted` and `updated`
    checkPermission(el, binding)
  } */ {
      mounted: (el, binding) => checkPermission(el, binding),
      updated: (el, binding) => checkPermission(el, binding),
    })
})
