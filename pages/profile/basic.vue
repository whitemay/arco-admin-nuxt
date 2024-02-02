<script setup lang="ts">
definePageMeta({
  locale: 'menu.profile.basic',
  requiresAuth: true,
  roles: ['admin'],
})

const [loading, { setFalse }] = useBoolean(true)
const [preLoading, { setFalse: preSetFalse }] = useBoolean(true)
const currentData = ref<ProfileBasicRes>({} as ProfileBasicRes)
const preData = ref<ProfileBasicRes>({} as ProfileBasicRes)
const step = ref(1)
async function fetchCurrentData() {
  try {
    const { data } = await queryProfileBasic()
    currentData.value = data
    step.value = 2
  }
  catch (err) {
    // you can report use errorHandler or other
  }
  finally {
    setFalse()
  }
}
async function fetchPreData() {
  try {
    const { data } = await queryProfileBasic()
    preData.value = data
  }
  catch (err) {
    // you can report use errorHandler or other
  }
  finally {
    preSetFalse()
  }
}
fetchCurrentData()
fetchPreData()
</script>

<template>
  <div class="container">
    <Breadcrumb :items="['menu.profile', 'menu.profile.basic']" />
    <a-space direction="vertical" :size="16" fill>
      <a-card class="general-card" :title="$t('basicProfile.title.form')">
        <template #extra>
          <a-space>
            <a-button>{{ $t('basicProfile.cancel') }}</a-button>
            <a-button type="primary">
              {{ $t('basicProfile.goBack') }}
            </a-button>
          </a-space>
        </template>
        <a-steps v-model:current="step" line-less class="steps">
          <a-step>{{ $t('basicProfile.steps.commit') }}</a-step>
          <a-step>{{ $t('basicProfile.steps.approval') }}</a-step>
          <a-step>{{ $t('basicProfile.steps.finish') }}</a-step>
        </a-steps>
      </a-card>
      <a-card class="general-card">
        <ProfileItem :loading="loading" :render-data="currentData" />
      </a-card>
      <a-card class="general-card">
        <ProfileItem :loading="preLoading" type="pre" :render-data="preData" />
      </a-card>
      <ProfileOperationLog />
    </a-space>
  </div>
</template>
