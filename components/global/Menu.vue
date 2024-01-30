import type { GlobalMenuItem } from '#build/components';
<script setup lang="ts">
import { AMenuItem } from '#components'

const collapsed = ref(false)
const openKeys = ref<string[]>([])
const selectedKey = ref<string[]>([])
const appStore = useAppStore()
const topMenu = computed(() => appStore.topMenu)

function setCollapse(val: boolean) {
  if (appStore.device === 'desktop')
    appStore.updateSettings({ menuCollapse: val })
}

await appStore.fetchServerMenuConfig()
const { menuTree } = useMenuTree()
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
