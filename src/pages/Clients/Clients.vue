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

<div class="container mt-5">
  <div class="row">
    <div class="col-3 mb-3">
      <div class="bg-gray card-block h-100 m-0">
        <div class="d-flex justify-content-between">
          <div class="card-left">
            <div class="h5 mh-40">Новые пользователи</div>
            <div class="fw-bolder h1 mb-0">{{ (statistic.new_users) ? (statistic.new_users) : 0 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3 mb-3" v-for="service in statistic.services">
      <div class="bg-gray card-block h-100 m-0">
        <div class="d-flex justify-content-between">
          <div class="card-left">
            <div class="h5 mh-40">{{ service.service_name }}</div>
            <div class="fw-bolder h1 mb-0">{{ service.count ? service.count : 0 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <div class="container relative">
    <div class="row">
      <div class="col-12">
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
    <!-- User Data Table -->
    <div class="row">
      <div class="w-100 d-flex justify-content-end mt-4">
        <div class="">
          <span>Отображение строк:</span>
          <select name="" id="" v-model="itemsPerPage" onchange="currentPage=1" class="form-select" data-bs-theme="dark">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
            <option>250</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="card rounded-5 mt-4 p-5"  data-bs-theme="dark">
          <table class="">
            <thead>
                <tr class="text-start">
                  <th>ФИО</th>
                  <th>Имя пользователя</th>
                  <th>Возраст</th>
                  <th>Вес, Рост</th>
                  <th>ОС</th>
                  <th>Услуги</th>
                </tr>
            </thead>
            <tbody v-show="!loading">
              <tr v-for="user in paginatedUsers" :key="user.id" class="text-start">
                <td>
                  <RouterLink :to="`/user-page/${user.id}`">{{ user.name + ' ' + user.surname }}</RouterLink>
                </td>
                <td>{{ user.username }}</td>
                <td>{{ user.age ? `${user.age} ${getAgeSuffix(user.age)}` : "- лет" }}</td>
                <td>{{ user.weight ? (user.weight + 'кг,') : "- кг, " }} &nbsp; {{ user.height ? (user.height + 'см') : "- см"}}</td>
                <td v-if="user.mobile_id===1"><span class="badge bg-success">Android</span></td>
                <td v-else-if="user.mobile_id===2"><span class="badge bg-secondary">IOS</span></td>
                <td v-else><span class="badge bg-warning text-black">Другое</span></td>
                <td>
                  <span class="badge bg-success">{{ user.services.length }} услуги</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="row">
      <div class="col">
        <div class="user-block-bottom">
          <div class="d-flex justify-content-between">
            <div class="left">
              Общее количество пользователей:
              <span class="users-quantity" v-if="DataUsers">{{ DataUsers.length }}</span>
            </div>
            <div class="right">
              <a
                  v-for="page in totalPages"
                  :key="page"
                  href="#"
                  @click.prevent="changePage(page)"
                  :class="{ active: currentPage === page }">
                {{ page }}
              </a>
              <a v-if="totalPages > 10">...</a>
              <a v-if="totalPages > 10" href="#" @click.prevent="changePage(totalPages)">
                {{ totalPages }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isLoading" class="overlay w-100 h-100 position-fixed top-0 start-0 z-3" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="position-fixed top-50 start-50 translate-middle z-3 text-center">
      <div class="spinner-border text-warning" role="status">
        <span class="sr-only"></span>
      </div>
      <div class="mt-2 text-light text-center">Идет загрузка...</div>
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
      usedClasses: new Set(),
      statistic: "",
      isLoading : true,
      currentPage: 1,
      itemsPerPage: 10,
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
      DataUsers: [],
      error: null,
      loading: true,
      searchActive: "",
      addStatus: false,
      addCard: false,
    };
  },
  computed: {
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.DataUsers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.DataUsers.length / this.itemsPerPage);
    },
    pagesToShow() {
      const range = 2; // Number of pages to show on each side of the current page
      const pages = [];

      for (let i = 1; i <= this.totalPages; i++) {
        if (i === 1 || i === this.totalPages || (i >= this.currentPage - range && i <= this.currentPage + range)) {
          pages.push(i);
        }
      }

      // Add ellipsis if needed
      if (pages[0] > 1) pages.unshift('...');
      if (pages[pages.length - 1] < this.totalPages) pages.push('...');

      return pages;
    },
  },
  methods: {
    getAgeSuffix(age) {
      const lastDigit = age % 10;
      const lastTwoDigits = age % 100;

      if (lastTwoDigits >= 11 && lastTwoDigits <= 19)
        return 'лет';

      if (lastDigit === 1)
        return 'год';

      if (lastDigit >= 2 && lastDigit <= 4)
        return 'года';

      return 'лет';
    },
    changePage(page) {
      if (page === '...' || page === this.currentPage) return;
      this.currentPage = page;
    },
    getInfo() {
      const token = Cookies.get("token");
      posts(
        "http://fitness.abdurazzoq.beget.tech/public/users",
        { form: "0", to: "0" },
        token
      )
      .then((response) => {
        this.DataUsers = response.data.users;
        this.loading = false;
      })
      .catch((error) => {
        this.error = error;
        this.loading = false;
      });

      let currentDate = new Date();
      let oneMonthBack = new Date();
      oneMonthBack.setMonth(currentDate.getMonth() - 1);

      oneMonthBack = oneMonthBack.toISOString().split('T')[0];
      currentDate = currentDate.toISOString().split('T')[0];

      posts(
          "http://fitness.abdurazzoq.beget.tech/public/count",
          { start_date: oneMonthBack, end_date: currentDate },
          token
      )
      .then((response) => {
        this.statistic = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error;
      });
    },

    submitForm() {
      this.formData.status = "active";
      posts("http://fitness.abdurazzoq.beget.tech/public/user_register", {
        ...this.formData,
      })
        .then((response) => {
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

<style lang="scss" scoped>
.mh-40{
  min-height: 38px;
}
.abonent, .uslugi { margin-top: 0; }

.card{
  --bs-body-bg: #2c2c2e85 !important;
  border: none;
}
.card table tr{
  height: 50px;
}
/* Combined Background and Text Colors */
.bg-green-text-white { background-color: #28a745; color: #ffffff; } /* Green background, white text */
.bg-red-text-white { background-color: #dc3545; color: #ffffff; } /* Red background, white text */
.bg-blue-text-white { background-color: #007bff; color: #ffffff; } /* Blue background, white text */
.bg-yellow-text-dark { background-color: #ffc107; color: #343a40; } /* Yellow background, dark text */
.bg-purple-text-white { background-color: #6f42c1; color: #ffffff; }

</style>
