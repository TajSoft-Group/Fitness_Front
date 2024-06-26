<template>
  <v-chart :option="chartOptions"  />
</template>

<script>
import { defineComponent, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import VChart from 'vue-echarts';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
]);

export default defineComponent({
  name: 'LineChart',
  components: {
    VChart
  },
  props: {
    groupData: {
      type: Array,
      required: true
    },
    individualData: {
      type: Array,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const chartOptions = computed(() => ({
      title: {
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
        data: [],
        textStyle: {
          fontSize: '18px',
          fontFamily: 'Montserrat',
          fontWeight: '400',
          color: '#fff'
        },
        itemGap: 20,
        itemWidth: 30,
        itemHeight: 22,
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
        data: props.categories,
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
          name: 'Курсы (групповые)',
          type: 'line',
          data: props.groupData,
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
          data: props.individualData,
          lineStyle: {
            color: '#FDDE3E',
            width: 3.3
          },
          smooth: true,
          showSymbol: false,
        }
      ]
    }));

    return {
      chartOptions
    };
  }
});
</script>

<style scoped>
</style>