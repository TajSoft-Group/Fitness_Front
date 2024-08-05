<template>
  <div
    @click="toggleModal('.clients-list')"
    class="base-modal clients-list d-none d-flex justify-content-center align-items-center"
  >
    <div @click.stop class="holder">
      <div class="base-modal-top">
        <div class="title">Список клиентов</div>
        <button
          class="button-close"
          @click="toggleModal('.clients-list')"
        ></button>
      </div>
      <div class="content">
        <form
          class="form"
          @submit.prevent="changeCourse(), toggleModal('.clients-list')"
        >
          <div class="search-input pb-4">
            <input v-model="searchQuery" type="text" placeholder="Поиск" />
          </div>

          <div class="clients-list-holder">
            <div
              role="button"
              v-for="(trener, index) in filteredClients"
              :key="trener.id"
              class="user-list h-auto m-0 p-2"
            >
              <div
                class="user-list-item"
                :class="{ active: activeIndex === index }"
                @click.self="toggleCollapse(index)"
              >
                <div class="user-list-item-img">
                  <img
                    v-if="trener.img"
                    :src="`http://fitness.abdurazzoq.beget.tech/public/${trener.img}`"
                    alt=""
                  />
                  <img v-else src="@/assets/images/user-photo.png" alt="" />
                </div>
                {{ trener.name + " " + trener.surname }}
              </div>
              <div
                v-if="activeIndex === index && trener.services.length"
                class="collapse-content"
              >
                <ul class="user-list-inner">
                  <li
                    v-for="(course, index) in trener.services"
                    :key="index"
                    class="d-flex"
                  >
                    <label
                      class="custom-checkbox"
                      :class="{ disabled: course.count <= 0 }"
                    >
                      <span>{{ course.service_name }}</span>
                      <input
                        type="radio"
                        :name="`course-user-${trener.id}`"
                        :disabled="course.count <= 0"
                        @change="
                          selectedCourse(trener.id, course.id, trener.name)
                        "
                      />
                      <span class="custom-checkmark"></span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between add-user-buttons">
            <button
              @click="toggleModal('.clients-list')"
              class="dont"
              type="button"
            >
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
        <div
          class="d-flex justify-content-between title-block align-items-center"
        >
          <div @click="addStatus = !addStatus" class="page-title">Услуги</div>
          <div
            class="user-add-btn d-flex justify-content-center align-items-center relative"
          >
            <button
              @click="toggleModal('.clients-list')"
              class="add-user-btn mx-3"
            >
              Список клиентов
            </button>
            <button @click="toggleModal('.add-curs')" class="add-user-btn">
              Добавить
            </button>
            <transition
              name="bounce"
              v-if="addStatus"
              class="added-user-message"
            >
              <div class="result-true">
                <div class="result-true-card d-flex align-items-center">
                  <img
                    class="m-4 img-width-40"
                    src="@/assets/images/icons/check_add.png"
                  />
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

  <div
    @click="toggleModal('.add-curs')"
    class="add-user-modal add-curs d-none d-flex justify-content-center align-items-center"
  >
    <div @click.stop class="content">
      <div class="title">Создать услугу</div>
      <form
        class="form"
        @submit.prevent="submitForm(), toggleModal('.add-curs')"
      >
        <label for="name">Название услуги</label>
        <input
          type="text"
          placeholder="Введите название услуги"
          id="name"
          v-model="formData.name"
        />
        <div class="form position-relative">
          <label for="phone">Описание*</label>
          <textarea
            type="text"
            v-model="formData.description"
            placeholder="Введите текст"
            class="description"
          ></textarea>
        </div>
        <div class="form position-relative">
          <label for="phone">Добавить фотографию</label>
          <div class="img-card row p-3 justify-content-between">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="card-add-img m-2"
            >
              <img :src="image" class="card-img-top" alt="Product Image" />
            </div>
            <div
              v-show="images.length < 1"
              class="card-button align-content-center text-center m-2"
              @click="selectImage"
            >
              <button type="button" class="add-button">+</button>
            </div>
          </div>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            style="display: none"
          />
        </div>
        <label for="price_visit">Цена за посещение</label>
        <input
          type="text"
          placeholder="Цена за посещение"
          id="price_visit"
          v-model="formData.price_visit"
        />
        <label for="status">Статус</label>
        <input
          type="text"
          placeholder="Скидка"
          id="status"
          v-model="formData.status"
        />
        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="toggleModal('.add-curs')" class="dont" type="button">
            Отмена
          </button>
          <button class="submit" type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>

  <div
    @click="toggleModal('.pay-curs')"
    class="add-user-modal pay-curs d-none d-flex justify-content-center align-items-center"
  >
    <div @click.stop class="content">
      <div class="title">оплата курса</div>
      <form
        class="form"
        @submit.prevent="coursesFn(), toggleModal('.pay-curs')"
      >
        <label for="title">тип курса</label>
        <input
          type="text"
          placeholder="Введите название курса"
          id="title"
          v-model="addCurs.type_courses"
        />
        <label for="title">название курса</label>
        <input
          type="text"
          placeholder="Введите название курса"
          id="title"
          v-model="addCurs.title"
        />
        <div class="form position-relative">
          <label for="phone">Описание*</label>
          <textarea
            type="text"
            v-model="addCurs.description"
            placeholder="Введите текст"
            class="description"
          ></textarea>
        </div>
        <div class="position-relative">
          <label for="name">выберите пользователя</label>
          <input type="text" id="present" v-model="activeTR" />
          <img
            @click="presentMenu = !presentMenu"
            :class="{ 'rotate-90': presentMenu }"
            class="row-right-icon"
            src="@/assets/images/icons/row-right.png"
          />
          <div
            :class="{ 'd-block': presentMenu }"
            class="menu-type-1 pt-4 px-4"
          >
            <h1>Все пользователи</h1>
            <div
              role="button"
              v-for="treners in userData"
              @click="
                (cursData.user_id = treners.id),
                  (presentMenu = false),
                  (presentMenu = false),
                  (activeTR = treners.name + ' ' + treners.surname)
              "
              class="statistics h-auto m-0 p-2"
            >
              <hr class="m-0 p-1" />
              {{ treners.name + " " + treners.surname }}
            </div>
          </div>
        </div>
        <label for="title">количество</label>
        <input
          type="text"
          placeholder="Введите количество"
          id="title"
          v-model="cursData.count"
        />
        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="toggleModal('.pay-curs')" class="dont" type="button">
            Отмена
          </button>
          <button class="submit" type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col">
        <div class="row">
          <div
            @click="
              toggleModal('.pay-curs'),
                (addCurs = curs),
                (cursData.services_id = curs.id)
            "
            v-for="curs in cursList"
            class="uslug-card uslug-card-responsive position-relative"
          >
            <!--            <div class="position-absolute bg-red top-0 right border-radius-25 px-3 me-3 mt-2">-{{curs.discount+'%'}}</div>-->
            <img
              :src="'http://fitness.abdurazzoq.beget.tech/public/' + curs.img"
            />
            <div class="product-info">
              <div class="product-title mb-2 border-color-yellow">
                {{ curs.name }}
              </div>
              <div class="product-price color-yellow d-flex">
                {{ curs.price_visit }} TJS
                <span class="product-old-price text-white"
                  ><s>{{ curs.price }}</s>
                </span>
              </div>
              <div class="h6">{{ curs.type_courses }}</div>
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
import Cookies from "js-cookie";
import posts from "@/components/axios/posts.js";
import gets from "@/components/axios/get.js";
import form_Data from "@/components/axios/formData.js";
export default {
  data() {
    return {
      activeTR: "",
      idTr: "",
      images: [],
      imagesPost: [],
      addCurs: "",
      formData: {
        img: "",
        name: "",
        description: "",
        price_visit: "",
        status: "",
      },
      DataUsers: null,
      userData: null,
      cursList: "",
      cursData: {
        user_id: "",
        services_id: "",
        count: "",
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
      posts(
        "http://fitness.abdurazzoq.beget.tech/public/enroll/services",
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
    selectImage() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        this.imagesPost = file;
        reader.onload = (e) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    getInfoUsers() {
      const token = Cookies.get("token");
      posts(
        "http://fitness.abdurazzoq.beget.tech/public/users",
        {
          form: "0",
          to: "21",
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
      const token = Cookies.get("token");
      gets(url, token)
        .then((response) => {
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
      let FormData = this.formData;
      FormData.img = this.imagesPost;
      try {
        const response = await form_Data(
          "http://fitness.abdurazzoq.beget.tech/public/services/create",
          FormData
        );
        if (response.status === 200) {
          this.addStatus = true;
          await this.getInfo(
            "http://fitness.abdurazzoq.beget.tech/public/api/coach/all",
            "DataUsers",
            1
          );
          await this.getInfo(
            "http://fitness.abdurazzoq.beget.tech/public/api/services/all",
            "cursList",
            2
          );
          await this.getInfoUsers();
          this.Delay("addStatus", 7);
        } else {
          console.error(`Запрос завершился с ошибкой: ${response.status}`);
        }
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
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
      posts("http://fitness.abdurazzoq.beget.tech/public/count/services", {
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
      const courseData = {};
      courseData.userId = userId;
      courseData.courseId = courseId;
      courseData.name = name;
      this.activeCourse = courseData;
    },
  },
  mounted() {
    this.getInfo(
      "http://fitness.abdurazzoq.beget.tech/public/api/coach/all",
      "DataUsers",
      1
    );
    this.getInfo(
      "http://fitness.abdurazzoq.beget.tech/public/api/services/all",
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

.custom-checkbox:hover input ~ .custom-checkmark {
  opacity: 0.7;
}

.custom-checkbox input:checked ~ .custom-checkmark {
  border-color: #d0fd3e;
  background: url("@/assets/images/icons/checkbox-white-checked.png") center
    center no-repeat;
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
        background: url("@/assets/images/icons/arrow-left.png") center center
          no-repeat;
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
    scrollbar-width: thin; /* Устанавливает ширину скроллбара */
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
