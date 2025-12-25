<template>
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
                <span class="color-yellow"></span>
                добавлен
              </div>
              <div class="result-true-body mt-2">
                Новый пользователь успешно добавлен в список клиентов
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <div class="col mb-4">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div @click="addStatus = !addStatus" class="page-title">Курсы</div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <!-- <button
              @click="toggleModal('.clients-list')"
              class="add-user-btn mx-3"
            >
              Список клиентов
            </button> -->
            <!-- <button @click="toggleModal('.add-curs')" class="add-user-btn">
              Добавить
            </button> -->


            <!-- @click="toggleModal('.add-curs')" -->
            <!-- <button class="add-user-btn" @click="toggleModal('.add-curs')">Добавить</button> -->
            <button class="add-user-btn ms-3" type="button"><router-link to="/new-course"
                class="text-dark w-100 h-100 align-content-center">Добавить</router-link> </button>


            <transition name="bounce" v-if="addStatus" class="added-user-message">
              <div class="result-true">
                <div class="result-true-card d-flex align-items-center relative">
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

  <div @click="toggleModal('.add-curs')"
    class="add-user-modal add-curs d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <div class="title">СОЗДАТЬ КУРС</div>
      <form class="form" @submit.prevent="submitForm(), toggleModal('.add-curs')">
        <label for="name" class="m-0 p-0 mt-4">ТИП КУРССА</label>
        <div class="menu-type-2 d-flex justify-content-between">
          <div class="form-recipients">
            <input type="radio" id="ind" name="type" value="1" v-model="formData.type_courses" />
            <label for="ind" class="text-white">Индивидуальные</label>
          </div>
          <div class="form-recipients">
            <input type="radio" id="type" name="type" value="2" v-model="formData.type_courses" />
            <label for="group" class="text-white">Групповые</label>
          </div>
        </div>

        <label for="title">Название курса</label>
        <input type="text" placeholder="Введите название курса" id="title" v-model="formData.title" />
        <div class="form position-relative">
          <label for="phone">Описание*</label>
          <textarea type="text" v-model="formData.description" placeholder="Введите текст"
            class="description"></textarea>
        </div>
        <div class="form position-relative">
          <label for="phone">Добавить фотографию</label>
          <div class="img-card row p-3 justify-content-between">
            <div v-for="(image, index) in images" :key="index" class="card-add-img m-2">
              <img :src="image" class="card-img-top" alt="Product Image" />
            </div>
            <div v-show="images.length < 1" class="card-button align-content-center text-center m-2"
              @click="selectImage">
              <button type="button" class="add-button">+</button>
            </div>
          </div>
          <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
        </div>
        <label for="price">Цена курса</label>
        <input type="text" placeholder="Цена за посещение" id="price" v-model="formData.price" />
        <label for="discount">Скидка в %</label>
        <input type="text" placeholder="Скидка" id="discount" v-model="formData.discount" />
        <label for="discount_price" class="text-end">Итого:
          <span v-if="formData.price !== ''">{{
            (formData.discount_price =
              formData.price -
              Math.round((formData.price / 100) * formData.discount))
          }}</span></label><!--        <div class="form position-relative">-->
        <div class="position-relative">
          <label for="name">Выбор тренера</label>
          <input type="text" id="present" v-model="activeTR" />
          <img @click="presentMenu = !presentMenu" :class="{ 'rotate-90': presentMenu }" class="row-right-icon"
            src="@/assets/images/icons/row-right.png" />
          <div :class="{ 'd-block': presentMenu }" class="menu-type-1 pt-4 ps-3">
            <h1 class="ps-2">Все тренеры</h1>
            <div style="max-height: 300px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #282829 #090909;">
              <div role="button" v-for="treners in DataUsers" @click="
                (idTr = treners.id),
                (presentMenu = false),
                (activeTR = treners.name + ' ' + treners.surname)
                " class="statistics h-auto m-0 p-2">
                <hr class="m-0 p-1" />
                {{ treners.name + " " + treners.surname }}
              </div>
            </div>
          </div>
        </div>
        <label for="benefits_course">преимущества курса</label>
        <input type="text" placeholder="преимущества курса" id="benefits_course" v-model="formData.benefits_course" />
        <label for="create_date">начало курса*</label>
        <input type="date" placeholder="1994-11-23" id="create_date" v-model="formData.create_date" />
        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="toggleModal('.add-curs')" class="dont" type="button">
            Отмена
          </button>
          <button class="submit" type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>

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
              <div class="user-list-item" :class="{ active: activeIndex === index }"
                @click.self="toggleCollapse(index)">
                <div class="user-list-item-img">
<<<<<<< HEAD
                  <img v-if="trener.img" :src="`https://api.mubingym.com/${trener.img}`" alt="" />
=======
                  <img v-if="trener.img" :src="`https://api.mubingym.com//${trener.img}`" alt="" />
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
                  <img v-else src="@/assets/images/user-photo.png" alt="" />
                </div>
                {{ trener.name + " " + trener.surname }}
              </div>
              <div v-if="activeIndex === index && trener.courses.length" class="collapse-content">
                <ul class="user-list-inner">
                  <li v-for="(course, index) in trener.courses" :key="index"
                    :class="{ 'close-course': course.count <= 0 }">
                    <label class="custom-checkbox" :class="{ disabled: course.count <= 0 }">
                      <span>{{ course.course_name }}</span>
                      <input type="radio" :name="`course-user-${trener.id}`" :disabled="course.count <= 0" @change="
                        selectedCourse(
                          trener.id,
                          course.course_id,
                          course.count,
                          trener.name
                        )
                        " />
                      <span class="custom-checkmark"></span>
                    </label>
                    <span v-if="course.count <= 0" class="error">Выбор курса невозможен, т.к. кол-во истрачено.</span>
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

  <!-- <div @click="toggleModal('.pay-curs')"
    class="add-user-modal pay-curs d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <div class="title">Оплата курса</div>
      <form class="form" @submit.prevent="coursesFn(), toggleModal('.pay-curs')">
        <label for="title">тип курса</label>
        <input type="text" placeholder="Введите название курса" id="title" v-model="addCurs.type_courses" />
        <label for="title">название курса</label>
        <input type="text" placeholder="Введите название курса" id="title" v-model="addCurs.title" />
        <div class="form position-relative">
          <label for="phone">Описание*</label>
          <textarea type="text" v-model="addCurs.description" placeholder="Введите текст"
            class="description"></textarea>
        </div>
        <div class="position-relative">
          <label for="name">Клиенты</label>
          <pre>{{ selectedClient }}</pre>
          <VueSelect class="custom-select scroll-new" v-model="cursData.user_id" :options="clients" :isClearable="false"
            placeholder="выберите клиента">
            <template #menu-header>
              <div class="menu-header">
                <h3>Все клиенты</h3>
              </div>
            </template>
          </VueSelect>
        </div>
        <label for="title">количество</label>
        <input type="text" placeholder="Введите количество" id="title" v-model="cursData.count" />
        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="toggleModal('.pay-curs')" class="dont" type="button">
            Отмена
          </button>
          <button class="submit" type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div> -->
  
  <div class="container pt-3">
    <div class="row">
      <!-- class="uslug-card uslug-card-responsive p-0 position-relative" -->
        <!-- toggleModal('.pay-curs'), -->
        <!-- (addCurs = curs), -->
      <div class="col-md-4" v-for="curs in cursList" @click="
        (cursData.courses_id = curs.id)
        " >
        <div class="w-100 h-100 courses-card position-relative mb-3 p-0" :class="{ archived: curs.status == 0 }">

          <!-- Скидка -->
          <div class="at-top bg-red position-absolute top-0 right me-3 mt-3 px-2 border-radius-25">
            -{{ curs.discount + "%" }}
          </div>

          <!-- Фото -->
<<<<<<< HEAD
          <img class="w-100 h-100" :src="'https://api.mubingym.com/' + curs.img" alt="">
=======
          <img class="w-100 h-100" :src="'https://api.mubingym.com//' + curs.img" alt="">
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b

          <!-- Текст -->
          <div class="at-bottom position-absolute bottom-0 ps-4">
            <h5>{{ curs.title }}</h5>

            <p class="m-0">
              {{ curs.discount_price }} TJS
              <b class="text-white mx-1" v-if="curs.discount!=0">|</b>
              <s class="text-white" v-if="curs.discount!=0">{{ curs.price }} TJS</s>
            </p>

            <p class="m-0 mb-2 text-white text-capitalize">{{ curs.type_courses }}</p>
          </div>
        </div>

        <!-- Кнопка меню -->
        <div class="menu-btn">
          <button class="bg-transparent border-0 position-absolute menu-icon">
            <img src="@/assets/images/icons/menu.png" alt="">
          </button>

          <!-- Меню -->
          <div class="menu">
            <div class="menu-card">
              <ul>
                <li>
                  <router-link :to="{ name: 'edit-course', params: { id: curs.id } }">
                    Редактировать
                  </router-link>
                </li>
                 <li @click="archiveCourse(curs.id); ">
                  {{ curs.status != 0 ? "Архивировать" : "Разархивировать" }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <!-- <div
            @click="
              toggleModal('.pay-curs'),
                (addCurs = curs),
                (cursData.courses_id = curs.id)
            "
            v-for="curs in cursList"
            class="uslug-card uslug-card-responsive position-relative"
          >
            <div class="uslug-card-holder">
              <div
                class="position-absolute bg-red top-0 right border-radius-25 px-3 me-3 mt-2"
              >
                -{{ curs.discount + "%" }}
              </div>
              <img
<<<<<<< HEAD
                :src="'https://api.mubingym.com/' + curs.img"
=======
                :src="'https://api.mubingym.com//' + curs.img"
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
              />
              <div class="product-info">
                <div class="product-title mb-2 border-color-yellow">
                  {{ curs.title }}
                </div>
                <div class="product-price color-yellow d-flex">
                  {{ curs.discount_price }} TJS
                  <span class="product-old-price text-white"
                    ><s>{{ curs.price }}</s>
                  </span>
                </div>
                <div class="h6">{{ curs.type_courses }}</div>
              </div>
            </div>
          </div> -->
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

export default {
  data() {
    return {
      // Основные данные
      cursList: [],
      DataUsers: [],        // Тренеры
      userData: [],         // Все пользователи (для поиска клиентов)
      clients: [],          // Для кастомного селекта

      // Формы
      formData: {
        title: "",
        type_courses: "1",
        description: "",
        coach_id: "",
        benefits_course: "[1]",
        img: "",
        status: "1",
        trainning_days: "[]",
        create_date: "",
        price: "",
        discount: "",
        discount_price: "",
        direction_id: "1",
        user_count: "1",
      },

      cursData: {
        user_id: null,
        courses_id: "",
        count: 1,
      },

      addCurs: {}, // Текущий курс при открытии модалки оплаты

      // UI состояние
      isLoading: true,
      loadingText: "Загрузка курсов...",
      error: null,

      addStatus: false,
      messageSuccess: "",

      images: [],
      imagesPost: null,

      // Модальные окна
      payModalVisible: false,
      addCourseModalVisible: false,
      clientsListModalVisible: false,

      // Выбор тренера
      presentMenu: false,
      activeTR: "",
      idTr: "",

      // Выбор клиента в модалке оплаты
      clientDropdownOpen: false,
      clientSearchQuery: "",
      selectedClientName: "",

      // Меню карточки курса
      activeMenuId: null,

      // Для списка клиентов (старый функционал)
      activeIndex: null,
      searchQuery: "",
      activeCourse: null,
    };
  },

  computed: {
    filteredClients() {
      if (!this.userData) return [];
      return this.userData.filter(user =>
        `${user.name} ${user.surname}`
          .toLowerCase()
          .includes(this.clientSearchQuery.toLowerCase())
      );
    },
  },

  methods: {
    // Показ уведомления об успехе
    showSuccess(message) {
      this.messageSuccess = message;
      this.addStatus = true;
      setTimeout(() => (this.addStatus = false), 3500);
    },

    // Загрузка всех данных при монтировании
    async loadAllData() {
      this.isLoading = true;
      const token = Cookies.get("token");

      try {
        const [coursesRes, coachesRes, usersRes] = await Promise.all([
<<<<<<< HEAD
          gets("https://api.mubingym.com/api/courses/all/admin", token),
          gets("https://api.mubingym.com/api/coach/all", token),
          posts("https://api.mubingym.com/users", { form: "0", to: "0" }, token),
=======
          gets("https://api.mubingym.com//api/courses/all/admin", token),
          gets("https://api.mubingym.com//api/coach/all", token),
          posts("https://api.mubingym.com//users", { form: "0", to: "0" }, token),
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
        ]);

        this.cursList = coursesRes.data;
        this.DataUsers = coachesRes.data.data || coachesRes.data;
        this.userData = usersRes.data.users;
      } catch (err) {
        console.error(err);
        this.error = "Ошибка загрузки данных";
      } finally {
        this.isLoading = false;
      }
    },

    // Открытие модалки записи на курс
    openPayModal(course) {
      this.addCurs = course;
      this.cursData.courses_id = course.id;
      this.cursData.user_id = null;
      this.cursData.count = 1;
      this.selectedClientName = "";
      this.clientSearchQuery = "";
      this.payModalVisible = true;
    },

    // Выбор клиента в кастомном дропдауне
    selectClient(client) {
      this.cursData.user_id = client.id;
      this.selectedClientName = `${client.name} ${client.surname}`;
      this.clientDropdownOpen = false;
    },

    // Запись клиента на курс
    async enrollCourse() {
      if (!this.cursData.user_id) {
        alert("Выберите клиента");
        return;
      }

      this.isLoading = true;
      this.loadingText = "Запись на курс...";

      try {
        const token = Cookies.get("token");
<<<<<<< HEAD
        const res = await posts("https://api.mubingym.com/enroll/courses", this.cursData, token);
=======
        const res = await posts("https://api.mubingym.com//enroll/courses", this.cursData, token);
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
        this.showSuccess(res.data.message || "Клиент успешно записан!");
        this.payModalVisible = false;
        await this.loadAllData();
      } catch (err) {
        alert(err.response?.data?.message || "Ошибка записи");
      } finally {
        this.isLoading = false;
      }
    },

    // Архивирование курса
    async archiveCourse(id) {
      this.isLoading = true;
      this.loadingText = "Изменение статуса...";

      try {
        const token = Cookies.get("token");
<<<<<<< HEAD
        await posts(`https://api.mubingym.com/courses/status/${id}`, {}, token);
=======
        await posts(`https://api.mubingym.com//courses/status/${id}`, {}, token);
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
        this.showSuccess("Архивы успешно пересобраны");
        await this.loadAllData();
      } catch (err) {
        alert("Ошибка");
      } finally {
        this.isLoading = false;
        this.activeMenuId = null;
      }
    },

    // Меню карточки
    toggleCourseMenu(id, event) {
      event.stopPropagation();
      this.activeMenuId = this.activeMenuId === id ? null : id;
    },

    // Загрузка изображения
    selectImage() {
      this.$refs.fileInput.click();
    },
    handleFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      this.imagesPost = file;
      const reader = new FileReader();
      reader.onload = (ev) => this.images = [ev.target.result];
      reader.readAsDataURL(file);
    },

    // Создание курса (если оставляете модалку)
    async submitForm() {
      if (!this.formData.title || !this.formData.price || !this.idTr) {
        alert("Заполните обязательные поля");
        return;
      }

      this.formData.coach_id = this.idTr;
      const fd = new FormData();
      for (let key in this.formData) {
        fd.append(key, this.formData[key] || "");
      }
      if (this.imagesPost) fd.append("img", this.imagesPost);

      this.isLoading = true;
      this.loadingText = "Создание курса...";

      try {
<<<<<<< HEAD
        await form_Data("https://api.mubingym.com/api/courses/create", fd);
=======
        await form_Data("https://api.mubingym.com//api/courses/create", fd);
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
        this.showSuccess("Курс успешно создан!");
        this.addCourseModalVisible = false;
        this.resetForm();
        await this.loadAllData();
      } catch (err) {
        alert("Ошибка создания курса");
      } finally {
        this.isLoading = false;
      }
    },

    resetForm() {
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = key === "type_courses" ? "1" : "";
      });
      this.images = [];
      this.imagesPost = null;
      this.activeTR = "";
      this.idTr = "";
    },

    // Закрытие всех дропдаунов и меню при клике вне
    handleClickOutside(e) {
      if (!e.target.closest(".menu-btn")) this.activeMenuId = null;
      if (!e.target.closest(".client-select-area")) this.clientDropdownOpen = false;
      if (!e.target.closest(".trainer-select")) this.presentMenu = false;
    },
  },

  mounted() {
    this.loadAllData();
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
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

:deep(.custom-select .control) {
  border-radius: 10px;
  min-height: 50px;
  padding-left: 20px;
  padding-right: 10px;
  width: 100%;
  border: 0;
  background: #363636;
  color: #ffffff;
}

:deep(.custom-select .single-value) {
  color: #ffffff;
}

:deep(.custom-select .menu) {
  position: static;
  padding-top: 20px;
}

:deep(.custom-select .menu-header) {
  padding: var(--vs-option-padding);
}

:deep(.custom-select .menu-header h3) {
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  color: #d0fd3e;
  margin-bottom: 0;
}

:deep(.custom-select .dropdown-icon) {
  background: url("@/assets/images/icons/button-img-right.png") center center no-repeat;
}

:deep(.custom-select .dropdown-icon > *) {
  display: none;
}

:deep(.custom-select.open .dropdown-icon) {
  transform: rotate(90deg) !important;
}

:deep(.custom-select .value-container) {
  padding-top: 0;
  padding-bottom: 0;
}

:deep(.custom-select .menu) {
  background: #343434;
  border: transparent;
  border-radius: 22px;
}

:deep(.custom-select .menu-option) {
  background: #343434;
  border-bottom: 1px solid rgba(220, 220, 220, 0.1);
  color: #ffffff;
}

:deep(.custom-select .menu-option.focused),
:deep(.custom-select .menu-option:hover) {
  background-color: transparent;
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
  .custom-checkmark {
    border-color: #505050;
  }
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
      list-style: none;

      li {
        border-top: 1px solid rgba(220, 220, 220, 0.1);
        padding: 3px 0;
        list-style: none;

        &:first-child {
          border-top: none;
        }

        &.close-course {
          .custom-checkbox {
            border-bottom: 1px solid rgba(220, 220, 220, 0.1);
            margin-bottom: 15px;
          }

          &+li {
            border-top: transparent;
          }
        }
      }

      .error {
        font-size: 20px;
        line-height: 24px;
        color: #ff2424;
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
