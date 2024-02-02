<script lang="ts" setup>
defineOptions({
  name: 'UserInfo',
})
definePageMeta({
  locale: 'menu.user.info',
  requiresAuth: true,
  roles: ['*'],
})
</script>

<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.info']" />
    <UserInfoHeader />
    <div class="content">
      <div class="content-left">
        <a-grid :cols="24" :col-gap="16" :row-gap="16">
          <a-grid-item :span="24">
            <UserProject />
          </a-grid-item>
          <a-grid-item :span="24">
            <UserLatestActivity />
          </a-grid-item>
        </a-grid>
      </div>
      <div class="content-right">
        <!-- <a-grid :cols="24" :row-gap="16">
          <a-grid-item :span="24">
            <UserTeam />
          </a-grid-item>
          <a-grid-item class="panel" :span="24">
            <UserLatestNotification />
          </a-grid-item>
        </a-grid> -->
      </div>
    </div>
  </div>
</template>
