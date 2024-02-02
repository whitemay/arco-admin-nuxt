<script setup lang="ts">
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
</script>

<template>
  <a-config-provider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
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
