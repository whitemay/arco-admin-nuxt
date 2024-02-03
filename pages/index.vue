<script setup lang="ts">
import { DEFAULT_ROUTE_NAME } from '~/config/router'

definePageMeta({
  hidden: true,
  locale: 'root.title',
  redirect: { name: DEFAULT_ROUTE_NAME },
})
const online = useOnline()
</script>

<template>
  <div>
    <GlobalLogos mb-6 />
    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry />
  </div>
</template>
