<script lang="ts" setup>
const [loading, { setFalse }] = useBoolean(true)
const renderData = ref<operationLogRes>([])
async function fetchData() {
  try {
    const { data } = await queryOperationLog()
    renderData.value = data
  }
  catch (err) {
    // you can report use errorHandler or other
  }
  finally {
    setFalse()
  }
}
fetchData()
</script>

<template>
  <a-card class="general-card">
    <template #title>
      {{ $t('basicProfile.title.operationLog') }}
    </template>
    <a-spin :loading="loading" style="width: 100%">
      <a-table :data="renderData">
        <template #columns>
          <a-table-column
            :title="$t('basicProfile.column.contentNumber')"
            data-index="contentNumber"
          />
          <a-table-column
            :title="$t('basicProfile.column.updateContent')"
            data-index="updateContent"
          />
          <a-table-column
            :title="$t('basicProfile.column.status')"
            data-index="status"
          >
            <template #cell="{ record }">
              <p v-if="record.status === 0">
                <span class="circle" />
                <span>{{ $t('basicProfile.cell.auditing') }}</span>
              </p>
              <p v-if="record.status === 1">
                <span class="circle pass" />
                <span>{{ $t('basicProfile.cell.pass') }}</span>
              </p>
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('basicProfile.column.updateTime')"
            data-index="updateTime"
          />
          <a-table-column :title="$t('basicProfile.column.operation')">
            <template #cell>
              <a-button type="text">
                {{
                  $t('basicProfile.cell.view')
                }}
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-spin>
  </a-card>
</template>

<style scoped lang="less">
  :deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
</style>
