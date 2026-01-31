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
          <div class="page-title">Статистика за месяц</div>
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
        <div class="bg-gray card-block h-auto position-relative">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Продажа
                <svg class="position-absolute bottom-0 end-0 m-3" data-v-7847d557="" xmlns="http://www.w3.org/2000/svg"
                  width="40" height="40" viewBox="0 0 70 70" fill="none">
                  <circle data-v-7847d557="" cx="35" cy="35" r="35" fill="#D0FD3E"></circle>
                  <path data-v-7847d557=""
                    d="M42.2465 34.6233C42.2465 31.7311 41.3889 28.9038 39.782 26.499C38.1752 24.0942 35.8914 22.2199 33.2193 21.1131C30.5473 20.0063 27.607 19.7167 24.7704 20.281C21.9338 20.8452 19.3282 22.238 17.2831 24.2831C15.238 26.3282 13.8452 28.9338 13.281 31.7704C12.7167 34.607 13.0063 37.5473 14.1131 40.2193C15.2199 42.8914 17.0942 45.1752 19.499 46.782C21.9038 48.3889 24.7311 49.2465 27.6233 49.2465C31.5016 49.2465 35.2211 47.7058 37.9635 44.9635C40.7058 42.2211 42.2465 38.5016 42.2465 34.6233ZM28.8685 40.0613V40.7643C28.8685 41.2231 28.7209 41.3707 28.2621 41.3707H27.0178C26.5784 41.3707 26.4114 41.2231 26.4114 40.7643V40.0929C24.8058 39.8468 23.7574 39.0445 23.2477 37.7008C23.1001 37.2749 23.2465 36.9802 23.6871 36.8167L24.8014 36.423C25.2769 36.2473 25.5045 36.3413 25.7189 36.8167C25.9825 37.4881 26.5872 37.8159 27.5213 37.8159C28.7666 37.8159 29.3888 37.4715 29.3888 36.7667C29.3888 36.1119 28.7499 35.8984 27.4554 35.7675C26.5379 35.6523 26.0625 35.6031 25.2268 35.2762C24.8525 35.1574 24.5069 34.9623 24.2118 34.7032C23.7038 34.2638 23.2776 33.4255 23.2776 32.3612C23.2776 30.6405 24.3752 29.4612 26.407 29.1343V28.462C26.407 28.0226 26.5705 27.8723 27.0134 27.8723H28.2586C28.7174 27.8723 28.865 28.0199 28.865 28.462V29.1343C30.192 29.3636 31.1262 30.0676 31.6824 31.2636C31.9285 31.7223 31.8134 31.9666 31.3054 32.1811L30.1797 32.6899C29.7403 32.8867 29.5241 32.8208 29.278 32.3621C28.9502 31.7232 28.5249 31.4121 27.6241 31.4121C26.4615 31.4121 25.9694 31.6582 25.9694 32.3621C25.9694 32.9685 26.6575 33.1978 27.9185 33.3288C28.5483 33.3806 29.1726 33.4847 29.7851 33.6399C30.0974 33.7202 30.3958 33.8473 30.6701 34.0169C31.4074 34.4563 32.1113 35.3105 32.0463 36.7201C32.0471 38.4724 30.9003 39.6852 28.8685 40.0613Z"
                    fill="black"></path>
                  <path data-v-7847d557=""
                    d="M43.3715 20C41.4409 19.9982 39.5291 20.38 37.7472 21.1231C39.8434 22.6947 41.5449 24.7329 42.7167 27.0761C43.8886 29.4194 44.4987 32.0033 44.4987 34.6233C44.4987 37.2432 43.8886 39.8271 42.7167 42.1704C41.5449 44.5136 39.8434 46.5518 37.7472 48.1234C39.7445 48.9563 41.9018 49.3356 44.0635 49.2339C46.2251 49.1321 48.3372 48.5519 50.2475 47.5351C52.1578 46.5182 53.8185 45.0901 55.1101 43.3537C56.4016 41.6173 57.2916 39.6159 57.7161 37.4939C58.1405 35.3719 58.0886 33.1821 57.5643 31.0826C57.04 28.983 56.0562 27.026 54.684 25.3527C53.3117 23.6793 51.5852 22.3314 49.629 21.4061C47.6728 20.4807 45.5356 20.0011 43.3715 20.0018V20Z"
                    fill="black"></path>
                </svg>
              </div>
              <div class="card-quantity">{{ statistic.sales }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="">
          <div class="bg-gray card-block h-auto position-relative">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">Новые пользователи
                  <div class="position-absolute bottom-0 end-0 m-3 bg-yellow rounded-circle p-2 circle"><svg height="20"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                      <path
                        d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z" />
                    </svg></div>
                </div>
                <div class="card-quantity">{{ statistic.new_users }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-3">
        <div class="bg-gray card-block h-auto position-relative">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Пользователи IOS <img src="@/assets/images/ios.png" width="40"
                  class="position-absolute bottom-0 end-0 m-3"></div>
              <div class="card-quantity">{{ statistic.user_mobile_ios_count }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="bg-gray card-block h-auto position-relative">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Пользователи Android <img src="@/assets/images/android.png" width="40"
                  class="position-absolute bottom-0 end-0 m-3" style="object-fit: cover;"></div>
              <div class="card-quantity">{{ statistic.user_mobile_android_count }}</div>
            </div>
          </div>
        </div>
      </div>
      <router-link :to="{ name: 'visitors' }">
        <div class="col-3">
          <div class="bg-gray card-block h-auto">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">Сейчас в зале</div>
                <div class="card-quantity">{{ statistic.user_gym_count }} чел.</div>
              </div>
            </div>
          </div>
        </div>
      </router-link>
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

<style scoped>
.circle {
  aspect-ratio: 1/1;
  padding-top: 0;
  line-height: 0;
}
</style>