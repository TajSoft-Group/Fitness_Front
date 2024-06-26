<template>
  <v-chart :option="chartOptions" autoresize />
</template>

<script>
import { defineComponent } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import VChart from 'vue-echarts';

// Регистрация необходимых компонентов
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
]);

export default defineComponent({
  name: 'BarChart',
  components: {
    VChart
  },
  data() {
    return {

      chartOptions: {
      title: {
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#2C2C2E',
          borderRadius: 18,
          borderColor: '#2C2C2E',
          padding: 25,
          textStyle: {
            color: '#ffffff'
          },
          axisPointer: {
            type: 'line'
          },
          formatter: function (params) {
            let tooltipText = '';
            params.forEach(param => {
              tooltipText += `${param.seriesName}: ${param.value}<br/>`;
            });
            return tooltipText;
          }
        },
        legend: {
          data: [
            { name: 'Абонемент', icon: 'circle', textStyle: { color: '#fff' }, itemStyle: { color: '#FF2424' } },
            { name: 'Курсы (групповые)', icon: 'circle', textStyle: { color: '#fff' }, itemStyle: { color: '#F1972E' } },
            { name: 'Курсы (индивидуальные)', icon: 'circle', textStyle: { color: '#fff' }, itemStyle: { color: '#FDDE3E' } },
            { name: 'Новые пользователи', icon: 'circle', textStyle: { color: '#fff' }, itemStyle: { color: '#D0FD3E' } },
            { name: 'Услуги', icon: 'circle', textStyle: { color: '#fff' }, itemStyle: { color: '#49CCCC' } }
          ],
          textStyle: {
            fontSize: '18px',
            fontFamily: 'Montserrat',
            fontWeight: '400',
            color: '#fff'
          },
          itemGap: 15,
          itemWidth: 18,
          itemHeight: 20,
          formatter: function (name) {
            return name.toUpperCase();
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
            },
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 30
          },
        },
        yAxis: {
          position: 'right',
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            margin: 20
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#484848',
              type: 'solid'
            }
          }
        },
        series: [
          {
            name: 'Абонемент',
            type: 'line',
            data: [0, 0, 0, 20, 20, 23, 25, 30, 15, 15, 15, 20, 20, 20, 20, 20, 25, 25, 25, 30, 30, 35, 46, 45],
            lineStyle: {
              color: '#FF2424',
              width: 3.3
            },
            showSymbol: false,
            smooth: true
          },
          {
            name: 'Курсы (групповые)',
            type: 'line',
            data: [0, 0, 0, 0, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 25, 25, 35, 35, 35, 37, 37, 37, 37, 40],
            lineStyle: {
              color: '#F1972E',
              width: 3.3
            },
            smooth: true,
            showSymbol: false,
          },
          {
            name: 'Курсы (индивидуальные)',
            type: 'line',
            data: [0, 0, 0, 5, 5, 15, 15, 15, 20, 20, 20, 20, 20, 32, 30, 30, 30, 35, 41, 30, 25, 20, 15, 31],
            lineStyle: {
              color: '#FDDE3E',
              width: 3.3
            },
            smooth: true,
            showSymbol: false,
          },
          {
            name: 'Новые пользователи',
            type: 'line',
            data: [0, 2, 4, 6, 8, 10, 12, 14, 16, 15, 20, 22, 10, 26, 15, 10, 32, 34, 36, 15, 40, 10, 44, 46],
            lineStyle: {
              color: '#D0FD3E',
              width: 3.3
            },
            smooth: true,
            showSymbol: false,
          },
          {
            name: 'Услуги',
            type: 'line',
            data: [1, 3, 5, 7, 9, 12, 14, 16, 18, 20, 22, 24, 26, 20, 15, 15, 15, 20, 20, 20, 36, 35, 34, 33],
            lineStyle: {
              color: '#49CCCC',
              width: 3.3
            },
            smooth: true,
            showSymbol: false,
          }
        ]
      }
    };
  }
});
</script>

<style scoped>
</style>