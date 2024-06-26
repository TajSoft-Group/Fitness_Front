<template>
  <div class="container">
    <div class="col">
      <div class="statistics bg-gray">
        <BarChart
            class="m-0 "
            style="width: 100%; height: 400px"/>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col">
        <div class="statistics bg-gray h-auto">
          <div class="d-flex justify-content-between">
            <div class="load-title">Нагруженность зала</div>
            <div class="d-flex">
              <div class="load-info text-center">
                <div class="time">{{ workloadMin }}</div>
                <div class="load-level">Мин. нагруженность</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="load-info text-center">
                <div class="time">{{ workloadMid }}</div>
                <div class="load-level">Сред. нагруженность</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="load-info text-center">
                <div class="time high-load">{{ workloadMax }}</div>
                <div class="load-level">Пиковое время</div>
              </div>
            </div>
          </div>
          <LineChart
              :groupData="groupData"
              :individualData="individualData"
              :categories="categories"
              style="width: 100%; height: 400px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/Chart/LineChart.vue";
import BarChart from "@/components/Chart/BarChart.vue";

export default {
  name: 'Visitors',
  components: {
    LineChart,
    BarChart
  },
  data() {
    return {
      workloadMax: '',
      workloadMin: '',
      workloadMid: '',
      groupData: [0, 5, 6, 8, 10, 18, 14, 15, 14, 12, 10, 8, 7, 4, 4],
      individualData: [0, 0, 5, 6, 7, 8, 9, 10, 9, 9, 8, 7, 7, 4, 2],
      categories: Array.from({ length: 15 }, (_, i) => `${i + 8}:00`)
    };
  },
  methods: {
    sumFun() {
      let arrSum = [];
      for (let key in this.groupData) {
        arrSum.push(this.groupData[key] + this.individualData[key]);
      }
      let sum = arrSum.reduce((x, y) => x + y, 0);
      this.workloadMax = arrSum.findIndex(item => item === Math.max(...arrSum)) + 8 + ':00';
      this.workloadMid = arrSum.findIndex(item => item === Math.round(sum / arrSum.length)) + 8 + ':00';
      this.workloadMin = arrSum.findIndex(item => item === Math.min(...arrSum)) + 8 + ':00';
    },
  },
  mounted() {
    this.sumFun();
  }
}
</script>

<style scoped>
</style>
