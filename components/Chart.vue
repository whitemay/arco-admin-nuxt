<script lang="ts" setup>
import VCharts, { THEME_KEY } from 'vue-echarts'
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
  DataZoomComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'

// import { useAppStore } from '@/store';
interface Props {
  options?: object
  autoResize?: boolean
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
  autoResize: true,
  width: '100%',
  height: '100%',
})

use([
  BarChart,
  CanvasRenderer,
  DataZoomComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  PieChart,
  RadarChart,
  TitleComponent,
  TooltipComponent,
])

// provide(THEME_KEY, 'dark')
// const appStore = useAppStore();
// const theme = computed(() => {
//   if (appStore.theme === 'dark') return 'dark';
//   return '';
// });
const renderChart = ref(false)
// wait container expand
onMounted(async () => {
  await nextTick()
  renderChart.value = true
})
</script>

<template>
  <VCharts
    v-if="renderChart"
    :option="props.options"
    :autoresize="props.autoResize"
    :style="{ width: props.width, height: props.height }"
  />
</template>

<style scoped lang="less"></style>
