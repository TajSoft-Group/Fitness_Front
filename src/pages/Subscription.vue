
<script setup>
import DataPicker from "@/pages/analytics/DataPicker.vue";
import ButtonSorting from "@/UI/ButtonSorting.vue";
</script>

<script >
export default {
  data(){
    return{
      statusPicker:false
    }
  }
}
</script>


<template>
  <div v-if="statusPicker" class="row statusPicker">
    <div class="col mt-5 d-flex justify-content-center">
      <DataPicker />
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title "><router-link to="/"><img class="px-3 pb-2" src="@/assets/images/icons/Stroke.png">Абонемент</router-link></div>
          <div @click="statusPicker=!statusPicker" class="filter-icon d-flex justify-content-center align-items-center">
            <img height="29" width="37" src="@/assets/images/icons/filter.png" alt="user">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <div class="bg-gray card-block">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Продажа абонемента</div>
              <div class="card-quantity">15000</div>
              <div class="card-statistics d-flex align-items-center">
                <div class="d-flex percentage align-items-center justify-content-center">
                  <div>
                    <img class="arrow-down" height="12" src="@/assets/images/icons/arrow-up.png">
                    <img height="12" src="@/assets/images/icons/arrow-up.png">
                  </div>
                  <div class="div">0%</div>
                </div>
                <div>от предыдущего периода</div>
              </div>
            </div>
            <div class="card-right d-flex align-items-end">
              <img width="152" height="115" src="@/assets/images/icons/vector.png" alt="vector">
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="">
          <div class="bg-gray card-block ">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">Выручка</div>
                <div class="card-quantity">122435 TJS</div>
                <div class="card-statistics d-flex align-items-center">
                  <div class="d-flex percentage align-items-center justify-content-center">
                    <div>
                      <img class="arrow-down" height="12" src="@/assets/images/icons/arrow-up.png">
                      <img height="12" src="@/assets/images/icons/arrow-up.png">
                    </div>
                    <div class="div">0%</div>
                  </div>
                  <div>от предыдущего периода</div>
                </div>
              </div>
              <div class="card-right d-flex align-items-end">
                <img width="152" height="115" src="@/assets/images/icons/vector.png" alt="vector">
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
        <div class="statistics bg-gray">
              <div class="load-info d-flex flex-row-reverse ">
                <div class="year time fs-3 ">2024</div>
              </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="users-block">
          <table id="dataTable" class="personal-table">
            <thead>
            <tr >
              <th style="vertical-align: middle;">
                <div class="d-flex justify-content-center">
                  ФИО <button-sorting style="margin-left: 10px"/>
                </div>
              </th>
              <th style="vertical-align: middle;">
                <div class="d-flex justify-content-center">
                  Телефон <button-sorting style="margin-left: 10px"/>
                </div>
              </th>
              <th style="vertical-align: middle;">Кол-во</th>
              <th style="vertical-align: middle;">Цена</th>
              <th style="vertical-align: middle;">Скидка</th>
              <th style="vertical-align: middle;">Цена со %</th>
              <th style="vertical-align: middle;">Аата покупки</th>
            </tr>
            </thead>
            <tbody>
            <tr class="align-items-center personal-tr">
              <td>
                <a href="#">Азиза Султанова</a>
              </td>
              <td>92 000 00 00</td>
              <td>15</td>
              <td>50 TJS</td>
              <td>-5%</td>
              <td>480 TJS</td>
              <td>05.11.2023</td>
            </tr>
            <tr class="align-items-center personal-tr">
              <td>
                <a href="#">Азиза Султанова</a>
              </td>
              <td>92 000 00 00</td>
              <td>15</td>
              <td>50 TJS</td>
              <td>-5%</td>
              <td>480 TJS</td>
              <td>05.11.2023</td>
            </tr>
            <tr class="align-items-center personal-tr">
              <td>
                <a href="#">Азиза Султанова</a>
              </td>
              <td>92 000 00 00</td>
              <td>15</td>
              <td>50 TJS</td>
              <td>-5%</td>
              <td>480 TJS</td>
              <td>05.11.2023</td>
            </tr>
            <tr class="align-items-center personal-tr">
              <td>
                <a href="#">Азиза Султанова</a>
              </td>
              <td>92 000 00 00</td>
              <td>15</td>
              <td>50 TJS</td>
              <td>-5%</td>
              <td>480 TJS</td>
              <td>05.11.2023</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="load-info d-flex flex-row-reverse ">
          <div style="font-weight: 500; font-size: 16px; padding-right: 30px"  class="year time  ">Еще</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>