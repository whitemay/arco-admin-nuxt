<script lang="ts" setup>
definePageMeta({
  noSffix: true,
})
const route = useRoute()

const gotoPath: string = (route.query?.path || '/') as string

navigateTo(gotoPath)
</script>

<template>
  <div />
</template>

<style scoped lang="less"></style>
