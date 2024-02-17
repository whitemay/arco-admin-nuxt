<script setup lang="ts">
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'

import { Notification } from '#imports'

function showMessage(option: NotifyOption) {
  if (option.type === 'warning')
    Notification.warning(option.config)
  else if (option.type === 'error')
    Notification.error(option.config)
  else if (option.type === 'success')
    Notification.success(option.config)
  else
    Notification.info(option.config)
}

useNotifySubscribe(showMessage)
</script>

<template>
  <a-config-provider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <global-setting />
  </a-config-provider>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
