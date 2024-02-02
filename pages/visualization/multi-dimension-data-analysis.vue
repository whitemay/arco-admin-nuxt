<script setup lang="ts">
definePageMeta({
  locale: 'menu.visualization.multiDimensionDataAnalysis',
  requiresAuth: true,
  roles: ['admin'],
})
</script>

<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.visualization',
        'menu.visualization.multiDimensionDataAnalysis',
      ]"
    />
    <a-space direction="vertical" :size="16" fill>
      <a-grid :cols="24" :col-gap="16" :row-gap="16">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 18, xl: 18, xxl: 18 }"
        >
          <VisualDataOverview />
        </a-grid-item>
        <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 6, xl: 6, xxl: 6 }">
          <VisualUserActions style="margin-bottom: 16px" />
          <VisualContentTypeDistribution />
        </a-grid-item>
      </a-grid>
      <VisualDataChainGrowth />
      <VisualContentPublishingSource />
    </a-space>
  </div>
</template>

<style scoped lang="less">
  .container {
  padding: 0 20px 20px 20px;
}

:deep(.section-title) {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 16px;
}

:deep(.chart-wrap) {
  height: 264px;
}
</style>
