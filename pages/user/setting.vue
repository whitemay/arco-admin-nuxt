<script lang="ts" setup>
defineOptions({
  name: 'UserSetting',
})
definePageMeta({
  locale: 'menu.user.setting',
  requiresAuth: true,
  roles: ['*'],
})
</script>

<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.setting']" />
    <a-row style="margin-bottom: 16px">
      <a-col :span="24">
        <UserPanel />
      </a-col>
    </a-row>
    <a-row class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" :title="$t('userSetting.tab.basicInformation')">
            <UserBasicInformation />
          </a-tab-pane>
          <a-tab-pane key="2" :title="$t('userSetting.tab.securitySettings')">
            <UserSecuritySettings />
          </a-tab-pane>
          <a-tab-pane key="3" :title="$t('userSetting.tab.certification')">
            <UserCertification />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>
