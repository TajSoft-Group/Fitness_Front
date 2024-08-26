<template>
  <div class="container">
    <div class="row relative">

      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title"><router-link to="/">Финансы</router-link></div>
          <div @click="statusPicker=!statusPicker" class="filter-icon d-flex justify-content-center align-items-center">
            <img height="29" width="37" src="@/assets/images/icons/filter.png" alt="user">
          </div>
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
              <div class="card-quantity">0</div>
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
                <div class="card-quantity">0</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-for="i in staticInfo" class="col-4">
        <div class="">
          <div class="bg-gray card-block h-auto">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">{{i.name}}</div>
                <div class="card-quantity">{{i.cash}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div class="container">
    <div class="col">
      <bar-chart class="statistics bg-gray p-4" />
    </div>
  </div>
</template>
<script>
import BarChart from "@/components/Chart/BarChart.vue";
export default {
  data(){
    return{
      searchActive:'',
      addStatus:true,
      addCard:false,
      staticInfo:[{name:"Абонемент",cash:"340",staticUp:true},{name:"Курсы индивидуальные",cash:"520",staticUp:true},{name:"Курсы групповые",cash:"340",staticUp:false},{name:"Услуги",cash:"15022",staticUp:false},{name:"Тренеры",cash:"15",staticUp:false},{name:"Новые пользователи",cash:"35620",staticUp:true},]
    }
  },
  methods:{
    setup(){
      // posts()
    },
    addStatusDelay(){
      setTimeout(()=>{
        this.addStatus=false
      },2000)
    }
  },
  components:{ BarChart  },
  mounted() {
    this.setup()
    this.addStatusDelay();
  }
}

</script>

<style lang="scss" scoped>

</style>