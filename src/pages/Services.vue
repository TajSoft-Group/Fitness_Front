
<script >
import ButtonSorting from "@/UI/ButtonSorting.vue";
import posts from "@/components/axios/posts.js";

export default {
  components:{ButtonSorting},
  data(){
    return{
      formData: {
        name:"",
        surname:"",
        username:"",
        status:"active",
        age:"",
        weight:"",
        height:"",
        gender:"",
        birthday:"",
        mobile_id:"",
        password: ""
      },
      statusPicker:false,
      addStatus:false,
      addCard:false,
      images: [],
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
        reader.onload = (e) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    submitForm() {
      this.formData.status='active'
      posts('http://fitness.abdurazzoq.beget.tech/public/user_register', {...this.formData})
          .then(response => {
            console.log(this.formData)
            if (response.status===200){
              this.addStatus=true
              this.getInfo()
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
  }
  }
</script>


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
        <label for="name">Название курса</label>
        <input type="text" placeholder="Введите название услуги" id="name" v-model="formData.name">

        <label for="surname">Цена за посещение</label>
        <input type="text" placeholder="Введите цену за одно посещение" id="surname" v-model="formData.surname">

        <div class="menu-type-2 d-flex justify-content-between pt-3 mt-3">
          <div class="form-recipients">
            <input type="radio" id="man" name="gender" value="1" v-model="formData.gender">
            <label for="man">Индивидуальные</label>
          </div>
          <div class="form-recipients">
            <input type="radio" id="woman" name="gender" value="2" v-model="formData.gender">
            <label for="woman">Групповые</label>
          </div>
        </div>
        <div class="form position-relative">
          <label for="phone"></label>
          <div class="img-card row p-3 justify-content-between">
            <div v-for="(image, index) in images" :key="index" class="card-add-img m-2">
              <img :src="image" class="card-img-top" alt="Product Image">
            </div>
            <div v-show="images.length<1" class="card-button align-content-center text-center m-2" @click="selectImage">
              <button  class="add-button">+</button>
            </div>
          </div>
          <input type="file" ref="fileInput" @change="handleFileChange" style="display: none">
        </div>

        <label for="password">Пароль*</label>
        <input type="text" placeholder="пароль" id="password" v-model="formData.password">

        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="addCard=false" class="dont" type="button">Отмена</button>
          <button class="submit" type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-6">
        <div class="bg-gray card-block">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Продажа услуг</div>
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
                <div class="card-quantity">122435 TJS</div>
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
    <div class="row">
      <div class="col-4">
        <div class="bg-gray card-block pr-20" >
          <div class="d-flex justify-content-between">
            <div class="card-left w-100">
              <div class="card-title">Йога</div>
              <div class="card-quantity">32</div>
              <div class="card-statistics d-flex align-items-center justify-content-between">
                <h3>3500 TJS</h3>
                 <div class="d-flex percentage align-items-center justify-content-center">
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

      <div class="col-4">
        <div class="bg-gray card-block pr-20" >
          <div class="d-flex justify-content-between">
            <div class="card-left w-100">
              <div class="card-title">Массаж</div>
              <div class="card-quantity">32</div>
              <div class="card-statistics d-flex align-items-center justify-content-between">
                <h3>3500 TJS</h3>
                 <div class="d-flex percentage align-items-center justify-content-center">
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

      <div class="col-4">
        <div class="bg-gray card-block pr-20" >
          <div class="d-flex justify-content-between">
            <div class="card-left w-100">
              <div class="card-title">Танцы</div>
              <div class="card-quantity">32</div>
              <div class="card-statistics d-flex align-items-center justify-content-between">
                <h3>3500 TJS</h3>
                 <div class="d-flex percentage align-items-center justify-content-center">
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
          <table id="dataTable" class="personal-table">
            <thead>
            <tr >
              <th style="vertical-align: middle;">
                <div class="d-flex justify-content-center">
                  ФИО <button-sorting style="margin-left: 10px"/>
                </div>
              </th>
              <th style="vertical-align: middle;">
                <div class="d-flex justify-content-center">
                  Телефон <button-sorting style="margin-left: 10px"/>
                </div>
              </th>
              <th style="vertical-align: middle;">Кол-во</th>
              <th style="vertical-align: middle;">Цена</th>
              <th style="vertical-align: middle;">Скидка</th>
              <th style="vertical-align: middle;">Цена со %</th>
              <th style="vertical-align: middle;">Аата покупки</th>
            </tr>
            </thead>
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
              <td>05.11.2023</td>
            </tr>
            <tr class="align-items-center personal-tr">
              <td>
                <a href="#">Азиза Султанова</a>
              </td>
              <td>92 000 00 00</td>
              <td>15</td>
              <td>50 TJS</td>
              <td>-5%</td>
              <td>480 TJS</td>
              <td>05.11.2023</td>
            </tr>
            <tr class="align-items-center personal-tr">
              <td>
                <a href="#">Азиза Султанова</a>
              </td>
              <td>92 000 00 00</td>
              <td>15</td>
              <td>50 TJS</td>
              <td>-5%</td>
              <td>480 TJS</td>
              <td>05.11.2023</td>
            </tr>
            <tr class="align-items-center personal-tr">
              <td>
                <a href="#">Азиза Султанова</a>
              </td>
              <td>92 000 00 00</td>
              <td>15</td>
              <td>50 TJS</td>
              <td>-5%</td>
              <td>480 TJS</td>
              <td>05.11.2023</td>
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
</style>