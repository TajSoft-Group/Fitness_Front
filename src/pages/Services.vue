<template>
  <div @click="toggleModal('.clients-list')"
    class="base-modal clients-list d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="holder">
      <div class="base-modal-top">
        <div class="title">Список клиентов</div>
        <button class="button-close" @click="toggleModal('.clients-list')"></button>
      </div>
      <div class="content">
        <form class="form" @submit.prevent="changeCourse(), toggleModal('.clients-list')">
          <div class="search-input pb-4">
            <input v-model="searchQuery" type="text" placeholder="Поиск" />
          </div>

          <div class="clients-list-holder">
            <div role="button" v-for="(trener, index) in filteredClients" :key="trener.id"
              class="user-list h-auto m-0 p-2">
              <div class="user-list-item" style="font-size: 20px" :class="{ active: activeIndex === index }"
                @click.self="toggleCollapse(index)">
                <div class="user-list-item-img"
                  style="width: 50px; aspect-ratio: 1/1; overflow: hidden; border-radius: 50%; object-fit: cover; margin-right: 15px;">
                  <img v-if="trener.img" :src="`https://api.mubingym.com/${trener.img}`" alt="" />
                  <img v-else src="@/assets/images/user-photo.png" alt="" />
                </div>
                <p class="w-100 m-0">{{ trener.name + " " + trener.surname }} <br> <span class="badge bg-yellow">{{
                  trener.registration_date }}</span>
                </p>
              </div>
              <div v-if="activeIndex === index && trener.services.length" class="collapse-content">
                <ul class="user-list-inner">
                  <li v-for="(course, index) in trener.services" :key="index" class="d-flex">
                    <label class="custom-checkbox" :class="{ disabled: course.count <= 0 }">
                      <span>{{ course.service_name }}</span>
                      <input type="radio" :name="`course-user-${trener.id}`" :disabled="course.count <= 0" @change="
                        selectedCourse(trener.id, course.id, trener.name)
                        " />
                      <span class="custom-checkmark"></span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between add-user-buttons">
            <button @click="toggleModal('.clients-list')" class="dont" type="button">
              Отмена
            </button>
            <button class="submit" type="submit">Добавить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row relative">
      <!-- <div
        :class="[addStatus ? 'show-false' : 'show-add']"
        class="added-user-message"
      >
        <div class="result-true">
          <div class="result-true-card d-flex align-items-center">
            <img
              class="m-4 img-width-40"
              src="@/assets/images/icons/check_add.png"
            />
            <div class="result-true-content">
              <div class="result-true-title">
                Пользователь
                <span class="color-yellow">{{
                  formData.name + " " + formData.surname
                }}</span>
                добавлен
              </div>
              <div class="result-true-body mt-2">
                Новый пользователь успешно добавлен в список клиентов
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div @click="addStatus = !addStatus" class="page-title">Услуги</div>
          <div class="user-add-btn d-flex justify-content-center align-items-center relative">
            <button @click="toggleModal('.clients-list')" class="add-user-btn mx-3">
              Список клиентов
            </button>
            <button @click="toggleModal('.add-curs'); (edit = false, setFormData())" class="add-user-btn">
              Добавить
            </button>
            <transition name="bounce" v-if="addStatus" class="added-user-message">
              <div class="result-true">
                <div class="result-true-card d-flex align-items-center">
                  <img class="m-4 img-width-40" src="@/assets/images/icons/check_add.png" />
                  <div class="result-true-content">
                    <!-- <div
                      v-if="activeCourse && activeCourse.name"
                      class="result-true-title"
                    >
                      Пользователь {{ activeCourse.name }} добавлен
                    </div> -->
                    <div class="result-true-body mt-2">
                      {{ messageSuccess }}
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- add modal -->
  <div @click="toggleModal('.add-curs')"
    class="add-user-modal add-curs d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <div class="title" v-if="!edit">Создать услугу</div>
      <div class="title" v-if="edit">Изменить услугу</div>

      <form class="form" @submit.prevent="submitForm(), toggleModal('.add-curs')">
        <label for="name">Название услуги</label>
        <input type="text" placeholder="Введите название услуги" id="name" required v-model="formData.name" />

        <div class="form position-relative">
          <label for="description">Описание*</label>
          <textarea type="text" v-model="formData.description" placeholder="Введите текст" class="description"
            required></textarea>
        </div>

        <div class="form position-relative">
          <label>Фотографии</label>
          <div class="img-card row p-3 justify-content-between">
            <!-- Существующие изображения при редактировании -->
            <div v-for="(image, index) in formData.img" :key="'old-' + index"
              class="card-add-img m-2 position-relative">
              <img :src="'https://api.mubingym.com/' + image" class="card-img-top" alt="Product Image" />
              <button type="button" class="btn-close position-absolute top-0 end-0"
                @click="removeImage(index, true)"></button>
            </div>

            <!-- Новые выбранные изображения -->
            <div v-for="(image, index) in images" :key="'new-' + index" class="card-add-img m-2 position-relative">
              <img :src="image" class="card-img-top" alt="Product Image" />
              <button type="button" class="btn-close position-absolute top-0 end-0"
                @click="removeImage(index, false)"></button>
            </div>

            <!-- Кнопка добавления нового изображения -->
            <div v-show="images.length + formData.img.length === 0"
              class="card-button align-content-center text-center m-2" @click="selectImage">
              <button type="button" class="add-button">+</button>
            </div>
          </div>


          <input type="file" ref="fileInput" @change="handleFileChange" style="display: none"
            :required="!edit && images.length === 0" />
        </div>

        <div class="d-flex">
          <div class="me-3">
            <label for="price_visit">Цена</label>
            <input type="text" placeholder="Цена за посещение" id="price_visit" v-model="formData.price" required />
          </div>
          <div>
            <label for="discount">Скидка</label>
            <input type="text" placeholder="Скидка" id="discount" v-model="formData.discount" required />
          </div>
        </div>


        <div class="d-flex">
          <div class="me-3">
            <label for="visit_count">Количество посещений</label>
            <input type="text" placeholder="Количество посещений" id="visit_count" v-model="formData.visit_count"
              required />
          </div>
          <div>
            <label for="duration">Продолжительность (дней)</label>
            <input type="text" placeholder="Пример: 30" id="duration" v-model="formData.duration" required />
          </div>
        </div>



        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="toggleModal('.add-curs')" class="dont" type="button">
            Отмена
          </button>
          <button class="submit" type="submit" v-if="!edit">Добавить</button>
          <button class="submit" type="submit" v-if="edit">Изменить</button>
        </div>
      </form>
    </div>
  </div>


  <div @click="toggleModal('.pay-curs')"
    class="add-user-modal pay-curs d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <div class="title">Оплата курса</div>
      <form class="form" @submit.prevent="coursesFn(), toggleModal('.pay-curs')">
        <!--        <label for="title">тип курса</label>-->
        <!--        <input-->
        <!--          type="text"-->
        <!--          placeholder="Введите название курса"-->
        <!--          id="title"-->
        <!--          v-model="addCurs.type_courses"-->
        <!--         />-->
        <label for="title">название курса</label>
        <input type="text" placeholder="Введите название курса" id="title" v-model="addCurs.name" />
        <div class="form position-relative">
          <label for="phone">Описание*</label>
          <textarea type="text" v-model="addCurs.description" placeholder="Введите текст"
            class="description"></textarea>
        </div>
        <div class="position-relative">
          <label for="name">Выберите пользователя</label>
          <input type="text" id="present" v-model="activeTR" @click="presentMenu = !presentMenu" />
          <img @click="presentMenu = !presentMenu" :class="{ 'rotate-90': presentMenu }" class="row-right-icon"
            src="@/assets/images/icons/row-right.png" />
          <div :class="{ 'd-block': presentMenu }" class="menu-type-1 pt-4 ps-3">
            <h1 class="ps-2">Все пользователи</h1>
            <div class="scroll-new">
              <div role="button" v-for="treners in userData" @click="
                (cursData.user_id = treners.id),
                (presentMenu = false),
                (presentMenu = false),
                (activeTR = treners.name + ' ' + treners.surname)
                " class="statistics h-auto m-0 p-2">
                <hr class="m-0 p-1" />
                {{ treners.name + " " + treners.surname }}
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <label for="title">Количество</label>
          <p class="m-0"> Кол-во посещений: <span class="color-yellow fw-bold">{{ cursData.count * addCurs.visit_count
          }}</span> </p>
        </div>
        <input type="text" placeholder="Введите количество" id="title" v-model="cursData.count" />
        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="toggleModal('.pay-curs')" class="dont" type="button">
            Отмена
          </button>
          <button class="submit" type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>

  <div class="container mt-5">
    <div class="row">
      <div class="col-md-4" v-for="curs in cursList">
        <!-- toggleModal('.pay-curs'), -->
        <!-- (addCurs = curs), -->
        <div class="w-100 h-100 courses-card position-relative mb-3 p-0" :class="{ archived: curs.status === 0 }"
          @click="
            (cursData.services_id = curs.id)">
          <!--          <div class="at-top bg-red position-absolute top-0 right me-3 mt-3 px-2 border-radius-25">-{{ curs.discount + "%" }}</div>-->
          <img class="w-100 h-100" :src="'https://api.mubingym.com/' + curs.img" alt="">
          <div class="at-bottom position-absolute bottom-0 ps-4">
            <h5>{{ curs.name }}</h5>
            <p class="m-0">{{ curs.price }} TJS </p>
            <p class="m-0 mb-2 text-white text-capitalize">{{ curs.type_courses }}</p>
          </div>
        </div>
        <div class="menu-btn">
          <button class="bg-transparent border-0 position-absolute menu-icon"><img src="@/assets/images/icons/menu.png"
              alt=""></button>
          <div class="menu">
            <div class="menu-card">
              <ul>
                <li @click="toggleModal('.add-curs'), (edit = true, formData = { ...curs })">
                  Редактировать
                </li>
                <li @click="archive_item = curs.id; archiveCourse();">
                  {{ curs.status != 0 ? "Архивировать" : "Разархивировать" }}
                </li>
                <!-- <li class="text-danger">Удалить</li> -->
              </ul>
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


  <div v-if="isLoading" class="overlay w-100 h-100 position-fixed top-0 start-0 z-3"
    style="background-color: rgba(0, 0, 0, 0.8);">
    <div class="position-fixed top-50 start-50 translate-middle z-3 text-center mt-2">
      <div class="spinner-border text-warning" v-show="!error" role="status">
        <span class="sr-only"></span>
      </div>
      <div class="error-div" v-show="error">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256"
          height="256" viewBox="0 0 256 256" xml:space="preserve">
          <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
            <path
              d="M 28.5 65.5 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 33 -33 c 1.561 -1.562 4.096 -1.562 5.656 0 c 1.563 1.563 1.563 4.095 0 5.657 l -33 33 C 30.547 65.109 29.524 65.5 28.5 65.5 z"
              style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            <path
              d="M 61.5 65.5 c -1.023 0 -2.048 -0.391 -2.828 -1.172 l -33 -33 c -1.562 -1.563 -1.562 -4.095 0 -5.657 c 1.563 -1.562 4.095 -1.562 5.657 0 l 33 33 c 1.563 1.562 1.563 4.095 0 5.656 C 63.548 65.109 62.523 65.5 61.5 65.5 z"
              style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            <path
              d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 8 C 24.598 8 8 24.598 8 45 c 0 20.402 16.598 37 37 37 c 20.402 0 37 -16.598 37 -37 C 82 24.598 65.402 8 45 8 z"
              style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
          </g>
        </svg>
      </div>
      <div class="mt-2 text-light text-center" v-show="!error">{{ loadingText }}</div>
      <div class="mt-2 text-light text-center" v-show="error">Ошибка ! <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import posts from "@/components/axios/posts.js";
import gets from "@/components/axios/get.js";
import form_Data from "@/components/axios/formData.js";
import { Exception } from "sass";
export default {
  data() {
    return {
      archive_item: null,
      isLoading: true,
      loadingText: "",
      error: false,
      editServices: "",
      activeTR: "",
      idTr: "",
      edit: false,
      addCurs: "",
      formData: {
        id: null,
        img: "",
        name: "",
        description: "",
        price: "",
        discount: "",
        visit_count: "",
        duration: "",
        status: 1,
      },
      images: [], // уже есть
      imagesPost: [],

      DataUsers: null,
      userData: null,
      cursList: "",
      cursData: {
        user_id: "",
        services_id: "",
        count: 1,
      },
      modal: "auto",
      error: null,
      loading: true,
      searchActive: "",
      addStatus: false,
      addCard: false,
      modalSelector: "",
      presentMenu: false,
      searchQuery: "",
      activeIndex: null,
      messageSuccess: "",
    };
  },
  computed: {
    filteredClients() {
      if (this.userData) {
        return this.userData.filter((user) => {
          return user.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        });
      }
      return this.userData;
    },
  },
  methods: {
    setFormData() {
      this.formData = {
        id: null,
        img: "",
        name: "",
        description: "",
        price: "",
        discount: "",
        visit_count: "",
        duration: "",
        status: 1,
      };
      this.images = []; // уже есть
      this.imagesPost = [];
    },
    addStatusDelay() {
      setTimeout(() => {
        this.addStatus = false;
      }, 3000);
    },
    toggleCollapse(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
      }
    },
    coursesFn() {
      const token = Cookies.get("token");
      this.cursData.count = (this.cursData.count * this.addCurs.visit_count)
      posts(
        "https://api.mubingym.com/enroll/services",
        {
          ...this.cursData,
        },
        token
      )
        .then((response) => {
          this.Delay("loading", 1);
          console.log(this.cursData);
          this.messageSuccess = response.data.message;
          this.addStatus = true;
          this.addStatusDelay();
        })
        .catch((error) => {
          this.error = error;
          this.Delay("loading", 1);
        });
    },
    archiveCourse() {
      this.isLoading = true;
      this.loadingText = "Архивирование...";

      const token = Cookies.get("token");
      posts(
        `https://api.mubingym.com/services/status/${this.archive_item}`,
        token
      )
        .then((response) => {
          if (response.status == 200) {
            this.isLoading = false;
            this.messageSuccess = "Архивы успешно пересобраны !";
            this.addStatus = true;
            this.addStatusDelay();
            this.getInfo(
              "https://api.mubingym.com/api/services/admin/all",
              "cursList",
              2
            );
          } else {
            this.error = response.message;
          }
        })
        .catch((error) => {
          this.error = error;
        });
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const files = Array.from(event.target.files);

      files.forEach(file => {
        this.imagesPost.push(file); // для отправки

        const reader = new FileReader();
        reader.onload = (e) => {
          // Используем Vue.set или просто push в массив
          this.images = [...this.images, e.target.result];
        };
        reader.readAsDataURL(file);
      });
    },
    removeImage(index) {
      if (this.edit && index < this.formData.img.length) {
        // удаляем существующее изображение
        this.formData.img.splice(index, 1);
      } else {
        // удаляем новое добавленное изображение
        const newIndex = this.edit ? index - this.formData.img.length : index;
        this.images.splice(newIndex, 1);
        this.imagesPost.splice(newIndex, 1);
      }
    },
    getInfoUsers() {
      const token = Cookies.get("token");
      posts(
        "https://api.mubingym.com/users",
        {
          form: "0",
          to: "0",
        },
        token
      )
        .then((response) => {
          this.userData = response.data.users;
          this.Delay("loading", 1);
        })
        .catch((error) => {
          this.error = error;
          this.Delay("loading", 1);
        });
    },
    getInfo(url, dataStore, id) {
      this.loadingText = "Загрузка услуг...";
      const token = Cookies.get("token");
      gets(url, token)
        .then((response) => {
          this.isLoading = false;
          this[dataStore] = [];
          if (id === 1) {
            this[dataStore] = response.data.data;
          } else if (id === 2) {
            this[dataStore] = response.data.data;
            console.log(this[dataStore]);
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
        });
    },
    async submitForm() {
      let FormDataObj = new FormData(); // Используем FormData для файлов
      try {
        this.isLoading = true;

        // Добавляем текстовые поля
        FormDataObj.append("name", this.formData.name);
        FormDataObj.append("description", this.formData.description);
        FormDataObj.append("price", this.formData.price);
        FormDataObj.append("discount", this.formData.discount);
        FormDataObj.append("visit_count", this.formData.visit_count);
        FormDataObj.append("duration", this.formData.duration);

        // Добавляем изображения, если они есть
        if (this.imagesPost && this.imagesPost.length > 0) {
          this.imagesPost.forEach((file, index) => {
            FormDataObj.append(`img`, file); // ключ img[] для массива файлов
          });
        }

        let url = "";
        this.loadingText = this.edit ? "Изменение услуги" : "Создание услуги";

        if (!this.edit) {
          url = "https://api.mubingym.com/services/create";
        } else {
          url = `https://api.mubingym.com/services/update/${this.formData.id}`;
        }

        // POST-запрос с FormData
        const response = await form_Data(url, FormDataObj, true); // true для multipart/form-data

        if (response.status === 200) {
          this.addStatus = true;
          this.error = false;
          // Обновляем данные
          await this.getInfo("https://api.mubingym.com/api/coach/all", "DataUsers", 1);
          await this.getInfo("https://api.mubingym.com/api/services/admin/all", "cursList", 2);
          await this.getInfoUsers();

          this.messageSuccess = this.edit ? "Успешно изменен" : "Успешно добавлен";
          this.Delay("addStatus", 7);
        } else {
          this.error = response.status;
          console.error(`Запрос завершился с ошибкой: ${response.status}`);
        }
      } catch (error) {
        this.error = error;
        console.error("Ошибка при отправке данных:", error);
      } finally {
        this.images = [];
        this.imagesPost = [];
        this.isLoading = false;
      }
    },
    Delay(target, t) {
      setTimeout(() => {
        this[target] = false;
      }, t * 1000);
    },
    clearData(data) {
      for (let key in data) {
        data[key] = "";
      }
    },
    toggleModal(modalSelector) {
      this.modal = this.modal === "auto" ? "hidden" : "auto";
      this.modalSelector = modalSelector;
    },
    updateToggleModal() {
      if (this.modal === "auto") {
        document.querySelector(this.modalSelector).classList.add("d-none");
        document.body.style.overflow = this.modal;
      } else {
        document.body.style.overflow = this.modal;
        document.querySelector(this.modalSelector).classList.remove("d-none");
      }
    },
    changeCourse() {
      console.log("changeCourse");
      posts("https://api.mubingym.com/api/count/services/admin", {
        user_id: this.activeCourse.userId,
        services_id: this.activeCourse.courseId,
      })
        .then((response) => {
          console.log("changeCourse response", response);
          this.messageSuccess = response.data.message;
          this.addStatus = true;
          this.addStatusDelay();
        })
        .catch((error) => {
          this.error = error;
          this.Delay("loading", 1);
        });
    },
    selectedCourse(userId, courseId, name) {
      this.activeCourse = { userId, courseId, name };

      // Обновляем cursData для отправки
      this.cursData.user_id = userId;
      this.cursData.services_id = courseId;
    },
  },
  mounted() {
    this.getInfo(
      "https://api.mubingym.com/api/coach/all",
      "DataUsers",
      1
    );
    this.getInfo(
      "https://api.mubingym.com/api/services/admin/all",
      "cursList",
      2
    );
    this.getInfoUsers();
  },
  watch: {
    modal() {
      this.updateToggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.archived {
  opacity: 0.3;
}


.menu-btn {
  position: relative;
  /* Ensure the .menu is positioned relative to the .menu-btn */

  .menu-icon {
    z-index: 9;
    right: 20px;
    padding: 0 0 0 20px;
    bottom: 30px;

    img {
      transform: scale(1.2);
      /* Updated for better support */
    }
  }

  .menu-card {
    display: none;
    position: absolute;
    right: 0px;
    z-index: 9;
    top: -30px;
    background: #000;
    border-radius: 14px;
    padding: 20px 30px;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        cursor: pointer;
        margin: 0;

        &:first-of-type {
          margin-bottom: 10px;
        }
      }
    }
  }

  &:hover .menu-card {
    display: block;
  }
}

.fs-7 {
  font-size: 14px;
}

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

.custom-checkbox {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
}

.custom-checkbox.disabled {
  opacity: 0.7;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-checkmark {
  position: absolute;
  top: 50%;
  right: 0;
  height: 36px;
  width: 36px;
  transform: translateY(-50%);
  background: transparent;
  border: 2px solid #fff;
  border-radius: 100%;
}

.custom-checkbox:hover input~.custom-checkmark {
  opacity: 0.7;
}

.custom-checkbox input:checked~.custom-checkmark {
  border-color: #d0fd3e;
  background: url("@/assets/images/icons/checkbox-white-checked.png") center center no-repeat;
}

.custom-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.clients-list {
  .user-list {
    label {
      width: 100%;
      color: #ffffff;
      padding: 15px 45px 15px 0;
      margin: 0;
    }

    &-item {
      border-bottom: 1px solid rgba(220, 220, 220, 0.1);
      display: flex;
      align-self: center;
      padding-bottom: 15px;
      font-size: 26px;
      position: relative;

      &-img {
        width: 48px;
        height: 48px;
        overflow: hidden;
        margin-right: 15px;
        border-radius: 100%;
      }

      &:after {
        background: url("@/assets/images/icons/arrow-left.png") center center no-repeat;
        background-size: cover;
        display: block;
        content: "";
        width: 10px;
        height: 17px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%) rotate(180deg) !important;
      }

      img {
        width: auto;
        height: 100%;
      }

      &.active {
        &:after {
          transform: translateY(-50%) rotate(270deg) !important;
        }
      }
    }

    &-inner {
      li {
        border-bottom: 1px solid rgba(220, 220, 220, 0.1);
      }
    }
  }

  &-holder {
    max-height: 350px;
    overflow-y: auto;
    scrollbar-width: thin;
    /* Устанавливает ширину скроллбара */
    scrollbar-color: #282829 #090909;
  }
}

.clients-list-holder::-webkit-scrollbar {
  width: 10px;
}

.clients-list-holder::-webkit-scrollbar-track {
  background: #282829;
}

.clients-list-holder::-webkit-scrollbar-thumb {
  background: #090909;
  border-radius: 6px;
}
</style>
