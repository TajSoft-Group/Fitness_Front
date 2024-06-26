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
          <div class="page-title"><router-link to="/"><img class="px-3 pb-2" src="@/assets/images/icons/Stroke.png">Персонал</router-link></div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="toggleModal('.add-user-btn')" class="add-user-btn">Добавить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="add-user-modal d-flex justify-content-center align-items-center d-none">
    <div class="content">
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
        <button class="dont">Отмена</button>
        <button class="submit" type="button">Добавить</button>
      </div>
    </div>
  </div>


  <div class="container relative">
    <div class="row">
      <div class="col">
        <div :class="{'search-input':searchActive.length>0}" class="d-flex justify-content-between align-items-center search-block">
          <img src="@/assets/images/icons/search.png" alt="search">
          <input v-model="searchActive"  type="text" id="searchInput" placeholder="Поиск по всем параметрам">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div v-show="searchActive.length>0" class="users-block search-result-block ">
          <table>
            <thead>
            <tr style="opacity: 0">
              <th width="40%" style="vertical-align: middle;">ФИО</th>
              <th width="30%" style="vertical-align: middle;">Должность</th>
              <th width="30%" style="vertical-align: middle;">Статус</th>
            </tr>
            </thead>
            <tbody>
            <tr class="align-items-center hover-yellow personal-tr">
              <td class="d-flex justify-content-center align-items-center">
                <div class="personal-img"><img src="@/assets/images/avatar.jpg" alt=""></div>
                <div><a href="#">Азиза Султанова</a></div>
              </td>
              <td>
                <div>Тренер</div>
                <div class="position">Кардио нагрузка</div>
              </td>
              <td class="personal-status green">На работе</td>
            </tr>
            <tr class="align-items-center hover-yellow personal-tr">
              <td class="d-flex justify-content-center align-items-center">
                <div class="personal-img"><img src="@/assets/images/avatar.jpg" alt=""></div>
                <div><a href="#">Азиза Султанова</a></div>
              </td>
              <td>
                <div>Тренер</div>
                <div class="position">Кардио нагрузка</div>
              </td>
              <td class="personal-status green">На работе</td>
            </tr>
            <tr class="align-items-center hover-yellow personal-tr">
              <td class="d-flex justify-content-center align-items-center">
                <div class="personal-img"><img src="@/assets/images/avatar.jpg" alt=""></div>
                <div><router-link to="/trainer-page">Азиза Султанова</router-link></div>
              </td>
              <td>
                <div>Тренер</div>
                <div class="position">Кардио нагрузка</div>
              </td>
              <td class="personal-status green">На работе</td>
            </tr>
            <tr class="align-items-center hover-yellow personal-tr">
              <td class="d-flex justify-content-center align-items-center">
                <div class="personal-img"><img src="@/assets/images/avatar.jpg" alt=""></div>
                <div><a href="#">Азиза Султанова</a></div>
              </td>
              <td>
                <div>Тренер</div>
                <div class="position">Кардио нагрузка</div>
              </td>
              <td class="personal-status green">На работе</td>
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
          <table id="dataTable" class="personal-table">
            <thead>
            <tr>
              <th width="40%" style="vertical-align: middle;">ФИО</th>
              <th width="30%" style="vertical-align: middle;">Должность</th>
              <th width="30%" style="vertical-align: middle;">Статус</th>
            </tr>
            </thead>
            <tbody>
            <tr class="align-items-center personal-tr">
              <td class="d-flex justify-content-center align-items-center">
                <div class="personal-img"><img src="@/assets/images/avatar.jpg" alt=""></div>
                <div><a href="#">Азиза Султанова</a></div>
              </td>
              <td>
                <div>Тренер</div>
                <div class="position">Кардио нагрузка</div>
              </td>
              <td class="personal-status green">На работе</td>
            </tr>
            <tr class="align-items-center personal-tr">
              <td class="d-flex justify-content-center align-items-center">
                <div class="personal-img"><img src="@/assets/images/avatar.jpg" alt=""></div>
                <div><a href="#">Азиза Султанова</a></div>
              </td>
              <td>
                <div>Тренер</div>
                <div class="position">Кардио нагрузка</div>
              </td>
              <td class="personal-status green">На работе</td>
            </tr>
            <tr class="align-items-center personal-tr">
              <td class="d-flex justify-content-center align-items-center">
                <div class="personal-img"><img src="@/assets/images/avatar.jpg" alt=""></div>
                <div><a href="#">Азиза Султанова</a></div>
              </td>
              <td>
                <div>Тренер</div>
                <div class="position">Кардио нагрузка</div>
              </td>
              <td class="personal-status green">На работе</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
  <div class="container mb-5">
    <div class="row">
      <div class="col">
        <div class="users-block">
          <table class="personal-table">
            <thead>
            <tr>
              <th width="40%" style="vertical-align: middle;">ФИО</th>
              <th width="30%" style="vertical-align: middle;">Должность</th>
              <th width="30%" style="vertical-align: middle;">Статус</th>
            </tr>
            </thead>
            <tbody>
            <tr class="align-items-center personal-tr">
              <td class="d-flex justify-content-center align-items-center">
                <div class="personal-img"><img src="@/assets/images/avatar.jpg" alt=""></div>
                <div><router-link to="/trainer-page">Азиза Султанова</router-link></div>
              </td>
              <td>
                <div>Тренер</div>
                <div class="position">Кардио нагрузка</div>
              </td>
              <td class="personal-status red">На карантине</td>
            </tr>
            <tr class="align-items-center personal-tr">
              <td class="d-flex justify-content-center align-items-center">
                <div class="personal-img"><img src="@/assets/images/avatar.jpg" alt=""></div>
                <div><a href="#">Азиза Султанова</a></div>
              </td>
              <td>
                <div>Тренер</div>
                <div class="position">Кардио нагрузка</div>
              </td>
              <td class="personal-status red">На карантине</td>
            </tr>
            </tbody>
          </table>
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
      addCard:false,
      modal:'auto',
      modalSelector:''
    }
  },
  methods:{
    addStatusDelay(){
      setTimeout(()=>{
        this.addStatus=false
      },2000)
    }
  },
  watch: {
    modal() {
      this.updateToggleModal();
    }
  },
  mounted() {
    this.addStatusDelay();
  },
  updateToggleModal() {
    console.log(this.modal)
    if (this.modal==="auto"){
      document.querySelector(this.modalSelector).classList.add("d-none")
      document.body.style.overflow=this.modal
    }else {
      document.body.style.overflow=this.modal
      document.querySelector(this.modalSelector).classList.remove("d-none")
    }

  },
  toggleModal(modalSelector) {
    this.modal = this.modal === 'auto' ? 'hidden' : 'auto';
    this.modalSelector=modalSelector
  }
}
</script>

<style lang="scss" scoped>

</style>
