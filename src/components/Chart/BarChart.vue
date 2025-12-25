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
 import posts from "@/components/axios/posts.js";
export default defineComponent({
  name: 'BarChart',
  components: {
    VChart
  },
  data() {
    return {
      chartData: null,
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
            data: [],
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
            data: [],
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
          series: []
        }
    };
  },
  methods: {
    async loadChart(startDate = null, endDate = null){
      try {
        let currentDate = new Date();
        let oneMonthBack = new Date();
        if (!startDate || !endDate) {
          oneMonthBack.setMonth(currentDate.getMonth() - 1);
          startDate = oneMonthBack.toISOString().split('T')[0];
          endDate = currentDate.toISOString().split('T')[0];
        }
<<<<<<< HEAD
        const response = await posts("https://missfitnessbackend.tajsoft.tjfinance_chart", {
=======
        const response = await posts("https://missfitnessbackend.tajsoft.tj/finance_chart", {
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
          start_date: startDate,
          end_date: endDate
        });

        if (response.data && response.data.days && response.data.service_counts) {
          this.chartData = response.data;
          this.chartOptions.xAxis.data = this.chartData.days;

          const colors = [
            '#FF2424', '#F1972E', '#D0FD3E', '#FDDE3E', '#04B4FF',
            '#FF1053', '#9B36F4', '#3EFD46', '#00F5D4', '#0463F1',
            '#FF82A9', '#FED9B7', '#00C04F', '#FFFFFA', '#A40A24',
            '#587688', '#F46E6D', '#FCB36C', '#E4C1F9', '#17B890',
          ];
          const existingNames1 = [];
          this.chartOptions.series = this.chartData.service_counts.map((val, key) => {
            const color = colors[key];
            const name = Object.keys(val)[0];

            let finalName = name;
            let count = 0;

            while (existingNames1.includes(finalName)) {
              count++;
              finalName = name + `(${count})`;
            }

            existingNames1.push(finalName);

            return {
              name: finalName,
              type: 'line',
              data: Object.values(val)[0].map(item => item === null ? 0 : item),
              lineStyle: {
                color: color,
                width: 3.3
              },
              smooth: true,
              showSymbol: false
            };
          });

          const existingNames2 = [];
          this.chartOptions.legend.data = this.chartData.service_counts.map((val, key) => {
            const name = Object.keys(val)[0];
            const color = colors[key];

            let finalName = name;
            let count = 0;

            while (existingNames2.includes(finalName)) {
              count++;
              finalName = name + `(${count})`;
            }

            existingNames2.push(finalName);

            return {
              name: finalName,
              icon: 'circle',
              textStyle: { color: '#fff' },
              itemStyle: { color: color }
            };
          });

        } else {
          console.error('Invalid data structure from API response');
        }
      } catch (error) {
        console.error('Error loading chart data:', error);
      }
    },
    reloadData(startDate, endDate) {
      this.loadChart(startDate, endDate);
    }
  },
  mounted() {
    this.loadChart();
  }
});
</script>

<style scoped>
</style>