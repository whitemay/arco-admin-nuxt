<script lang="ts" setup>
// import { Message } from '@arco-design/web-vue'

const appStore = useAppStore()
const { signOut, data } = useAuth()
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
const avatar = computed(() => {
  return data.value?.avatar || ''
})
const theme = computed(() => {
  return appStore.theme
})
const topMenu = computed(() => appStore.topMenu && appStore.menu)
const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    // overridden default behavior
    appStore.toggleTheme(dark)
  },
})
const toggleTheme = useToggle(isDark)

function handleToggleTheme() {
  toggleTheme()
}
function setVisible() {
  appStore.updateSettings({ globalSettings: true })
}
const refBtn = ref()
const triggerBtn = ref()
function setPopoverVisible() {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  refBtn.value.dispatchEvent(event)
}
async function handleLogout() {
  await signOut({ callbackUrl: '/login', external: false })
}
function setDropDownVisible() {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  triggerBtn.value.dispatchEvent(event)
}
function toggleDrawerMenu() {}
</script>

<template>
  <div class="navbar">
    <div class="h-full w-200px overflow-hidden">
      <Logos />
    </div>
    <div class="left-side">
      <a-space>
        <icon-menu-fold
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
        <img
          alt="logo"
          src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
        >
        <a-typography-title
          :style="{ margin: 0, fontSize: '18px' }"
          :heading="5"
        >
          Arco Pro
        </a-typography-title>
      </a-space>
    </div>
    <div class="center-side">
      <GlobalMenu v-if="topMenu" />
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip content="搜索">
          <a-button class="nav-btn" type="outline" shape="circle">
            <template #icon>
              <icon-search />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip
          :content="
            theme === 'light'
              ? '点击切换为暗黑模式'
              : '点击切换为亮色模式'
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="handleToggleTheme"
          >
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="isFullscreen ? '点击退出全屏模式' : '点击切换全屏模式'">
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="toggleFullScreen"
          >
            <template #icon>
              <icon-fullscreen-exit v-if="isFullscreen" />
              <icon-fullscreen v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="页面配置">
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="setVisible"
          >
            <template #icon>
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar
            :size="32"
            :style="{ marginRight: '8px', cursor: 'pointer' }"
          >
            <img alt="avatar" :src="avatar">
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space @click="navigateTo({ name: 'user-info' })">
                <icon-user />
                <span>
                  用户中心
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="navigateTo({ name: 'user-setting' })">
                <icon-settings />
                <span>
                  用户设置
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>
                  登出登录
                </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
  .navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;
  :deep(.locale-select) {
    border-radius: 20px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }
  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }
  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
  .message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
