<script setup>
import {onMounted, reactive} from "vue";
import * as echarts from 'echarts'

const searchParam = reactive({})
const allDate = reactive(['2022-08', '2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02', '2023-03',
  '2023-04', '2023-05', '2023-06', '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12'])
const allCount = reactive([120, 200, 150, 80, 70, 110, 130, 300, 450, 160, 240, 80, 100, 350, 500, 230, 300])

const onSubmit = () => {
  const dateRange = searchParam.orderdate
  const data1inRange = [], data2inRange = []
  for (let i = 0; i < allDate.length; ++i) {
    if (dateRange[0] <= allDate[i] && allDate[i] <= dateRange[1]) {
      data1inRange.push(allDate[i])
      data2inRange.push(allCount[i])
    }
  }
  drawChart(data1inRange, data2inRange)
}

onMounted(() => drawChart(allDate, allCount))

function drawChart(datav1, datav2) {
  const myChart = echarts.init(document.querySelector('#myChart'))
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'shadow'}
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: datav1,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: datav2,
      type: 'bar',
      name: '订单量',
    }]
  }
  myChart.setOption(option)
}
</script>

<template>
  <div class="demo-date-picker">
    <div class="block">
      <el-form :inline="true" :model="searchParam">
        <el-form-item label="日期范围">
          <el-date-picker v-model="searchParam.orderdate" type="monthrange"
                          value-format="YYYY-MM" range-separator=" To "
                          start-placeholder="Start Month" end-placeholder="End Month"/>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="warning" @click="drawChart(allDate, allCount)">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="myChart" :style="{width: '100%', height: '380px'}"></div>
  </div>
</template>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
</style>