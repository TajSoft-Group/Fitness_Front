<template>
  <div class="container">
    <div class="row relative">
        <transition name="bounce" v-if="addStatus" class="added-user-message">
          <div class="result-true">
            <div class="result-true-card d-flex align-items-center">
              <img class="m-4 img-width-40" src="@/assets/images/icons/check_add.png">
              <div class="result-true-content ">
                <div class="result-true-title">Пользователь добавлен</div>
                <div class="result-true-body mt-2">Новый пользователь успешно добавлен в список клиентов</div>
              </div>
            </div>
          </div>
        </transition>

      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title"><router-link to="/"><img class="px-3 pb-2" src="@/assets/images/icons/Stroke.png">Клиенты</router-link></div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="addCard=true" class="add-user-btn">Добавить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="addCard=!addCard" v-if="addCard" class="add-user-modal d-flex justify-content-center align-items-center ">
    <div @click.stop  class="content">
      <div class="title">ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ</div>
      <div class="form">
        <label for="name">Имя*</label>
        <input type="text" placeholder="Введите имя" id="name">
      </div>
      <div class="form">
        <label for="surname">Фамилия*</label>
        <input type="text" placeholder="Введите фамилию" id="surname">
      </div>
      <div class="form">
        <label for="phone">Номер телефона*</label>
        <input type="text" placeholder="Введите номер телефона" id="phone">
      </div>
      <div class="form">
        <label for="name">Дата рождения*</label>
        <input type="text" placeholder="Введите дату рождения" id="name">
      </div>
      <div class="checkbox d-flex align-items-center">
        <div class="male d-flex align-items-center mr-30">
          <input type="radio" id="male" name="gender">
          <label for="male">Мужской</label>
        </div>
        <div class="female d-flex align-items-center">
          <input type="radio" id="female" name="gender">
          <label for="female">Женский</label>
        </div>
      </div>
      <div class="info d-flex justify-content-between form">
        <div class="age mr-30">
          <label for="age">Возраст</label>
          <input type="text" id="age">
        </div>
        <div class="age mr-30">
          <label for="height">Рост</label>
          <input type="text" id="height">
        </div>
        <div class="age">
          <label for="mass">Вес</label>
          <input type="text" id="mass">
        </div>
      </div>
      <div class="d-flex justify-content-between add-user-buttons">
        <button @click="addCard=false" class="dont">Отмена</button>
        <button class="submit" type="button">Добавить</button>
      </div>
    </div>
  </div>


  <div class="container">
    <div class="row">
      <div class="col-4">
        <div class="bg-gray card-block ">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Новые пользователи</div>
              <div class="card-quantity">0</div>
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
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="bg-gray card-block ">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Абонемент</div>
              <div class="card-quantity">340</div>
              <div class="card-statistics d-flex align-items-center">
                <div class="d-flex percentage statistics-up align-items-center justify-content-center">
                  <div>
                    <img class="arrow-down d-none" height="12" src="@/assets/images/icons/arrow-up.png">
                    <img height="12" src="@/assets/images/icons/arrow-up.png">
                  </div>
                  <div class="div">10%</div>
                </div>
                <div>от предыдущего периода</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="">
          <div class="bg-gray card-block ">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">Курсы индивидуальные</div>
                <div class="card-quantity">0</div>
                <div class="card-statistics d-flex align-items-center">
                  <div class="d-flex percentage statistics-down align-items-center justify-content-center">
                    <div>
                      <img class="arrow-down" height="12" src="@/assets/images/icons/arrow-up.png">
                      <img class="d-none" height="12" src="@/assets/images/icons/arrow-up.png">
                    </div>
                    <div class="div">10%</div>
                  </div>
                  <div>от предыдущего периода</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="">
          <div class="bg-gray card-block ">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">Курсы групповые</div>
                <div class="card-quantity">0</div>
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
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="">
          <div class="bg-gray card-block ">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">Услуги</div>
                <div class="card-quantity">0</div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container relative">
    <div class="row">
      <div class="col">
        <div :class="{'search-input':searchActive.length>0}"  class="d-flex justify-content-between align-items-center search-block">
          <img src="@/assets/images/icons/search.png" alt="search">
          <input v-model="test" type="text" id="searchInput" placeholder="Поиск по всем параметрам">
          <router-link to="user-locked">Заблокированные</router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div v-if="searchActive.length>0" class="users-block bg-gray search-result-block ">
          <table>

            <thead>
            <tr style="opacity: 0">
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Статус</th>
              <th>Абонемент</th>
              <th>Курсы</th>
              <th>Услуги</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><router-link to="userpage">Азиза Султанова</router-link></td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi red">1</div>
                <div class="uslugi green">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi green">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi blue">1</div>
                <div class="uslugi red">1</div>
                <div class="uslugi green">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi blue">1</div>
                <div class="uslugi red">1</div>
                <div class="uslugi green">1</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="users-block">
          <table id="dataTable">
            <thead>
            <tr>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Статус</th>
              <th>Абонемент</th>
              <th>Курсы</th>
              <th>Услуги</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><router-link to="/user-page">Азиза Султанова</router-link></td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi red">1</div>
                <div class="uslugi green">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi green">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi blue">1</div>
                <div class="uslugi red">1</div>
                <div class="uslugi green">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi red">1</div>
                <div class="uslugi green">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi green">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi blue">1</div>
                <div class="uslugi red">1</div>
                <div class="uslugi green">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi red">1</div>
                <div class="uslugi green">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi green">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi blue">1</div>
                <div class="uslugi red">1</div>
                <div class="uslugi green">1</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="user-block-bottom">
          <div class="d-flex justify-content-between">
            <div class="left">Общее количество пользователей: <span class="users-quantity">2504</span></div>
            <div class="right">
              <a class="active" href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a href="#">6</a>
              <a href="#">7</a>
              <a href="#">8</a>
              <a href="#">9</a>
              <a href="#">10</a>
              <a>...</a>
              <a href="#">30</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return{
      searchActive:'',
      addStatus:true,
      addCard:false
    }
  },
  methods:{
    addStatusDelay(){
      setTimeout(()=>{
        this.addStatus=false
      },2000)
    }
  },
  mounted() {
    this.addStatusDelay();
  }
}

</script>

<style lang="scss" scoped>

</style>