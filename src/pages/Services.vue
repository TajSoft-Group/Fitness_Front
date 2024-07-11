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
          <div @click="addStatus=!addStatus" class="page-title">Услуги</div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="toggleModal('.add-curs')" class="add-user-btn">Добавить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="toggleModal('.add-curs')"  class="add-user-modal add-curs d-none d-flex justify-content-center align-items-center ">
    <div @click.stop  class="content">
      <div class="title">Создать услугу</div>
      <form class="form" @submit.prevent="submitForm(),toggleModal('.add-curs')">
        <label for="name">Название услуги</label>
        <input type="text" placeholder="Введите название услуги" id="name" v-model="formData.name">
        <div class="form position-relative">
          <label for="phone">Описание*</label>
          <textarea  type="text" v-model="formData.description"  placeholder="Введите текст" class="description"
          ></textarea>
        </div>
        <div class="form position-relative">
          <label for="phone">Добавить фотографию</label>
          <div class="img-card row p-3 justify-content-between">
            <div v-for="(image, index) in images" :key="index" class="card-add-img m-2">
              <img :src="image" class="card-img-top" alt="Product Image">
            </div>
            <div v-show="images.length<1" class="card-button align-content-center text-center m-2" @click="selectImage">
              <button type="button" class="add-button">+</button>
            </div>
          </div>
          <input type="file" ref="fileInput" @change="handleFileChange" style="display: none">
        </div>
        <label for="price_visit">Цена за посещение</label>
        <input type="text" placeholder="Цена за посещение" id="price_visit" v-model="formData.price_visit">
        <label for="status">Статус</label>
        <input type="text" placeholder="Скидка" id="status" v-model="formData.status">
        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="toggleModal('.add-curs')" class="dont" type="button">Отмена</button>
          <button class="submit" type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>

  <div @click="toggleModal('.pay-curs')" class="add-user-modal pay-curs d-none d-flex justify-content-center align-items-center ">
    <div @click.stop  class="content">
      <div class="title">оплата курса </div>
      <form class="form" @submit.prevent="coursesFn(), toggleModal('.pay-curs')">

        <label for="title">тип курса</label>
        <input type="text" placeholder="Введите название курса" id="title" v-model="addCurs.type_courses">
        <label for="title">название курса</label>
        <input type="text" placeholder="Введите название курса" id="title" v-model="addCurs.title">
        <div class="form position-relative">
          <label for="phone">Описание*</label>
          <textarea  type="text" v-model="addCurs.description"  placeholder="Введите текст" class="description"
          ></textarea>
        </div>
        <div class="position-relative">
          <label  for="name">выберите пользователя</label>
          <input type="text" id="present" v-model="activeTR">
          <img @click="presentMenu=!presentMenu" :class="{'rotate-90':presentMenu}" class="row-right-icon" src="@/assets/images/icons/row-right.png">
          <div :class="{'d-block':presentMenu}" class="menu-type-1 pt-4 px-4">
            <h1>Все пользователи</h1>
            <div role="button"  v-for="treners in userData" @click="cursData.user_id=treners.id,presentMenu=false,presentMenu=false,activeTR=treners.name+' '+treners.surname" class="statistics h-auto m-0 p-2"><hr class="m-0 p-1">
              {{treners.name+' '+ treners.surname}}
            </div>
          </div>
        </div>
        <label for="title">количество</label>
        <input type="text" placeholder="Введите количество" id="title" v-model="cursData.count">
        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="toggleModal('.pay-curs')" class="dont" type="button">Отмена</button>
          <button class="submit" type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col">
        <div class="row">
          <div @click="toggleModal('.pay-curs'),addCurs=curs,cursData.courses_id=curs.id" v-for="curs in cursList" class="uslug-card  p-0 position-relative">
<!--            <div class="position-absolute bg-red top-0 right border-radius-25 px-3 me-3 mt-2">-{{curs.discount+'%'}}</div>-->
            <img :src="'http://fitness.abdurazzoq.beget.tech/public/'+curs.img">
            <div class="product-info ">
              <div class="product-title mb-2 border-color-yellow">{{curs.name}}</div>
              <div class="product-price color-yellow d-flex ">{{curs.price_visit}} TJS
                <span class="product-old-price text-white "><s>{{curs.price}}</s>
              </span>
              </div>
              <div class="h6">{{curs.type_courses}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--  <div class="container">-->
  <!--    <div class="row">-->
  <!--      <div class="col">-->
  <!--        <div class="users-block">-->
  <!--          <table id="dataTable">-->
  <!--            <thead>-->
  <!--            <tr>-->
  <!--              <th>ФИО</th>-->
  <!--              <th>Телефон</th>-->
  <!--              <th>Статус</th>-->
  <!--              <th>Абонемент</th>-->
  <!--              <th>Курсы</th>-->
  <!--              <th>Услуги</th>-->
  <!--            </tr>-->
  <!--            </thead>-->
  <!--&lt;!&ndash;            <tbody v-show="!loading" v-for="(users, index) in DataUsers" :key="users.id" >&ndash;&gt;-->
  <!--&lt;!&ndash;            <tr>&ndash;&gt;-->
  <!--&lt;!&ndash;              <td><router-link :to="{ name: 'UserPage', params: { id: users.id } }">{{users.name+' '+ users.surname}}</router-link></td>&ndash;&gt;-->
  <!--&lt;!&ndash;              <td>{{ users.username }}</td>&ndash;&gt;-->
  <!--&lt;!&ndash;              <td>{{ users.status }}</td>&ndash;&gt;-->
  <!--&lt;!&ndash;              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>&ndash;&gt;-->
  <!--&lt;!&ndash;              <td>Кардио</td>&ndash;&gt;-->
  <!--&lt;!&ndash;              <td class="d-flex justify-content-center">&ndash;&gt;-->
  <!--&lt;!&ndash;                <div class="uslugi blue">1</div>&ndash;&gt;-->
  <!--&lt;!&ndash;                <div class="uslugi red">1</div>&ndash;&gt;-->
  <!--&lt;!&ndash;                <div class="uslugi green">1</div>&ndash;&gt;-->
  <!--&lt;!&ndash;              </td>&ndash;&gt;-->
  <!--&lt;!&ndash;            </tr>&ndash;&gt;-->
  <!--&lt;!&ndash;            </tbody>&ndash;&gt;-->
  <!--            <tbody v-if="loading">-->
  <!--            <tr>-->
  <!--              <td class="color-yellow w-100 d-flex justify-content-center">Загрузка...</td>-->
  <!--            </tr>-->
  <!--            </tbody>-->
  <!--          </table>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->

  <!--    <div class="row">-->
  <!--      <div class="col">-->
  <!--        <div class="user-block-bottom">-->
  <!--          <div class="d-flex justify-content-between">-->
  <!--            <div class="left">Общее количество пользователей: <span class="users-quantity">2504</span></div>-->
  <!--            <div class="right">-->
  <!--              <a class="active" href="#">1</a>-->
  <!--              <a href="#">2</a>-->
  <!--              <a href="#">3</a>-->
  <!--              <a href="#">4</a>-->
  <!--              <a href="#">5</a>-->
  <!--              <a href="#">6</a>-->
  <!--              <a href="#">7</a>-->
  <!--              <a href="#">8</a>-->
  <!--              <a href="#">9</a>-->
  <!--              <a href="#">10</a>-->
  <!--              <a>...</a>-->
  <!--              <a href="#">30</a>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<script>
import posts from "@/components/axios/posts.js";
import gets from "@/components/axios/get.js"
import form_Data from "@/components/axios/formData.js";
export default {
  data(){
    return{
      activeTR:'',
      idTr:'',
      images: [],
      imagesPost: [],
      addCurs:'',
      formData: {
        img:"",
        name:"",
        description:"",
        price_visit:"",
        status:"",
      },
      DataUsers: null,
      userData: null,
      cursList: '',
      cursData:{
        user_id:'',
        courses_id:'',
        count:''
      },
      modal:'auto',
      error: null,
      loading: true,
      searchActive:'',
      addStatus:false,
      addCard:false,
      modalSelector:'',
      presentMenu:false
    }
  },
  methods:{
    coursesFn(){
      posts('http://fitness.abdurazzoq.beget.tech/public/enroll/courses', {...this.cursData})
          .then(response => {
            this.Delay('loading', 1)
            console.log(this.cursData)
          })
          .catch(error => {
            this.error = error;
            this.Delay('loading', 1)
          });
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        this.imagesPost=file
        reader.onload = (e) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    getInfoUsers(){
      posts('http://fitness.abdurazzoq.beget.tech/public/users', {"form": "0", "to": '21'})
          .then(response => {
            this.userData = response.data.users;
            this.Delay('loading', 1)
          })
          .catch(error => {
            this.error = error;
            this.Delay('loading', 1)
          });
    },
    getInfo (url,dataStore,id) {

      gets(url)
          .then(response => {
            this[dataStore]=[]
            if (id===1){
              this[dataStore]=response.data.data
            }else if (id===2) {
              this[dataStore]=response.data.data
              console.log(this[dataStore])
            }
          })
          .catch(error => {
            console.log(error)
            this.error = error;
          });
    },

    async submitForm() {
      let FormData = this.formData
      FormData.img=this.imagesPost
      try {
        const response = await form_Data('http://fitness.abdurazzoq.beget.tech/public/services/create', FormData);
        if (response.status === 200) {
          this.addStatus = true;
          await this.getInfo('http://fitness.abdurazzoq.beget.tech/public/api/coach/all','DataUsers', 1)
          await this.getInfo('http://fitness.abdurazzoq.beget.tech/public/api/services/all','cursList', 2)
          await this.getInfoUsers()
          this.Delay('addStatus', 7);
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
      },t*1000)
    },
    clearData(data){
      for (let key in data){
        data[key]=''
      }
    },
    toggleModal(modalSelector) {
      this.modal = this.modal === 'auto' ? 'hidden' : 'auto';
      this.modalSelector=modalSelector
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
  },
  mounted() {
    this.getInfo('http://fitness.abdurazzoq.beget.tech/public/api/coach/all','DataUsers', 1)
    this.getInfo('http://fitness.abdurazzoq.beget.tech/public/api/services/all','cursList', 2)
    this.getInfoUsers()
  },
  watch: {
    modal() {
      this.updateToggleModal();
    }
  },
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