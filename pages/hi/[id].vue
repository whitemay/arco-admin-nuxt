<script setup lang="ts">
const route = useRoute<'hi-id'>()
const user = useUserStore()
const name = route.params.id

const tabStore = useTabBarStore()

watchEffect(() => {
  const name = route.params.id as string
  user.setNewName(name)
  tabStore.updateTitle(route.fullPath, `Hi, ${name}`)
})

definePageMeta({
  icon: 'ant-design:user-outlined',
  locale: 'hello.title',
  hidden: true,
})
function tryRoute() {
  console.log('here')
  navigateTo({ name: 'dashboard-workplace' })
}
</script>

<template>
  <div class="p-5 pt-0">
    <div i-twemoji:waving-hand inline-block animate-shake-x animate-duration-5000 text-4xl />
    <h3 text-2xl font-500>
      Hi,
    </h3>
    <div text-xl>
      {{ name }}!
    </div>

    <template v-if="user.otherNames.length">
      <p my-4 text-sm>
        <span op-50>Also as known as:</span>
        <ul>
          <li v-for="otherName in user.otherNames" :key="otherName">
            <router-link :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </router-link>
          </li>
        </ul>
      </p>
    </template>

    <Counter />

    <div>
      <NuxtLink
        class="m-3 text-sm btn"
        :to="{
          name: 'dashboard-workplace',
        }"
      >
        Back
      </NuxtLink>
      <button class="m-3 text-sm btn" @click="tryRoute">
        Go to Dashboard
      </button>
    </div>
  </div>
</template>
