<script setup lang="ts">
interface Props {
  items: RouteRecordRaw[]
}

const props = defineProps<Props>()
</script>

<template>
  <template v-for="item in props.items">
    <a-sub-menu v-if="item.children && item.children.length !== 0" :key="item.name">
      <template v-if="item.meta?.icon" #icon>
        <icon :name="item.meta.icon" />
      </template>
      <template #title>
        {{ item.meta?.title || '' }}
      </template>
      <GlobalMenuItems :items="item.children" />
    </a-sub-menu>
    <a-menu-item v-else :key="item.path" @click="() => navigateTo(item)">
      <template v-if="item.meta?.icon" #icon>
        <icon :name="item.meta.icon" />
      </template>
      {{ item.meta?.title || '' }}
    </a-menu-item>
  </template>
</template>
