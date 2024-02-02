<script setup lang="ts">
definePageMeta({
  locale: 'menu.visualization.dataAnalysis',
  requiresAuth: true,
  roles: ['admin'],
})
</script>

<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.visualization', 'menu.visualization.dataAnalysis']"
    />
    <a-space direction="vertical" :size="12" fill>
      <a-space direction="vertical" :size="16" fill>
        <div class="space-unit">
          <VisualPublicOpinion />
        </div>
        <div>
          <a-grid :cols="24" :col-gap="16" :row-gap="16">
            <a-grid-item
              :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 16, xxl: 16 }"
            >
              <VisualContentPublishRatio />
            </a-grid-item>
            <a-grid-item
              :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 8, xxl: 8 }"
            >
              <VisualPopularAuthor />
            </a-grid-item>
          </a-grid>
        </div>
        <div>
          <VisualContentPeriodAnalysis />
        </div>
      </a-space>
    </a-space>
  </div>
</template>

<style scoped lang="less">
  .container {
  padding: 0 20px 20px 20px;
  margin-bottom: 20px;
}

.space-unit {
  background-color: var(--color-bg-2);
  border-radius: 4px;
}

.title-fix {
  margin: 0 0 12px 0;
  font-size: 14;
}
:deep(.section-title) {
  margin: 0 0 12px 0;
  font-size: 14px;
}
</style>
