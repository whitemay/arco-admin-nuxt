<script lang="ts" setup>
const { signIn, token, data, status, lastRefreshedAt, getSession, signUp, signOut } = useAuth()
const appConfig = useAppConfig()

const username = ref('jsmith')
const password = ref('hunter2')

definePageMeta({
  layout: 'home',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

async function login() {
  await signIn({ username: username.value, password: password.value }, { callbackUrl: '/' })
}

updateAppConfig({ title: 'Login' })
</script>

<template>
  <div>
    <h1>Login Page</h1>
    <pre>Status: {{ status }}</pre>
    <pre>Data: {{ data || 'no session data present, are you logged in?' }}</pre>
    <pre>Last refreshed at: {{ lastRefreshedAt || 'no refresh happened' }}</pre>
    <pre>JWT token: {{ token || 'no token present, are you logged in?' }}</pre>
    <form @submit.prevent="login">
      <a-input v-model="username" type="text" placeholder="Username" />
      <a-input v-model="password" type="password" placeholder="Password" />
      <a-button type="primary" html-type="submit">
        sign in
      </a-button>
    </form>
  </div>
</template>
