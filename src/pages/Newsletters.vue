<template>

  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title"><router-link to="/"><img class="px-3 pb-2" src="@/assets/images/icons/Stroke.png">Клиенты</router-link></div>
          <div class="user-add-btn d-flex justify-content-center  align-items-center">
            <div class="position-relative">
            <button @click="addHoliday=!addHoliday" class="add-user-btn ">Добавить</button>
              <div v-if="addHoliday" class=" position-absolute add-holiday bg-black ">
                <div @click="addHoliday=false, addCardBirthday=true" class="d-flex align-items-center justify-content-between p-2">
                  <p  class="p-0 m-0">День рождения</p>
                  <img class="img-width-20" src="@/assets/images/icons/birthday.png">
                </div>
                <div @click="addHoliday=false" class="d-flex mt-2 align-items-center justify-content-between p-2">
                  <p  class="p-0 m-0">Праздник</p>
                  <img class="img-width-20" src="@/assets/images/icons/Holiday.png">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
  </div>

  <div @click="addCardBirthday=!addCardBirthday" v-if="addCardBirthday" class="add-user-modal d-flex justify-content-center align-items-center ">
    <div @click.stop  class="content">
      <div class="title">ДЕНЬ РОЖДЕНИЯ</div>
      <div class="form">
        <label for="name">Название рассылки*</label>
        <input type="text" placeholder="Введите название рассылки" id="name">
      </div>
      <div class="form position-relative">
        <label  for="surname">Заголовок**</label>
        <input type="text" placeholder="Введите заголовок" id="heading">
        <div class="label-name position-absolute">имя</div>
      </div>
      <div class="form position-relative">
        <label  for="phone">Описание*</label>
        <textarea class="description" type="text" placeholder="Введите текст" id="description"></textarea>
        <div class="label-name position-absolute">имя</div>
      </div>
      <div class="form position-relative">
        <label for="name">Подарок*</label>
        <input type="text" placeholder="Укажите вид поощрения" id="present">
        <img @click="presentMenu=!presentMenu" :class="{'rotate-90':presentMenu}" class="row-right-icon" src="@/assets/images/icons/row-right.png">
        <div class="menu-type-2 pt-4 px-4">
          <h1 >Услуги</h1>
          <p>Йога</p>
          <p>Солярий</p>

          <h1>Курсы</h1>
          <p>Йога</p>
          <p>Солярий</p>
          <p>Солярий</p>
          <p>Солярий</p>

        </div>
      </div>
      <div class="form position-relative">
        <label for="name">Время отправки*</label>
        <input type="text" placeholder="00:00" id="dispatch-time">
      </div>
      <div class="checkbox d-flex align-items-center">
        <div class="male d-flex align-items-center mr-30">
          <input type="radio" id="sms" name="notifications">
          <label for="male">Push уведомления</label>
        </div>
        <div class="female d-flex align-items-center">
          <input type="radio" id="push" name="notifications">
          <label for="female">SMS сообщение</label>
        </div>
      </div>
      <div class="d-flex justify-content-between add-user-buttons">
        <button @click="addCard=false" class="dont">Отмена</button>
        <button class="submit" type="button">Добавить</button>
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
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-between title-block align-items-center">
            <div class="page-title"><router-link to="/">Запланированные</router-link></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div v-if="searchActive.length>0" class="users-block bg-gray search-result-block z-2">
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

  <div class="container">

    <div class="col">
      <div class="d-flex justify-content-between title-block align-items-center">
        <div class="page-title"><router-link to="/">Доставленные</router-link></div>
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

<script>
import ButtonSorting from "@/UI/ButtonSorting.vue";

export default {
  data(){
    return{
      presentMenu:false,
      addCardBirthday:false,
      searchActive:'',
      addHoliday:false,
      addCardHoliday:false
    }
  },
  components: {ButtonSorting},

}
</script>

<style lang="scss" scoped>

</style>