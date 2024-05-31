
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
          <div class="page-title "><router-link to="/"><img class="px-3 pb-2" src="@/assets/images/icons/Stroke.png">Курсы индивидуальные</router-link></div>
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
              <div class="card-title">Продажа индивидуальных курсов</div>
              <div class="card-quantity">24000</div>
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
                <div class="card-quantity">12243 TJS</div>
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
    <div class="row d-flex">

          <div class="col-8 ">
            <div class="statistics p-4 pt-5  bg-gray border-color-yellow border-2px border-radius-25">
              <div class="d-flex justify-content-between col-12">
                  <div class="d-flex  ">
                    <div class="teacher-img img-width-90">
                      <img src="@/assets/images/woman.png" alt="">
                    </div>
                    <div class="card-statistics ">
                      <div class="card-title fs-4">Мунира Камолова</div>
                      <div class="card-left fs-5 m-0 mt-3">Силовые нагрузки</div>
                    </div>
                  </div>

                  <div class="col-6 d-flex text-center justify-content-end ">
                    <div class="bg-black col-4 reviews-info align-content-center mx-1"><h5>2</h5><span >Года опыта</span></div>
                    <div class="bg-black col-4 reviews-info align-content-center mx-1"><h5>46</h5><span >Завершенных курсов</span></div>
                    <div class="bg-black col-4 reviews-info align-content-center mx-1"><h5>4.9</h5><span >Средняя оценка клиентов</span></div>
                  </div>
              </div>
              <div class="d-flex justify-content-between align-items-center  ">
                <div>

                <div class="p-5 text-width-600 h3 m-0 ">Отзывы</div>
                </div>
                <div class="d-flex align-items-center ">
                  <div class="rounded-circle row-user-margin  bg-yellow text-center teacher-img align-content-center fs-5 ">+10</div>
                    <div class="teacher-img row-user-margin">
                      <img src="@/assets/images/woman.png" alt="">
                    </div>
                    <div class="teacher-img row-user-margin">
                      <img src="@/assets/images/avatar.jpg" alt="">
                    </div>
                    <div class="teacher-img row-user-margin">
                      <img src="@/assets/images/woman.png" alt="">
                    </div>
                </div>
              </div>
              <div class="d-flex">
                  <div class="d-flex col-auto bg-black  border-radius-25">
                    <div>test</div>
                  </div>
                  <div class="d-flex col-auto bg-black border-radius-25">
                    <div>test</div>
                  </div>
                  <div class="d-flex col-auto bg-black  border-radius-25">
                    <div>test</div>
                  </div>
              </div>
            </div>
          </div>
      <div class="col-4">
          <div class="col pt-4">
                <div class="bg-gray card-block pr-20" >
                  <div class="d-flex justify-content-between">
                    <div class="card-left w-100">
                      <div class="d-flex align-items-center align-content-center">
                        <div class="teacher-img">
                          <img src="@/assets/images/woman.png" alt="">
                        </div>
                        <div class="card-statistics align-items-center m-0">
                          <div class="card-title ">Мунира Камолова</div>
                          <div class="card-left fs-6 m-0">Силовые нагрузки</div>
                        </div>
                      </div>
                      <div class="card-quantity">21</div>
                      <div class="card-statistics d-flex align-items-center justify-content-between">
                        <div class="sum-500w">2600 TJS</div>
                        <div class="d-flex percentage statistics-up align-items-center justify-content-center">
                          <div>
                            <img class="arrow-down" height="12" src="@/assets/images/icons/arrow-up.png">
                            <img height="12" src="@/assets/images/icons/arrow-up.png">
                          </div>
                          <div class="div">0%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="bg-gray card-block pr-20 pt-5" >
                  <div class="d-flex justify-content-between">
                    <div class="card-left w-100">
                      <div class="d-flex align-items-center align-content-center">
                        <div class="teacher-img">
                          <img src="@/assets/images/woman.png" alt="">
                        </div>
                        <div class="card-statistics align-items-center m-0">
                          <div class="card-title ">Рахима Гафурова</div>
                          <div class="card-left fs-6 m-0">Силовые нагрузки</div>
                        </div>
                      </div>
                      <div class="card-quantity">32</div>
                      <div class="card-statistics d-flex align-items-center justify-content-between">
                        <div class="sum-500w">3500 TJS</div>
                        <div class="d-flex percentage statistics-up align-items-center justify-content-center">
                          <div>
                            <img class="arrow-down" height="12" src="@/assets/images/icons/arrow-up.png">
                            <img height="12" src="@/assets/images/icons/arrow-up.png">
                          </div>
                          <div class="div">0%</div>
                        </div>
                      </div>
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
          <table id="dataTable" >
            <thead>
            <tr>
              <th style="vertical-align: middle;">
                <div class="d-flex justify-content-center">
                  ФИО <button-sorting style="margin-left: 10px"/>
                </div>
              </th>
              <th style="vertical-align: middle;">
                <div class="d-flex justify-content-center ">
                  Телефон <button-sorting style="margin-left: 10px"/>
                </div>
              </th>
              <th style="vertical-align: middle;">Кол-во</th>
              <th style="vertical-align: middle;">Цена</th>
              <th style="vertical-align: middle;">Скидка</th>
              <th style="vertical-align: middle;">Вид</th>
              <th style="vertical-align: middle;">Период</th>
            </tr>
            </thead>
          </table>
        </div>
        <div class="d-flex justify-content-between mt-4 px-5">
          <div class="d-flex align-items-center align-content-center">
            <div class="teacher-img img-width-70 border-5px border-color-red">
              <img src="@/assets/images/woman.png" alt="">
            </div>
            <div class="card-statistics align-items-center m-0">
              <div class="card-title fs-4">Мунира Камолова</div>
              <div class="card-left fs-6 m-0">Силовые нагрузки</div>
            </div>
          </div>
          <div class="card-title fs-4 align-content-center">Урок 4</div>
        </div>
        <div class="users-block">
          <table>
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
              <td>05.11.2023 <br>05.16.2023 </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-between mt-4 px-5">
          <div class="d-flex align-items-center align-content-center">
            <div class="teacher-img img-width-70 border-5px border-color-red">
              <img src="@/assets/images/woman.png" alt="">
            </div>
            <div class="card-statistics align-items-center m-0">
              <div class="card-title fs-4">Мунира Камолова</div>
              <div class="card-left fs-6 m-0">Силовые нагрузки</div>
            </div>
          </div>
          <div class="card-title fs-4 align-content-center">Урок 4</div>
        </div>
        <div class="users-block">
          <table>
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
              <td>05.11.2023 <br>05.16.2023 </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-between mt-4 px-5">
          <div class="d-flex align-items-center align-content-center">
            <div class="teacher-img img-width-70 border-5px border-color-red">
              <img src="@/assets/images/woman.png" alt="">
            </div>
            <div class="card-statistics align-items-center m-0">
              <div class="card-title fs-4">Мунира Камолова</div>
              <div class="card-left fs-6 m-0">Силовые нагрузки</div>
            </div>
          </div>
          <div class="card-title fs-4 align-content-center">Урок 4</div>
        </div>
        <div class="users-block">
          <table>
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
              <td>05.11.2023 <br>05.16.2023 </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-between mt-4 px-5">
          <div class="d-flex align-items-center align-content-center">
            <div class="teacher-img img-width-70 border-5px border-color-red">
              <img src="@/assets/images/woman.png" alt="">
            </div>
            <div class="card-statistics align-items-center m-0">
              <div class="card-title fs-4">Мунира Камолова</div>
              <div class="card-left fs-6 m-0">Силовые нагрузки</div>
            </div>
          </div>
          <div class="card-title fs-4 align-content-center">Урок 4</div>
        </div>
        <div class="users-block">
          <table>
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
              <td>05.11.2023 <br>05.16.2023 </td>
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