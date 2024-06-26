<template>
  <v-chart :option="chartOptions" autoresize />
</template>

<script>
import { defineComponent } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { ScatterChart, CustomChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

// Регистрация необходимых компонентов
use([
  CanvasRenderer,
  ScatterChart,
  CustomChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
]);

export default defineComponent({
  name: 'ScatterChart',
  components: {
    VChart,
  },
  data() {
    const data = [
      [18, 1, 'Азиза Рахимова','src/assets/images/woman.png','rgba(255, 36, 36, 1)', '1'],
      [19, 2, 'Нигора Шарипова','src/assets/images/avatar.jpg','rgba(173, 173, 173, 1)', 'Курс групповой'],
      [20, 3, 'Азиза Рахимова','src/assets/images/woman.png','rgba(241, 151, 46, 1)', 'Курс групповой'],
      [21, 4, 'Нигора Шарипова','src/assets/images/avatar.jpg','rgba(255, 36, 36, 1)', 'Курс '],
      [21, 5, 'Нигора Шарипова','src/assets/images/woman.png','rgba(208, 253, 62, 1)', 'Курс '],
      [22, 5, 'Нигора Шарипова','src/assets/images/avatar.jpg','rgba(173, 173, 173, 1)', 'Курс групповой'],
      [23, 6, 'Нигора Шарипова','src/assets/images/woman.png','rgba(255, 36, 36, 1)', 'Кaпповой'],
      [24, 5, 'Нигора Шарипова','src/assets/images/avatar.jpg','rgba(208, 253, 62, 1)', 'Кaппово2й'],
    ];

    // Найти минимальное значение по оси x
    const minXValue = Math.min(...data.map(item => item[0]));

    return {
      chartOptions: {
        title: {
          show: false,
        },
        grid: {
          left: '11%',
          top: '10%',
          height: '80%',
        },
        xAxis: {
          show: false,
          min: minXValue,
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
            },
          },
        },
        yAxis: {
          axisTick: false,
          axisLabel: {
            fontSize: 20,
            fontWeight: 400,
            fontFamily: 'Montserrat',
            margin: 60,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
            },
          },
          data: Array.from({ length: 12 }, (_, i) => `${i + 8}:00`),
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: 'rgba(220, 220, 220, 0.1)',
            },
          },
          scale: true,
        },
        series: [
          {
            type: 'custom',
            renderItem: function (params, api) {
              const param = (params.dataIndex)
              const img = (data[param][3])
              const color = (data[param][4])
              const coord = api.coord([api.value(0), api.value(1)]);
              const imageSize = 70;
              const imagePadding = 2; // Padding between image and circle

              return {
                type: 'group',
                children: [
                  {
                    type: 'image',
                    style: {
                      image: img, // Замените на путь к вашему изображению
                      x: coord[0] - imageSize / 2,
                      y: coord[1] - imageSize / 2,
                      width: imageSize,
                      height: imageSize,
                      aspect: 'contain', // Maintain aspect ratio
                    },
                    clipPath: {
                      type: 'circle',
                      shape: {
                        cx: coord[0],
                        cy: coord[1],
                        r: (imageSize - imagePadding) / 2,
                      },
                    },
                  },
                  {
                    type: 'circle',
                    shape: {
                      cx: coord[0],
                      cy: coord[1],
                      r: imageSize / 2,
                    },
                    style: {
                      stroke: color,
                      lineWidth: 3,
                      fill: 'transparent',
                    },
                  },
                ],
              };
            },
            data: data,
          },
        ],
      },
    };
  },
});
</script>

<style scoped>
</style>
