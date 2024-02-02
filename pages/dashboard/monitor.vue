<script lang="ts" setup>
definePageMeta({
  locale: 'menu.dashboard.monitor',
  requiresAuth: true,
  roles: ['admin'],
})
</script>

<template>
  <div class="container">
    <Breadcrumb :items="['menu.dashboard', 'menu.dashboard.monitor']" />
    <div class="layout">
      <div class="layout-left-side">
        <MonitorChatPanel />
      </div>
      <div class="layout-content">
        <a-space :size="16" direction="vertical" fill>
          <MonitorStudio />
          <MonitorDataStatistic />
        </a-space>
      </div>
      <div class="layout-right-side">
        <a-space :size="16" direction="vertical" fill>
          <MonitorStudioStatus />
          <MonitorQuickOperation />
          <MonitorStudioInformation />
        </a-space>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .container {
  padding: 0 20px 20px 20px;
}

.layout {
  display: flex;

  &-left-side {
    flex-basis: 300px;
  }

  &-content {
    flex: 1;
    padding: 0 16px;
  }

  &-right-side {
    flex-basis: 280px;
  }
}
</style>

<style lang="less" scoped>
  // responsive
@media (max-width: @screen-lg) {
  .layout {
    flex-wrap: wrap;
    &-left-side {
      flex: 1;
      flex-basis: 100%;
      margin-bottom: 16px;
    }

    &-content {
      flex: none;
      flex-basis: 100%;
      padding: 0;
      order: -1;
      margin-bottom: 16px;
    }

    &-right-side {
      flex-basis: 100%;
    }
  }
}
</style>
