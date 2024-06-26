<template>

  <div class="container">
    <div class="row position-relative">
      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title"><router-link to="/newsletters"><img class="px-3 pb-2" src="@/assets/images/icons/Stroke.png">Доставленные</router-link></div>
        </div>
      </div>
    </div>
  </div>

  <div class="container relative">
    <div class="row">
      <div class="col">
        <div :class="{'search-input':searchActive.length>0}"  class="d-flex justify-content-between align-items-center search-block">
          <img src="@/assets/images/icons/search.png" alt="search">
          <input v-model="searchActive" type="text" id="searchInput" placeholder="Поиск по всем параметрам">
        </div>


        <div class="row">
          <div class="col">
            <div v-if="searchActive.length>0" class="users-block bg-gray search-result-block z-2">
              <table id="dataTable" class="personal-table mt-5">
                <thead>
                <tr >
                  <th style="vertical-align: middle;">
                    <div class="d-flex ">
                      Название <button-sorting style="margin-left: 10px"/>
                    </div>
                  </th>
                  <th style="vertical-align: middle;">
                    <div class="d-flex justify-content-center">
                      Дата <button-sorting style="margin-left: 10px"/>
                    </div>
                  </th>
                  <th style="vertical-align: middle;">
                    <div class="d-flex justify-content-center">
                      Каналы <button-sorting style="margin-left: 10px"/>
                    </div>
                  </th>
                  <th style="vertical-align: middle;">
                    <div class="d-flex justify-content-center">
                      Преимущества <button-sorting style="margin-left: 10px"/>
                    </div>
                  </th>
                  <th style="vertical-align: middle;">
                    <div class="d-flex justify-content-center">
                      Получатели <button-sorting style="margin-left: 10px"/>
                    </div>
                  </th>
                  <th style="vertical-align: middle;">Статус</th>
                </tr>
                </thead>
                <tbody class=" ">
                <tr class=" align-items-center personal-tr ">
                  <td class="text-start">День рождения</td>
                  <td>05.01.2024</td>
                  <td><img src="@/assets/images/icons/push-messages.png"></td>
                  <td>Курс индивид</td>
                  <td>Муж</td>
                  <td class="position-relative ">жидание <img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
                    <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
                      <div @click="dllStatus=true , addStatusDelay('dllStatus')" class="d-flex align-items-center justify-content-between px-3 py-4">
                        <p class="m-0">Редактировать</p>
                        <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                      </div>
                      <div class="d-flex align-items-center justify-content-between px-3 py-4">
                        <p class="m-0 blocked">Удалить</p>
                        <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="align-items-center personal-tr ">
                  <td class="text-start">Праздник</td>
                  <td>05.01.2024</td>
                  <td><img src="@/assets/images/icons/push.png"></td>
                  <td>Йога</td>
                  <td>Жен</td>
                  <td class="position-relative ">ожидание <img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
                    <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
                      <div class="d-flex align-items-center justify-content-between px-3 py-4">
                        <p class="m-0">Редактировать</p>
                        <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                      </div>
                      <div class="d-flex align-items-center justify-content-between px-3 py-4">
                        <p class="m-0 blocked">Удалить</p>
                        <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="align-items-center personal-tr ">
                  <td class="text-start">День рождения</td>
                  <td>05.01.2024</td>
                  <td><img src="@/assets/images/icons/push-group.png"></td>
                  <td>Курс группа</td>
                  <td>Все</td>
                  <td class="position-relative ">ожидание <img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
                    <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
                      <div class="d-flex align-items-center justify-content-between px-3 py-4">
                        <p class="m-0">Редактировать</p>
                        <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                      </div>
                      <div class="d-flex align-items-center justify-content-between px-3 py-4">
                        <p class="m-0 blocked">Удалить</p>
                        <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                      </div>
                    </div>
                  </td>
                </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div></div>


    <div class="container">

      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="table-title">11.09.2024</div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="users-block p-5">
            <table id="dataTable" class="personal-table ">
              <thead>
              <tr >
                <th style="vertical-align: middle;">
                  <div class="d-flex ">
                    Название <button-sorting style="margin-left: 10px"/>
                  </div>
                </th>
                <th style="vertical-align: middle;">
                  <div class="d-flex justify-content-center">
                    Дата <button-sorting style="margin-left: 10px"/>
                  </div>
                </th>
                <th style="vertical-align: middle;">
                  <div class="d-flex justify-content-center">
                    Каналы <button-sorting style="margin-left: 10px"/>
                  </div>
                </th>
                <th style="vertical-align: middle;">
                  <div class="d-flex justify-content-center">
                    Преимущества <button-sorting style="margin-left: 10px"/>
                  </div>
                </th>
                <th style="vertical-align: middle;">
                  <div class="d-flex justify-content-center">
                    Получатели <button-sorting style="margin-left: 10px"/>
                  </div>
                </th>
                <th style="vertical-align: middle;">Статус</th>
              </tr>
              </thead>
              <tbody class=" ">
              <tr class=" align-items-center personal-tr ">
                <td class="text-start">День рождения</td>
                <td>05.01.2024</td>
                <td><img src="@/assets/images/icons/push-messages.png"></td>
                <td>Курс индивид</td>
                <td>Муж</td>
                <td class="position-relative ">ожидание <img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
                  <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="align-items-center personal-tr ">
                <td class="text-start">Праздник</td>
                <td>05.01.2024</td>
                <td><img src="@/assets/images/icons/push.png"></td>
                <td>Йога</td>
                <td>Жен</td>
                <td class="position-relative ">ожидание <img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
                  <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="align-items-center personal-tr ">
                <td class="text-start">День рождения</td>
                <td>05.01.2024</td>
                <td><img src="@/assets/images/icons/push-group.png"></td>
                <td>Курс группа</td>
                <td>Все</td>
                <td class="position-relative ">ожидание <img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
                  <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </td>
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
    <div class="container">

      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="table-title">01.01.2024</div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="users-block p-5">
            <table id="dataTable" class="personal-table ">
              <thead>
              <tr >
                <th style="vertical-align: middle;">
                  <div class="d-flex ">
                    Название <button-sorting style="margin-left: 10px"/>
                  </div>
                </th>
                <th style="vertical-align: middle;">
                  <div class="d-flex justify-content-center">
                    Дата <button-sorting style="margin-left: 10px"/>
                  </div>
                </th>
                <th style="vertical-align: middle;">
                  <div class="d-flex justify-content-center">
                    Каналы <button-sorting style="margin-left: 10px"/>
                  </div>
                </th>
                <th style="vertical-align: middle;">
                  <div class="d-flex justify-content-center">
                    Преимущества <button-sorting style="margin-left: 10px"/>
                  </div>
                </th>
                <th style="vertical-align: middle;">
                  <div class="d-flex justify-content-center">
                    Получатели <button-sorting style="margin-left: 10px"/>
                  </div>
                </th>
                <th style="vertical-align: middle;">Статус</th>
              </tr>
              </thead>
              <tbody class=" ">
              <tr class=" align-items-center personal-tr ">
                <td class="text-start">День рождения</td>
                <td>05.01.2024</td>
                <td><img src="@/assets/images/icons/push-messages.png"></td>
                <td>Курс индивид</td>
                <td>Муж</td>
                <td class="position-relative ">ожидание <img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
                  <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="align-items-center personal-tr ">
                <td class="text-start">Праздник</td>
                <td>05.01.2024</td>
                <td><img src="@/assets/images/icons/push.png"></td>
                <td>Йога</td>
                <td>Жен</td>
                <td class="position-relative ">ожидание <img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
                  <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="align-items-center personal-tr ">
                <td class="text-start">День рождения</td>
                <td>05.01.2024</td>
                <td><img src="@/assets/images/icons/push-group.png"></td>
                <td>Курс группа</td>
                <td>Все</td>
                <td class="position-relative ">ожидание <img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
                  <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </td>
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
  </div>
</template>

<script setup>
</script>
<script>
import ButtonSorting from "@/UI/ButtonSorting.vue";

export default {
  data() {
    return {
      searchActive: '',
    }
  },
  components: { ButtonSorting },
};


</script>

<style lang="scss" scoped>

</style>