<template>
  <div class="container">
    <div class="row relative">

      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title"><router-link to="/">Финансы</router-link></div>
          <div @click="statusPicker=!statusPicker" class="dpi filter-icon d-flex justify-content-center align-items-center">
            <img height="29" width="37" src="@/assets/images/icons/filter.png" alt="user">
          </div>
        </div>
      </div>
      <div @click="statusPicker=false"  v-if="statusPicker" class="user-page-card cards-modal d-flex justify-content-center align-items-center">
        <div @click.stop class="content">
          <DataPicker @date-selected="reloadAPI" />
        </div>
      </div>
    </div>
  </div>


  <div class="container">
    <div class="row">
      <div class="col-4">
        <div class="bg-gray card-block h-auto">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Продажа</div>
              <div class="card-quantity">{{ statistic.sales }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
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

      <div v-for="i in statistic.services" class="col-4">
        <div class="">
          <div class="bg-gray card-block h-auto">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">{{i.service_name}}</div>
                <div class="card-quantity">{{i.total_price.toFixed(2)}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <bar-chart ref="chartComponent" :start-date="dates.dateFrom" :end-date="dates.dateTo" class="statistics bg-gray p-4" />
      </div>
    </div>
  </div>

  <div v-if="isLoading" class="overlay w-100 h-100 position-fixed top-0 start-0 z-3" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="position-fixed top-50 start-50 translate-middle z-3 text-center">
      <div class="spinner-border text-warning" role="status">
        <span class="sr-only"></span>
      </div>
      <div class="mt-2 text-light text-center">Идет загрузка...</div>
    </div>
  </div>
</template>
<script>
import BarChart from "@/components/Chart/BarChart.vue";
import posts from "@/components/axios/posts.js";
import Cookies from "js-cookie";
import DataPicker from "@/pages/transactions/DataPicker.vue";
export default {
  data(){
    return{
      dates: {
        dateFrom: '',
        dateTo: '',
      },
      isLoading: true,
      statusPicker: "",
      statistic: "",
      searchActive:'',
      addStatus:true,
      addCard:false,
    }
  },
  methods:{
    reloadAPI(selectedDates){
        const token = Cookies.get("token");
        this.isLoading = true;
        this.dates = selectedDates;

        const dateFrom = new Date(this.dates.dateFrom);
        const dateTo = new Date(this.dates.dateTo);

          posts(
              "http://fitness.abdurazzoq.beget.tech/public/finance",
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
    setup(){
      const token = Cookies.get("token");
      let currentDate = new Date();
      let oneMonthBack = new Date();
      oneMonthBack.setMonth(currentDate.getMonth() - 1);

      oneMonthBack = oneMonthBack.toISOString().split('T')[0];
      currentDate = currentDate.toISOString().split('T')[0];
      console.log(oneMonthBack, currentDate);


      posts(
          "http://fitness.abdurazzoq.beget.tech/public/finance",
          { start_date: oneMonthBack, end_date: currentDate },
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
    addStatusDelay(){
      setTimeout(()=>{
        this.addStatus=false
      },2000)
    }
  },
  components:{DataPicker, BarChart  },
  mounted() {
    this.setup()
    this.addStatusDelay();
  }
}

</script>

<style lang="scss" scoped>

</style>