<script lang="ts" setup>
const [loading, { setFalse }] = useBoolean(true)
setTimeout(() => {
  setFalse()
}, 500)
</script>

<template>
  <a-card class="general-card" :title="$t('userInfo.title.latestNotification')">
    <a-skeleton v-if="loading" :animation="true">
      <a-skeleton-line :rows="3" />
    </a-skeleton>
    <a-result v-else status="404">
      <template #subtitle>
        {{ $t('userInfo.nodata') }}
      </template>
    </a-result>
  </a-card>
</template>

<style lang="less" scoped>
  :deep(.arco-result) {
  padding: 40px 32px 108px;
}
</style>
