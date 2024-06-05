<script setup>
import {onMounted, ref} from "vue";
import * as echarts from 'echarts'

const data = ref([
  {name: '水果', value: 12000},
  {name: '家电', value: 1738},
  {name: '服装', value: 1880},
  {name: '文具', value: 1488},
  {name: '图书', value: 1600},
])

onMounted(() => {
  const myChart = echarts.init(document.getElementById('myChart'))
  myChart.setOption({
    title: {
      text: '按商品分类统计订单数量',
      subtext: '单位: 万件',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [{
      name: '订单统计',
      type: 'pie',
      radius: '50%',
      data: data.value,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  })
})
</script>

<template>
  <div id="myChart" :style="{width: '80%', height: '500px'}"></div>
</template>

<style scoped>

</style>