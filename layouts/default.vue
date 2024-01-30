<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <a-layout class="h-full w-full" :class="{ mobile: appConfig.layout.hideMenu }">
    <a-layout-sider class="layout-sider">
      <div class="menu-wrapper">
        <GlobalMenu />
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-navbar">
        <GlobalNavBar />
      </a-layout-header>
      <a-layout-content>
        <main class="px-10 py-20 text-center">
          <slot />
        </main>
      </a-layout-content>
      <a-layout-footer>
        <Footer />
        <!-- <div class="mx-auto mt-5 text-center text-sm opacity-25">
          [Default Layout]
        </div> -->
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>"

<style scoped lang="less">
@nav-size-height: 60px;

.layout-navbar {
  height: @nav-size-height;
}

.layout-sider {
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  padding-top: @nav-size-height;

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
</style>
