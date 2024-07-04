<template>


  <div class="container">
    <div class="row relative">
      <div :class="[addStatus ? 'show-false' : 'show-add']"  class="added-user-message">
        <div class="result-true">
          <div class="result-true-card d-flex align-items-center">
            <img class="m-4 img-width-40" src="@/assets/images/icons/check_add.png">
            <div class="result-true-content ">
              <div class="result-true-title">Пользователь <span class="color-yellow">{{formData.name+' '+formData.surname}}</span> добавлен</div>
              <div class="result-true-body mt-2">Новый пользователь успешно добавлен в список клиентов</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div  class="page-title">Персонал</div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="toggleModal('.add-user-modal')" class="add-user-btn">Добавить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="toggleModal('.add-user-modal')" style="overflow: auto"  class="add-user-modal d-none d-flex justify-content-center align-items-center ">
    <div @click.stop  class="content">
      <div class="title">ДОБАВИТЬ ПЕРСОНАЛ</div>
      <form class="form" @submit.prevent="submitForm(), addCard=false">
        <label for="name">Имя*</label>
        <input type="text" placeholder="Введите имя" id="name" v-model="formData.name">

        <label for="surname">Фамилия*</label>
        <input type="text" placeholder="Введите фамилию" id="surname" v-model="formData.surname">

        <label for="phone_number">Номер телефона**</label>
        <input type="text" placeholder="Введите номер телефона" id="phone_number" v-model="formData.phone_number">
<!--        <div class="form position-relative">-->
<!--          <label for="name">Должность*</label>-->
<!--          <input  type="text" :value="picked"   id="present">-->
<!--          <img @click="presentMenu=!presentMenu" :class="{'rotate-90':presentMenu}" class="row-right-icon" src="@/assets/images/icons/row-right.png">-->
<!--          <div :class="{'d-block':presentMenu}" class="menu-type-1 pt-4 px-4 ">-->
<!--            <h1 >Услуги</h1>-->
<!--            <div @click="presentMenu=!presentMenu" class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">-->
<!--              <input type="radio" id="yoga" value="Йога" v-model="picked" />-->
<!--              <label class="text-white" for="yoga">Тренер</label>-->
<!--            </div>-->
<!--            <hr>-->
<!--            <div @click="presentMenu=!presentMenu" class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">-->
<!--              <input type="radio" id="solarium" value="Солярий" v-model="picked" />-->
<!--              <label class="text-white" for="solarium">Администратор</label>-->
<!--            </div>-->
<!--            <hr>-->
<!--            <div @click="presentMenu=!presentMenu" class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">-->
<!--              <input type="radio" id="dancing" value="Танцы" v-model="picked" />-->
<!--              <label class="text-white" for="dancing">Менеджер</label>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <label for="work_experience">Опыт работы*</label>
        <input type="text" placeholder="Укажите опыт работы" id="work_experience" v-model="formData.work_experience">

<!--        <label for="surname">Направление*</label>-->
<!--        <div class="menu-type-2 d-flex justify-content-between  ">-->
<!--          <div class="form-recipients">-->
<!--            <input type="radio" id="man" name="gender" value="1" v-model="formData.gender">-->
<!--            <label class="text-white" for="man">Кардио нагрузка</label>-->
<!--          </div>-->
<!--          <div class="form-recipients">-->
<!--            <input type="radio" id="woman" name="gender" value="2" v-model="formData.gender">-->
<!--            <label class="text-white" for="woman">Силовая нагрузка</label>-->
<!--          </div>-->
<!--        </div>-->
        <label for="surname">Фотография тренера*</label>
        <div class="form position-relative mt-2">
          <div class="row p-1 justify-content-center img-card ">
            <div v-if="images.length <= 0" class="opacity-50 text-center">Фотография тренера
            Минимальный размер
            200x200 px
            Максимальное кол-во
            фотографий: 1</div>
            <div v-for="(image, index) in images" :key="index" class="card-add-img m-2">
              <img :src="image" class="card-img-top" alt="Product Image">
            </div>
            <div @click="selectImage(1)" v-show="images.length < 1" class="card-button align-content-center text-center m-2">
              <button type="button" class="add-button">+</button>
            </div>
          </div>
          <label for="surname">Фотография фона*</label>
          <div class="col-12 p-1 img-card mt-4 d-flex flex-wrap">
            <div v-if="images.length <= 0" class="opacity-50 text-center w-100">
              Фотография фона
              Минимальный размер 1240x400 px
              Максимальное кол-во фотографий: 5
            </div>
            <div v-for="(image, index) in images2" :key="index" class="card-add-img m-2">
              <img :src="image" class="card-img-top" alt="Product Image">
            </div>
            <div @click="selectImage(2)" v-show="images2.length < 5" class="card-button align-content-center text-center m-2">
              <button type="button" class="add-button">+</button>
            </div>
          </div>
          <input type="file" ref="fileInput1" @change="handleFileChange(1)" style="display: none">
          <input type="file" ref="fileInput2" @change="handleFileChange(2)" style="display: none">
        </div>
        <label for="surname">Выберите цвет</label>
        <div class="ps-3 img-card d-flex flex-wrap">
            <div v-for="(color, index) in colors" :key="index" :class="{'bg-black_2':activeColor===color}" class=" p-2  ">
              <div :style="{ backgroundColor: color }" class="color-circle" @click="selectColor(color)"></div>
            </div>
        </div>
        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="addCard=false" class="dont" type="button">Отмена</button>
          <button class="submit" type="submit">Добавить</button>
        </div>
      </form>
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
                <div><a href="#">Азизқққа Султанова</a></div>
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
<!--На работе-->
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
            <tr v-for="personal in DataUsers" class="align-items-center personal-tr">
              <td class="d-flex justify-content-center align-items-center">
                <router-link :to="{ name: 'TrainerPage', params: { id: personal.id } }" class="d-flex col-8 align-items-center " >
                <div class="personal-img" :style="{borderColor:personal.color}" ><img :src="'http://fitness.abdurazzoq.beget.tech/public/'+personal.avatar" alt=""></div>
                <div>{{personal.name+' '+personal.surname}}</div>
                </router-link>
              </td>
              <td>
                <div>Тренер</div>
                <div class="position">Кардио нагрузка</div>
              </td>
              <td class="personal-status">на работе</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
<!-- На карантине  -->
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
import {ref} from "vue";
import form_Data from "@/components/axios/formData.js";
import gets from "@/components/axios/get.js";
const picked = ref(`Выберите должность`)
export default {
  components:{picked},
  data(){
    return{
      picked:picked,
      images: [],
      images2: [],
      imagesPost: [],
      imagesPost2: [],
      formData: {
        name:"",
        surname:"",
        phone_number:"",
        work_experience:"",
        avatar:'',
        cover_imgs:'',
        color:'',
        courses_completed:"0",

      },
      colors: [
        '#FF0000', '#FF4500', '#FFA500', '#FF6347',
        '#FFFF00', '#ADFF2F', '#7CFC00', '#00FF00',
        '#00FA9A', '#00CED1'
      ],
      presentMenu:false,
      statusPicker:false,
      searchActive:'',
      addStatus:false,
      addCard:false,
      modal:'auto',
      DataUsers:'',
      modalSelector:'',
      activeColor:'12'
    }
  },
  methods:{
    getInfo(){
      gets('http://fitness.abdurazzoq.beget.tech/public/api/coach/all')
          .then(response => {
            this.DataUsers = response.data.data;
            this.Delay('loading', 1)
            console.log(this.DataUsers)
          })
          .catch(error => {
            this.error = error;
            this.Delay('loading', 1)
          });
    },
    selectColor(color) {
      this.activeColor=color
    },
    toggleModal(modalSelector) {
      this.modal = this.modal === 'auto' ? 'hidden' : 'auto';
      this.modalSelector = modalSelector;
    },
    updateToggleModal() {
      if (this.modal==="auto"){
        document.querySelector(this.modalSelector).classList.add("d-none")
        document.body.style.overflow=this.modal
      }else{
        document.body.style.overflow=this.modal
        document.querySelector(this.modalSelector).classList.remove("d-none")
      }

    },
    selectImage(inputNumber) {
      if (inputNumber === 1) {
        this.$refs.fileInput1.click();
      } else if (inputNumber === 2) {
        this.$refs.fileInput2.click();
      }
    },
    handleFileChange(inputNumber) {
      const fileInput = inputNumber === 1 ? this.$refs.fileInput1 : this.$refs.fileInput2;
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (inputNumber === 1) {
            this.imagesPost=file
            this.images.push(e.target.result);
          } else if (inputNumber === 2) {
            this.imagesPost2.push(file)
            this.images2.push(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    async submitForm() {
      console.log(this.images)
      console.log(this.imagesPost)
      let FormData = this.formData
      FormData.avatar=this.imagesPost
      FormData.color=this.activeColor
      FormData.cover_imgs=this.imagesPost2
      try {
        console.log(FormData)
        const response = await form_Data('http://fitness.abdurazzoq.beget.tech/public/coach/create', FormData);
        console.log(response);

        if (response.status === 200) {
          this.addStatus = true;
          await this.getInfo();
          this.Delay('addStatus', 5);
        } else {
          console.error(`Запрос завершился с ошибкой: ${response.status}`);
        }
      } catch (error) {
        console.error('Ошибка при отправке данных:', error);
      }
    },
    Delay(target,t){
      setTimeout(()=>{
        this[target]=false
        // this.clearData(this.formData)
      },t*1000)
    },
  },
  watch: {
    modal() {
      this.updateToggleModal();
    }
  },
  mounted() {
    this.getInfo()
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
button.active {
  background-color: #c3ff00;
  color: #333;
}
button.add-button {
  background: url("@/assets/images/icons/add.png") center;
  color: #333;
  border-radius: 50%;
  min-width: 43px;
  min-height: 43px;
  padding: 0;
}
.add-user-modal .content {
  max-height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
}
</style>
