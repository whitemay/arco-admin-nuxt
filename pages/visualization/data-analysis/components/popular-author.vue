<script lang="ts" setup>
const [loading, { toggle: setLoading }] = useBoolean()
const tableData = ref<PopularAuthorRes>({ list: [] })
async function fetchData() {
  try {
    setLoading(true)
    const { data } = await queryPopularAuthor()
    tableData.value = data
  }
  catch (err) {
    // you can report use errorHandler or other
  }
  finally {
    setLoading(false)
  }
}
fetchData()
</script>

<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title>
        {{ $t('dataAnalysis.popularAuthor') }}
      </template>
      <template #extra>
        <a-link>{{ $t('workplace.viewMore') }}</a-link>
      </template>
      <a-table
        :data="tableData.list"
        :pagination="false"
        :bordered="false"
        style="margin-bottom: 20px"
        :scroll="{ x: '100%', y: '350px' }"
      >
        <template #columns>
          <a-table-column
            :title="$t('dataAnalysis.popularAuthor.column.ranking')"
            data-index="ranking"
          />
          <a-table-column
            :title="$t('dataAnalysis.popularAuthor.column.author')"
            data-index="author"
          />
          <a-table-column
            :title="$t('dataAnalysis.popularAuthor.column.content')"
            data-index="contentCount"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />
          <a-table-column
            :title="$t('dataAnalysis.popularAuthor.column.click')"
            data-index="clickCount"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />
        </template>
      </a-table>
    </a-card>
  </a-spin>
</template>

<style scoped lang="less">
  .general-card {
  max-height: 425px;
}
</style>
