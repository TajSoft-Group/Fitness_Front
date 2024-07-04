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
          <div @click="addStatus=!addStatus" class="page-title">Курсы</div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="addCard=true" class="add-user-btn">Добавить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="addCard=!addCard" v-if="addCard" class="add-user-modal d-flex justify-content-center align-items-center ">
    <div @click.stop  class="content">
      <div class="title">СОЗДАТЬ КУРС</div>
      <form class="form" @submit.prevent="submitForm(), addCard=false">

        <label for="name" class="m-0 p-0 mt-4">ТИП КУРССА</label>
        <div class="menu-type-2 d-flex justify-content-between ">
          <div class="form-recipients">
            <input type="radio" id="ind" name="type" value="1" v-model="formData.type_courses">
            <label for="ind" class="text-white">Индивидуальные</label>
          </div>
          <div class="form-recipients">
            <input type="radio" id="type" name="type" value="2" v-model="formData.type_courses">
            <label for="group" class="text-white">Групповые</label>
          </div>
        </div>

        <label for="title">Название курса</label>
        <input type="text" placeholder="Введите название курса" id="title" v-model="formData.title">
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
        <label for="price">Цена курса</label>
        <input type="text" placeholder="Цена за посещение" id="price" v-model="formData.price">
        <label for="discount">Скидка в %</label>
        <input type="text" placeholder="Скидка" id="discount" v-model="formData.discount">
        <label for="discount_price" class="text-end">Итого: <span v-if="formData.price!==''">{{formData.discount_price=formData.price-Math.round((formData.price/100) * formData.discount)}}</span></label><!--        <div class="form position-relative">-->
        <div class="position-relative">
        <label  for="name">Выбор тренера</label>
        <input type="text" id="present" v-model="activeTR">
        <img @click="presentMenu=!presentMenu" :class="{'rotate-90':presentMenu}" class="row-right-icon" src="@/assets/images/icons/row-right.png">
        <div :class="{'d-block':presentMenu}" class="menu-type-1 pt-4 px-4">
          <h1>Все тренеры</h1>
          <div role="button"  v-for="treners in DataUsers" @click="idTr=treners.id,presentMenu=false,activeTR=treners.name+' '+treners.surname" class="statistics h-auto m-0 p-2"><hr class="m-0 p-1">
            {{treners.name+' '+ treners.surname}}
          </div>
        </div>
        </div>
        <label for="benefits_course">преимущества курса</label>
        <input type="text" placeholder="преимущества курса" id="benefits_course" v-model="formData.benefits_course">
        <label for="create_date">начало курса*</label>
        <input type="date" placeholder="1994-11-23" id="create_date" v-model="formData.create_date">
        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="addCard=false" class="dont" type="button">Отмена</button>
          <button class="submit" type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col">
        <div class="row">
          <div v-for="curs in cursList" class="uslug-card  p-0 position-relative">
            <div class="position-absolute bg-red top-0 right border-radius-25 px-3 me-3 mt-2">-{{curs.discount+'%'}}</div>
            <img :src="'http://fitness.abdurazzoq.beget.tech/public/'+curs.img">
            <div class="product-info ">
              <div class="product-title mb-2 border-color-yellow">{{curs.title}}</div>
              <div class="product-price color-yellow d-flex ">{{curs.discount_price}} TJS
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
      formData: {
        title:"",
        type_courses:"",
        description:"",
        coach_id:"",
        benefits_course:"[1]",
        img:"",
        status:"1",
        trainning_days:'[]',
        create_date:'',
        price:"",
        discount:"",
        discount_price:"",
        direction_id:"1",
        user_count:"1",
      },
      DataUsers: null,
      cursList: '',
      error: null,
      loading: true,
      searchActive:'',
      addStatus:false,
      addCard:false,
      presentMenu:false
    }
  },
  methods:{
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
    getInfo (url,dataStore,id) {

      gets(url)
          .then(response => {
            console.log(response)
            this[dataStore]=[]
            if (id===1){
              this[dataStore]=response.data.data
            }else if (id===2) {
              this[dataStore]=response.data
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
      FormData.coach_id=this.idTr
      try {
        console.log(FormData)
        const response = await form_Data('http://fitness.abdurazzoq.beget.tech/api/courses/create', FormData);
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
      },t*1000)
    },
    clearData(data){
      for (let key in data){
        data[key]=''
      }
    }
  },
  mounted() {
    this.getInfo('http://fitness.abdurazzoq.beget.tech/public/api/coach/all','DataUsers', 1)
    this.getInfo('http://fitness.abdurazzoq.beget.tech/api/courses/all','cursList', 2)
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