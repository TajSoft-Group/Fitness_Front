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
    <div @click.stop class="content">
      <DataPicker @select="reloadAPI" />
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
              <div class="card-quantity">{{ statistic.new_users }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="bg-gray card-block h-auto">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Пользователи Android</div>
              <div class="card-quantity">{{ statistic.new_users }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>