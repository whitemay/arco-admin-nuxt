<script setup lang="ts">
import type { RouteRecordRaw } from '#vue-router'

const openKeys = ref<string[]>([])
const selectedKey = ref<string[]>([])
const appStore = useAppStore()

const collapsed = computed({
  get() {
    if (appStore.device === 'desktop')
      return appStore.menuCollapse
    return false
  },
  set(value: boolean) {
    appStore.updateSettings({ menuCollapse: value })
  },
})
const topMenu = computed(() => appStore.topMenu)

await appStore.fetchServerMenuConfig()
const { menuTree } = useMenuTree()

function findMenuOpenKeys(target: string) {
  const result: string[] = []
  let isFind = false
  const backtrack = (item: RouteRecordRaw, keys: string[]) => {
    if (item.name === target) {
      isFind = true
      result.push(...keys)
      return
    }
    if (item.children?.length) {
      item.children.forEach((el) => {
        backtrack(el, [...keys, el.name as string])
      })
    }
  }
  menuTree.value.forEach((el: RouteRecordRaw) => {
    if (isFind)
      return // Performance optimization
    backtrack(el, [el.name as string])
  })
  return result
}

const subscription = useRouteSubscribe((newRoute) => {
  const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta
  if (requiresAuth && (!hideInMenu || activeMenu)) {
    const menuOpenKeys = findMenuOpenKeys(
      (activeMenu || newRoute.name) as string,
    )

    const keySet = new Set([...menuOpenKeys, ...openKeys.value])
    openKeys.value = [...keySet]

    selectedKey.value = [
      activeMenu as string || menuOpenKeys[menuOpenKeys.length - 1],
    ]
  }
}, true)

onUnmounted(() => subscription.unsubscribe())

function setCollapse(val: boolean) {
  if (appStore.device === 'desktop')
    appStore.updateSettings({ menuCollapse: val })
}
</script>

<template>
  <a-menu
    v-model:collapsed="collapsed"
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKey"
    :mode="topMenu ? 'horizontal' : 'vertical'"
    :auto-open="false"
    auto-open-selected
    :level-indent="34"
    style="height: 100%;width:100%;"
    @collapse="setCollapse"
  >
    <GlobalMenuItems :items="menuTree" />
  </a-menu>
</template>
