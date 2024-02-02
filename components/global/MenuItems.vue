<script setup lang="ts">
import type { RouteRecordRaw } from '#vue-router'

interface Props {
  items: RouteRecordRaw[]
}

const props = withDefaults(defineProps<Props>(), { items: () => [] })
</script>

<template>
  <template v-for="item in props.items">
    <a-sub-menu v-if="item.children && item.children.length !== 0" :key="(item.name as string)">
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
