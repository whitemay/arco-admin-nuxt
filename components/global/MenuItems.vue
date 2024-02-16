<script setup lang="ts">
// 构造本组件需要的数据类型定义
interface Meta {
  icon?: string
  locale?: string
}
interface RouteRecordItem {
  path: string
  name: string
  children?: RouteRecordItem[]
  meta?: Meta
}
interface Props {
  items: RouteRecordItem[]
}

const props = withDefaults(defineProps<Props>(), { items: () => [] })
</script>

<template>
  <template v-for="item in props.items">
    <a-sub-menu v-if="item.children && item.children.length !== 0" :key="item.name">
      <template v-if="item.meta?.icon" #icon>
        <icon :name="item.meta.icon" />
      </template>
      <template #title>
        {{ $t(item.meta?.locale || '') }}
      </template>
      <GlobalMenuItems :items="item.children" />
    </a-sub-menu>
    <a-menu-item v-else :key="item.path" @click="() => navigateTo(item)">
      <template v-if="item.meta?.icon" #icon>
        <icon :name="item.meta.icon" />
      </template>
      {{ $t(item.meta?.locale || '') }}
    </a-menu-item>
  </template>
</template>
