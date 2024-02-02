<script lang="ts" setup>
import EnterpriseCertification from './enterprise-certification.vue'
import CertificationRecords from './certification-records.vue'

const [loading, { setFalse }] = useBoolean(true)
const data = ref<UnitCertification>({
  enterpriseInfo: {} as EnterpriseCertificationModel,
  record: [],
})
async function fetchData() {
  try {
    const { data: resData } = await queryCertification()
    data.value = resData
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
  <a-spin :loading="loading" style="width: 100%">
    <EnterpriseCertification :enterprise-info="data.enterpriseInfo" />
    <CertificationRecords :render-data="data.record" />
  </a-spin>
</template>

<style scoped lang="less"></style>
