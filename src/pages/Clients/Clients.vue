<template>
  <div class="container">
    <div class="row relative">
      <div
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
      </div>

      <div class="col">
        <div
          class="d-flex justify-content-between title-block align-items-center"
        >
          <div class="page-title">Клиенты</div>
          <div
            class="user-add-btn d-flex justify-content-center align-items-center"
          >
            <button @click="addCard = true" class="add-user-btn">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    @click="addCard = !addCard"
    v-if="addCard"
    class="add-user-modal d-flex justify-content-center align-items-center"
  >
    <div @click.stop class="content">
      <div class="title">ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ</div>
      <form class="form" @submit.prevent="submitForm(), (addCard = false)">
        <div class="d-flex">
          <div style="padding-right: 5px">
            <label for="name">Имя*</label>
            <input
              type="text"
              placeholder="Введите имя"
              id="name"
              v-model="formData.name"
            />
          </div>

          <div style="padding-left: 5px">
            <label for="surname">Фамилия*</label>
            <input
              type="text"
              placeholder="Введите фамилию"
              id="surname"
              v-model="formData.surname"
            />
          </div>
        </div>

        <label for="username">Номер телефона*</label>
        <input
          type="text"
          placeholder="Введите номер телефона"
          id="username"
          v-model="formData.username"
        />

        <label for="birthday">Дата рождения*</label>
        <input
          type="date"
          placeholder="1994-11-23"
          id="birthday"
          v-model="formData.birthday"
        />

        <div class="menu-type-2 d-flex justify-content-between pt-3 mt-3">
          <div class="form-recipients">
            <input
              type="radio"
              id="man"
              name="gender"
              value="1"
              v-model="formData.gender"
            />
            <label for="man">Мужчина</label>
          </div>
          <div class="form-recipients">
            <input
              type="radio"
              id="woman"
              name="gender"
              value="2"
              v-model="formData.gender"
            />
            <label for="woman">Женщина</label>
          </div>
        </div>

        <div class="info d-flex justify-content-between form">
          <div class="age mr-30">
            <label for="age">Возраст</label>
            <input type="text" id="age" v-model="formData.age" />
          </div>
          <div class="age mr-30">
            <label for="height">Рост</label>
            <input type="text" id="height" v-model="formData.height" />
          </div>
          <div class="age">
            <label for="mass">Вес</label>
            <input type="text" id="mass" v-model="formData.weight" />
          </div>
        </div>

        <label for="password">Пароль*</label>
        <input
          type="text"
          placeholder="пароль"
          id="password"
          v-model="formData.password"
        />

        <div class="menu-type-2 d-flex justify-content-between mt-3">
          <div class="form-recipients">
            <input
              type="radio"
              id="ios"
              name="mobile_id"
              value="1"
              v-model="formData.mobile_id"
            />
            <label for="ios">IOS</label
            ><img
              class="ps-3 img-width-55"
              src="@/assets/images/icons/Ios_accueil.webp"
            />
          </div>
          <div class="form-recipients">
            <input
              type="radio"
              id="android"
              name="mobile_id"
              value="2"
              v-model="formData.mobile_id"
            />
            <label for="android">android</label
            ><img
              class="ps-3 img-width-55"
              src="@/assets/images/icons/Android_logo_2019.png"
            />
          </div>
        </div>

        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="addCard = false" class="dont" type="button">
            Отмена
          </button>
          <button class="submit" type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-4">
        <div class="bg-gray card-block">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Новые пользователи</div>
              <div class="card-quantity">123</div>
              <div class="card-statistics d-flex align-items-center">
                <div
                  class="d-flex percentage align-items-center justify-content-center"
                >
                  <div>
                    <img
                      class="arrow-down"
                      height="12"
                      src="@/assets/images/icons/arrow-up.png"
                    />
                    <img height="12" src="@/assets/images/icons/arrow-up.png" />
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
        <div class="bg-gray card-block">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="card-title">Абонемент</div>
              <div class="card-quantity">340</div>
              <div class="card-statistics d-flex align-items-center">
                <div
                  class="d-flex percentage statistics-up align-items-center justify-content-center"
                >
                  <div>
                    <img
                      class="arrow-down d-none"
                      height="12"
                      src="@/assets/images/icons/arrow-up.png"
                    />
                    <img height="12" src="@/assets/images/icons/arrow-up.png" />
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
          <div class="bg-gray card-block">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">Курсы индивидуальные</div>
                <div class="card-quantity">101</div>
                <div class="card-statistics d-flex align-items-center">
                  <div
                    class="d-flex percentage align-items-center justify-content-center"
                  >
                    <div>
                      <img
                        class="arrow-down"
                        height="12"
                        src="@/assets/images/icons/arrow-up.png"
                      />
                      <img
                        height="12"
                        src="@/assets/images/icons/arrow-up.png"
                      />
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
          <div class="bg-gray card-block">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">Курсы групповые</div>
                <div class="card-quantity">0</div>
                <div class="card-statistics d-flex align-items-center">
                  <div
                    class="d-flex percentage align-items-center justify-content-center"
                  >
                    <div>
                      <img
                        class="arrow-down"
                        height="12"
                        src="@/assets/images/icons/arrow-up.png"
                      />
                      <img
                        height="12"
                        src="@/assets/images/icons/arrow-up.png"
                      />
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
          <div class="bg-gray card-block">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">Услуги</div>
                <div class="card-quantity">0</div>
                <div class="card-statistics d-flex align-items-center">
                  <div
                    class="d-flex percentage align-items-center justify-content-center"
                  >
                    <div>
                      <img
                        class="arrow-down"
                        height="12"
                        src="@/assets/images/icons/arrow-up.png"
                      />
                      <img
                        height="12"
                        src="@/assets/images/icons/arrow-up.png"
                      />
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
        <div
          :class="{ 'search-input': searchActive.length > 0 }"
          class="d-flex justify-content-between align-items-center search-block"
        >
          <img src="@/assets/images/icons/search.png" alt="search" />
          <input
            v-model="searchActive"
            type="text"
            id="searchInput"
            placeholder="Поиск по всем параметрам"
          />
          <router-link to="user-locked">Заблокированные</router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div
          v-if="searchActive.length > 0"
          class="users-block bg-gray search-result-block"
        >
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
                <td>
                  <router-link to="userpage">Азиза Султанова</router-link>
                </td>
                <td>92 000 00 00</td>
                <td>Bronze</td>
                <td class="d-flex justify-content-center">
                  <div class="abonent">1</div>
                </td>
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
                <td class="d-flex justify-content-center">
                  <div class="abonent">1</div>
                </td>
                <td>Кардио</td>
                <td class="d-flex justify-content-center">
                  <div class="uslugi green">1</div>
                </td>
              </tr>
              <tr>
                <td>Азиза Султанова</td>
                <td>92 000 00 00</td>
                <td>Bronze</td>
                <td class="d-flex justify-content-center">
                  <div class="abonent">1</div>
                </td>
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
                <td class="d-flex justify-content-center">
                  <div class="abonent">1</div>
                </td>
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
            <tbody v-show="!loading" v-for="users in DataUsers" :key="users.id">
              <tr>
                <td>
                  <router-link
                    :to="{ name: 'UserPage', params: { id: users.id } }"
                    >{{ users.name + " " + users.surname }}</router-link
                  >
                </td>
                <td>{{ users.username }}</td>
                <td>{{ users.status }}</td>
                <td class="d-flex justify-content-center">
                  <div class="abonent">1</div>
                </td>
                <td>Кардио</td>
                <td class="d-flex justify-content-center">
                  <div class="uslugi blue">1</div>
                  <div class="uslugi red">1</div>
                  <div class="uslugi green">1</div>
                </td>
              </tr>
            </tbody>
            <tbody v-if="loading">
              <tr>
                <td class="color-yellow w-100 d-flex justify-content-center">
                  Загрузка...
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
            <div class="left">
              Общее количество пользователей:
              <span class="users-quantity">2504</span>
            </div>
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
import Cookies from "js-cookie";
import posts from "@/components/axios/posts.js";
import get from "@/components/axios/get.js";
export default {
  components: { posts, get },
  data() {
    return {
      formData: {
        name: "",
        surname: "",
        username: "",
        status: "active",
        age: "",
        weight: "",
        height: "",
        gender: "",
        birthday: "",
        mobile_id: "",
        password: "",
      },
      DataUsers: null,
      error: null,
      loading: true,
      searchActive: "",
      addStatus: false,
      addCard: false,
    };
  },
  methods: {
    getInfo() {
      const token = Cookies.get("token");
      posts(
        "http://fitness.abdurazzoq.beget.tech/public/users",
        { form: "0", to: "21" },
        token
      )
        .then((response) => {
          this.DataUsers = response.data.users;
          this.Delay("loading", 1);
          console.log(this.DataUsers);
        })
        .catch((error) => {
          this.error = error;
          this.Delay("loading", 1);
        });
    },

    submitForm() {
      this.formData.status = "active";
      posts("http://fitness.abdurazzoq.beget.tech/public/user_register", {
        ...this.formData,
      })
        .then((response) => {
          console.log(this.formData);
          if (response.status === 200) {
            this.addStatus = true;
            this.getInfo();
            this.Delay("addStatus", 5);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Delay(target, t) {
      setTimeout(() => {
        this[target] = false;
        this.clearData(this.formData);
      }, t * 1000);
    },
    clearData(data) {
      for (let key in data) {
        data[key] = "";
      }
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
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped></style>
