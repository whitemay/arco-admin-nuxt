<script setup lang="ts">
// const appConfig = useAppConfig()
const appStore = useAppStore()
const navbarHeight = `60px`
const navbar = computed(() => appStore.navbar)
const renderMenu = computed(() => appStore.menu && !appStore.topMenu)
const showMenu = computed(() => appStore.menu)
const footer = computed(() => appStore.footer)
const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth
})
const paddingStyle = computed(() => {
  const paddingLeft
      = renderMenu.value && !hideMenu.value
        ? { paddingLeft: `${menuWidth.value}px` }
        : {}
  const paddingTop = navbar.value ? { paddingTop: navbarHeight } : {}
  return { ...paddingLeft, ...paddingTop }
})
</script>

<template>
  <a-layout class="h-full w-full" :class="{ mobile: appStore.hideMenu }">
    <a-layout-header class="layout-navbar">
      <GlobalNavBar />
    </a-layout-header>

    <a-layout class="overflow-y-auto overscroll-x-none">
      <a-layout-sider v-if="showMenu" class="layout-sider" :width="menuWidth">
        <div class="menu-wrapper">
          <GlobalMenu />
        </div>
      </a-layout-sider>

      <a-layout class="layout-content">
        <a-layout-header v-if="appStore.tabBar">
          <GlobalTabBar />
        </a-layout-header>
        <a-layout-content class="overflow-y-auto">
          <slot />
        </a-layout-content>
        <a-layout-footer v-if="footer">
          <GlobalFooter />
        </a-layout-footer>
      </a-layout>
      <!-- 主体部分结束 -->
    </a-layout>
  </a-layout>
</template>"

<style scoped lang="less">
@nav-size-height: 60px;

.layout-navbar {
  height: @nav-size-height;
  // padding-left: 200px;
}

.layout-sider {
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: #777777; // var(--color-border);
    content: '';
  }

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}

.layout-content {
  // min-height: 100%;
  overflow-y: hidden;
  background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
