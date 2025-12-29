<script setup>
import DataPicker from "@/pages/analytics/DataPicker.vue"
import BarChart from "@/components/Chart/BarChart.vue";
</script>
<script>
import posts from "@/components/axios/posts.js";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      dates: {
        dateFrom: '',
        dateTo: '',
      },
      isLoading: true,
      statusPicker: false,
      statistic: "",
      searchActive: '',
      addStatus: true,
      addCard: false,
    }
  },
  methods: {
    reloadAPI(selectedDates) {
      const token = Cookies.get("token");
      this.isLoading = true;
      this.dates = selectedDates;

      const dateFrom = new Date(this.dates.dateFrom);
      const dateTo = new Date(this.dates.dateTo);

      posts(
        "https://api.mubingym.com/finance",
        { start_date: dateFrom, end_date: dateTo },
        token
      )
        .then((response) => {
          this.statistic = response.data;
          this.isLoading = false;
          this.statusPicker = false;
          this.$refs.chartComponent.reloadData(this.dates.dateFrom, this.dates.dateTo);
        })
        .catch((error) => {
          this.error = error;
        });
    },
    setup() {
      const token = Cookies.get("token");
      let currentDate = new Date();
      let oneMonthBack = new Date();
      oneMonthBack.setMonth(currentDate.getMonth() - 1);

      const start = oneMonthBack.toISOString().split('T')[0];
      const end = currentDate.toISOString().split('T')[0];

      posts(
        "https://api.mubingym.com/finance",
        { start_date: start, end_date: end },
        token
      )
        .then((response) => {
          this.statistic = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    reloadAPI(selectedDates) {
      const token = Cookies.get("token");
      this.isLoading = true;
      this.dates = selectedDates;

      posts(
        "https://api.mubingym.com/finance",
        {
          start_date: selectedDates.dateFrom,
          end_date: selectedDates.dateTo
        },
        token
      )
        .then((response) => {
          this.statistic = response.data;
          this.isLoading = false;
          this.statusPicker = false;
          this.$refs.chartComponent?.reloadData(
            selectedDates.dateFrom,
            selectedDates.dateTo
          );
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
        });
    },
    addStatusDelay() {
      setTimeout(() => {
        this.addStatus = false
      }, 2000)
    }
  },
  components: { DataPicker, BarChart },
  mounted() {
    this.setup()
    this.addStatusDelay();
  }
}

</script>

<template>
  <div @click="statusPicker = false" v-if="statusPicker"
    class="user-page-card cards-modal d-flex justify-content-center align-items-center">
    <div @click.stop class="content position-relative">
      <DataPicker @select="reloadAPI" @close-picker="statusPicker = false" />
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title">Главная</div>
          <div @click="statusPicker = !statusPicker"
            class="filter-icon d-flex justify-content-center align-items-center">
            <img height="29" width="37" src="@/assets/images/icons/filter.png" alt="user">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="bg-gray card-block h-auto">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Продажа</div>
              <div class="card-quantity">{{ statistic.sales }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="">
          <div class="bg-gray card-block h-auto">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">Новые пользователи</div>
                <div class="card-quantity">{{ statistic.new_users }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-3">
        <div class="bg-gray card-block h-auto">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Пользователи IOS</div>
              <div class="card-quantity">{{ statistic.user_mobile_ios_count }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="bg-gray card-block h-auto">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Пользователи Android</div>
              <div class="card-quantity">{{ statistic.user_mobile_android_count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isLoading" class="overlay w-100 h-100 position-fixed top-0 start-0 z-3"
    style="background-color: rgba(0, 0, 0, 0.8);">
    <div class="position-fixed top-50 start-50 translate-middle z-3 text-center mt-2">
      <div class="spinner-border text-warning" v-show="!error" role="status">
        <span class="sr-only"></span>
      </div>
      <div class="error-div" v-show="error">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256"
          height="256" viewBox="0 0 256 256" xml:space="preserve">
          <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
            <path
              d="M 28.5 65.5 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 33 -33 c 1.561 -1.562 4.096 -1.562 5.656 0 c 1.563 1.563 1.563 4.095 0 5.657 l -33 33 C 30.547 65.109 29.524 65.5 28.5 65.5 z"
              style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            <path
              d="M 61.5 65.5 c -1.023 0 -2.048 -0.391 -2.828 -1.172 l -33 -33 c -1.562 -1.563 -1.562 -4.095 0 -5.657 c 1.563 -1.562 4.095 -1.562 5.657 0 l 33 33 c 1.563 1.562 1.563 4.095 0 5.656 C 63.548 65.109 62.523 65.5 61.5 65.5 z"
              style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            <path
              d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 8 C 24.598 8 8 24.598 8 45 c 0 20.402 16.598 37 37 37 c 20.402 0 37 -16.598 37 -37 C 82 24.598 65.402 8 45 8 z"
              style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
          </g>
        </svg>
      </div>
      <div class="mt-2 text-light text-center" v-show="!error">{{ loadingText }}</div>
      <div class="mt-2 text-light text-center" v-show="error">Ошибка ! <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>