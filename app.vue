<script setup lang="ts">
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'

import { Notification } from '#imports'

function showNotify(option: NotifyOption) {
  if (option.type === 'warning')
    Notification.warning(option.config)
  else if (option.type === 'error')
    Notification.error(option.config)
  else if (option.type === 'success')
    Notification.success(option.config)
  else
    Notification.info(option.config)
}

useSubscribeNotify(showNotify)

function showMessage(optiosn: MessageOption) {
  switch (optiosn.type) {
    case 'info':
      Message.info(optiosn.config)
      break
    case 'success':
      Message.success(optiosn.config)
      break
    case 'warning':
      Message.warning(optiosn.config)
      break
    case 'error':
      Message.error(optiosn.config)
      break
    case 'loading':
      Message.loading(optiosn.config)
      break
    default:
      Message.normal(optiosn.config)
  }
}

useSubscribeMessage(showMessage)
</script>

<template>
  <VitePwaManifest />
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
