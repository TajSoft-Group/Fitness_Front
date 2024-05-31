<script >
  export default {
    data(){
      return{
        trainerMenu:false,
      }
    }
  }
</script>

<template>
  <div class="container mt-5">
    <div class="row position-relative">
        <div  class="time-table col-6">Расписание</div>
        <div class="col-6 d-grid gap-2  justify-content-md-end">
          <button type="button" @click="trainerMenu=!trainerMenu" :class="{rotate:trainerMenu}" class="fit-button-1 bg-gray" >Все тренеры</button>
      <div v-if="trainerMenu" class="col bg-gray statistics m-0 p-4 position-absolute" style="right: 15px; top: 85px">
        <table>
        <thead>
          <tr style="border-bottom: solid 1px #dcdcdc47;">
            <th class="h4 fw-normal text-end" style="color: #D0FD3E">Выбрать все</th>
            <td class="d-flex justify-content-center">
              <img src="@/assets/images/icons/check.png">
            </td>
          </tr>
        </thead>
        <tbody>
        <tr style="border-bottom: solid 1px #dcdcdc47; padding: 10px">
          <td class="h4 pt-3" >Азиза Султанова</td>
          <td class="d-flex justify-content-center">
            <img class="pt-4 mb-2" src="@/assets/images/icons/check.png">
          </td>
        </tr>
        <tr style="border-bottom: solid 1px #dcdcdc47; padding: 10px">
          <td class="h4 pt-3" >Азиза Султанова</td>
          <td class="d-flex justify-content-center">
            <img class="pt-4 mb-2" src="@/assets/images/icons/check.png">
          </td>
        </tr>
        <tr style="border-bottom: solid 1px #dcdcdc47; padding: 10px">
          <td class="h4 pt-3" >Азиза Султанова</td>
          <td class="d-flex justify-content-center">
            <img class="pt-4 mb-2" src="@/assets/images/icons/check.png">
          </td>
        </tr>
        <tr style="border-bottom: solid 1px #dcdcdc47; padding: 10px">
          <td class="h4 pt-3" >Азиза Султанова</td>
          <td class="d-flex justify-content-center">
            <img class="pt-4 mb-2" src="@/assets/images/icons/check.png">
          </td>
        </tr>
        </tbody>
      </table>
      </div>
        </div>
    </div>
  </div>
  <div class="container mb-2">
    <div class="row">
      <div class="col">
        <div class="statistics mt-3 bg-gray">
          <div class="d-flex justify-content-between"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12 d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" class="fit-button-2 bg-gray">Перенести курс</button>
        <button type="button" class="fit-button-2 bg-gray">Перенести все курсы</button>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>