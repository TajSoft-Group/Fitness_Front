<template>

  <div class="container">
    <div class="row position-relative">

      <transition v-if="addStatus" name="bounce"   class="z-3 added-user-message">
        <div class="result-true">
          <div class="result-true-card d-flex align-items-center">
            <img class="m-4 img-width-40" src="@/assets/images/icons/check_add.png">
            <div class="result-true-content ">
              <div class="result-true-title">Рассылка успешно создана </div>
              <div class="result-true-body mt-2">Рассылка “День рождения” была успешно создана</div>
            </div>
          </div>
        </div>
      </transition>

      <transition v-if="dllStatus"  name="bounce"   class="z-3 added-user-message ">
        <div class="result-true del-result">
          <div class="result-true-card d-flex align-items-center">
            <img class="m-4 img-width-40" src="@/assets/images/icons/dell.png">
            <div class="result-true-content ">
              <div class="result-true-title">Рассылка успешно удалена</div>
              <div class="result-true-body mt-2">Рассылка “День рождения” была удалена</div>
            </div>
          </div>
        </div>
      </transition>

      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title"><router-link to="/"><img class="px-3 pb-2" src="@/assets/images/icons/Stroke.png">Рассылки</router-link></div>
          <div class="user-add-btn d-flex justify-content-center  align-items-center">
            <div class="position-relative">
            <button @click="addHoliday=!addHoliday" class="add-user-btn ">Добавить</button>
              <div v-if="addHoliday" class=" position-absolute add-holiday bg-black ">
                <div @click="addHoliday=false, addCardBirthday=true" class="d-flex align-items-center justify-content-between p-2">
                  <p  class="p-0 m-0">День рождения</p>
                  <img class="img-width-20" src="@/assets/images/icons/birthday.png">
                </div>
                <div @click="addHoliday=false, addCardHoliday=true"  class="d-flex mt-2 align-items-center justify-content-between p-2">
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
        <input ref="inputText" type="text" placeholder="Введите заголовок" id="heading">
        <div  @click="presentName('inputText')"  class=" label-name position-absolute">имя</div>
      </div>
      <div class="form position-relative">
        <label for="phone">Описание*</label>
        <textarea ref="descriptionTextarea"  type="text"  placeholder="Введите текст" class="description"
        ></textarea>
        <div @click="presentName('descriptionTextarea')" class="label-name position-absolute">имя</div>
      </div>
      <div class="form position-relative">
        <label for="name">Подарок*</label>
        <input  type="text" :value="picked"   id="present">
        <img @click="presentMenu=!presentMenu" :class="{'rotate-90':presentMenu}" class="row-right-icon" src="@/assets/images/icons/row-right.png">
        <div :class="{'d-block':presentMenu}" class="menu-type-1 pt-4 px-4 ">
          <h1 >Услуги</h1>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="yoga" value="Йога" v-model="picked" />
            <label class="text-white" for="yoga">Йога</label>
          </div>
          <hr>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="solarium" value="Солярий" v-model="picked" />
            <label class="text-white" for="solarium">Солярий</label>
          </div>
          <hr>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="dancing" value="Танцы" v-model="picked" />
            <label class="text-white" for="dancing">Танцы</label>
          </div>
          <hr>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="massage" value="Массаж" v-model="picked" />
            <label class="text-white" for="massage">Массаж</label>
          </div>
          <hr>
          <h1>Курсы</h1>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="individual-course" value="Курс индивидуальный" v-model="picked" />
            <label class="text-white" for="individual-course">Курс индивидуальный</label>
          </div>
          <hr>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="group-course" value="Курс групповой" v-model="picked" />
            <label class="text-white" for="group-course">Курс групповой</label>
          </div>
          <hr>
        </div>
      </div>
      <div class="form ">
        <label for="name">Время отправки*</label>
        <input type="text" placeholder="00:00" id="dispatch-time">
      </div>
      <div class=" d-flex align-items-center">
        <div class="d-flex  male d-flex align-items-center mr-30">
          <input class="my-checkbox" type="checkbox" id="push" name="notifications">
          <label  for="push">Push уведомления</label>
        </div>
        <div class="d-flex  female d-flex align-items-center">
          <input class="my-checkbox" type="checkbox"  id="sms" name="notifications">
          <label class="123"  for="sms">SMS сообщение</label>
        </div>
      </div>
      <div class="d-flex justify-content-between add-user-buttons">
        <button @click="addCardBirthday=false" class="dont">Отмена</button>
        <button class="submit" type="button" @click="addCardBirthday=false, addStatus=true, addStatusDelay('addStatus') ">Добавить</button>
      </div>
    </div>
  </div>



  <div @click="addCardHoliday=!addCardHoliday" v-if="addCardHoliday" class="add-user-modal d-flex justify-content-center align-items-center ">
    <div @click.stop  class="content">
      <div class="title">ПРАЗДНИК</div>
      <div class="form">
        <label for="name">Название рассылки*</label>
        <input type="text" placeholder="Введите название рассылки" id="name">
      </div>
      <div class="form position-relative">
        <label  for="surname">Заголовок**</label>
        <input ref="inputText" type="text" placeholder="Введите заголовок" id="heading">
        <div  @click="presentName('inputText')"  class=" label-name position-absolute">имя</div>
      </div>
      <div class="form position-relative">
        <label for="phone">Описание*</label>
        <textarea ref="descriptionTextarea"  type="text"  placeholder="Введите текст" class="description"
        ></textarea>
        <div @click="presentName('descriptionTextarea')" class="label-name position-absolute">имя</div>
      </div>
      <div class="form position-relative">
        <label for="name">Подарок*</label>
        <input  type="text" :value="picked"   id="present">
        <img @click="presentMenu=!presentMenu" :class="{'rotate-90':presentMenu}" class="row-right-icon" src="@/assets/images/icons/row-right.png">
        <div :class="{'d-block':presentMenu}" class="menu-type-1 pt-4 px-4 ">
          <h1 >Услуги</h1>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="yoga" value="Йога" v-model="picked" />
            <label class="text-white" for="yoga">Йога</label>
          </div>
          <hr>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="solarium" value="Солярий" v-model="picked" />
            <label class="text-white" for="solarium">Солярий</label>
          </div>
          <hr>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="dancing" value="Танцы" v-model="picked" />
            <label class="text-white" for="dancing">Танцы</label>
          </div>
          <hr>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="massage" value="Массаж" v-model="picked" />
            <label class="text-white" for="massage">Массаж</label>
          </div>
          <hr>
          <h1>Курсы</h1>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="individual-course" value="Курс индивидуальный" v-model="picked" />
            <label class="text-white" for="individual-course">Курс индивидуальный</label>
          </div>
          <hr>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="group-course" value="Курс групповой" v-model="picked" />
            <label class="text-white" for="group-course">Курс групповой</label>
          </div>
          <hr>
        </div>
      </div>
      <div class="menu-type-2 d-flex justify-content-between mt-3">
          <div class="form-recipients">
            <input type="radio" id="all" name="recipients">
            <label for="all">Все</label>
          </div>
          <div class="form-recipients">
            <input type="radio" id="man" name="recipients">
            <label for="man">Мужчина</label>
          </div>
          <div class="form-recipients">
            <input type="radio" id="woman" name="recipients">
            <label for="woman">Женщина</label>
          </div>
      </div>
     <div class="d-flex justify-content-between mt-3 text-center">
       <div @click="statusPicker=true" class="form col-5 position-relative">
         <label  for="surname">Дата публикации*</label>
         <input type="text"  id="heading">
       </div>
       <div @click="statusPicker=true" class="form col-5 position-relative">
         <label  for="surname">Дата окончания*</label>
         <input type="text"  id="heading">
       </div>
     </div>
      <div class="d-flex justify-content-between add-user-buttons">
        <button @click="addCardHoliday=false" class="dont">Отмена</button>
        <button class="submit" type="button" @click="addCardHoliday=false, addStatus=true, addStatusDelay('addStatus') ">Добавить</button>
      </div>
    </div>
  </div>

  <div @click="statusPicker=false"  v-if="statusPicker" class="user-page-card cards-modal d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <DataPicker/>
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
            <div class="page-title"><router-link to="/mailings-planned">Запланированные</router-link></div>
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
                  <div @click="dllStatus=true, addStatusDelay('dllStatus')"  class="d-flex align-items-center justify-content-between px-3 py-4">
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
        <div class="page-title"><router-link to="/mailing-delivered">Доставленные</router-link></div>
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
import { ref } from 'vue'
import DataPicker from "@/pages/analytics/DataPicker.vue";
const picked = ref(`Укажите вид поощрения`)
</script>
<script>
import ButtonSorting from "@/UI/ButtonSorting.vue";

export default {
  data() {
    return {
      addCardHoliday:false,
      dllStatus:false,
      addStatus:false,
      valueChecked: '',
      presentMenu: false,
      addCardBirthday: false,
      searchActive: '',
      addHoliday: false,
      delStatus:false,
      statusPicker:false
    };
  },
  methods: {
    presentName(ref) {
      const refObject  = this.$refs[ref]
      const text =refObject.value
      const cursorPosition = refObject.selectionStart;
      const textBeforeCursor = text.substring(0, cursorPosition);
      const textAfterCursor = text.substring(cursorPosition);

      refObject.value = textBeforeCursor + ' $имя$ ' + textAfterCursor;
    },
    addStatusDelay(i){
    setTimeout(()=>{
        this[i]=false
      },3000)
    }
},
  components: { ButtonSorting },
};


</script>

<style lang="scss" scoped>

</style>