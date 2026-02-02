<template>
  <div class="container">
    <div class="row relative">
      <div :class="[addStatus ? 'show-false' : 'show-add']" class="added-user-message">
        <div class="result-true">
          <div class="result-true-card d-flex align-items-center">
            <img class="m-4 img-width-40" src="@/assets/images/icons/check_add.png" />
            <div class="result-true-content">
              <div class="result-true-title">
                Пользователь
                <span class="color-yellow">{{ formData.name + " " + formData.surname }}</span>
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
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title">Клиенты</div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="addCard = true" class="add-user-btn">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Add User -->
  <div @click="addCard = !addCard" v-if="addCard"
    class="add-user-modal d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <div class="title">ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ</div>
      <form class="form" @submit.prevent="submitForm(), (addCard = false)">
        <div class="d-flex">
          <div style="padding-right: 5px">
            <label for="name">Имя*</label>
            <input type="text" placeholder="Введите имя" id="name" v-model="formData.name" required />
          </div>
          <div style="padding-left: 5px">
            <label for="surname">Фамилия*</label>
            <input type="text" placeholder="Введите фамилию" id="surname" v-model="formData.surname" required />
          </div>
        </div>

        <label for="username">Номер телефона*</label>
        <input type="text" placeholder="Введите номер телефона" id="username" v-model="formData.username" required />

        <label for="birthday">Дата рождения*</label>
        <input type="date" placeholder="1994-11-23" id="birthday" v-model="formData.birthday" required />

        <div class="menu-type-2 d-flex justify-content-between pt-3 mt-3">
          <div class="form-recipients">
            <input type="radio" id="man" name="gender" value="1" v-model="formData.gender" required />
            <label for="man">Мужчина</label>
          </div>
          <div class="form-recipients">
            <input type="radio" id="woman" name="gender" value="2" v-model="formData.gender" required />
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
        <input type="text" placeholder="пароль" id="password" v-model="formData.password" required />

        <div class="menu-type-2 d-flex justify-content-between mt-3">
          <div class="form-recipients">
            <input type="radio" id="ios" name="mobile_id" value="2" v-model="formData.mobile_id" required />
            <label for="ios">IOS</label>
            <img class="ps-3 img-width-55" src="@/assets/images/icons/Ios_accueil.webp" />
          </div>
          <div class="form-recipients">
            <input type="radio" id="android" name="mobile_id" value="1" v-model="formData.mobile_id" required />
            <label for="android">Android</label>
            <img class="ps-3 img-width-55" src="@/assets/images/icons/Android_logo_2019.png" />
          </div>
        </div>

        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="addCard = false" class="dont" type="button">Отмена</button>
          <button class="submit" type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Statistics Cards -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-3 mb-3">
        <div class="bg-gray card-block h-100 m-0">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="h5 mh-40">Новые пользователи</div>
              <div class="fw-bolder h1 mb-0">{{ statistic.new_users || 0 }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3 mb-3" v-for="service in statistic.services" :key="service.service_name">
        <div class="bg-gray card-block h-100 m-0">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="h5 mh-40">{{ service.service_name }}</div>
              <div class="fw-bolder h1 mb-0">{{ service.count || 0 }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Search & Table -->
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div :class="{ 'search-input': searchActive.length > 0 }"
          class="d-flex justify-content-between align-items-center search-block">
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <img src="@/assets/images/icons/search.png" alt="search" />
              <input v-model="searchActive" type="text" id="searchInput" placeholder="Поиск по всем параметрам" />
            </div>
            <div class="d-flex mx-4">
              <select v-model="itemsPerPage" class="form-select px-4 py-3 rounded-4 bg-gray border-0 text-gray"
                data-bs-theme="dark">
                <option value="10">Отображение строк: 10</option>
                <option value="25">Отображение строк: 25</option>
                <option value="50">Отображение строк: 50</option>
                <option value="100">Отображение строк: 100</option>
                <option value="250">Отображение строк: 250</option>
              </select>
            </div>
          </div>
          <!-- <router-link to="user-locked">Заблокированные</router-link> -->
        </div>
      </div>
    </div>
  </div>

  <!-- Main Users Table -->
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card rounded-5 mt-4 p-5" data-bs-theme="dark">
          <table>
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
                  <RouterLink :to="`/user-page/${user.id}`">
                    {{ user.name + ' ' + user.surname }}
                  </RouterLink>
                </td>
                <td>{{ user.username }}</td>
                <td>{{ user.age ? `${user.age} ${getAgeSuffix(user.age)}` : '- лет' }}</td>
                <td>
                  {{ user.weight ? user.weight + 'кг,' : '- кг,' }}&nbsp;
                  {{ user.height ? user.height + 'см' : '- см' }}
                </td>
                <td>
                  <span class="badge bg-success" v-if="user.mobile_id === 1">Android</span>
                  <span class="badge bg-secondary" v-else-if="user.mobile_id === 2">iOS</span>
                  <span class="badge bg-warning text-black" v-else>Другое</span>
                </td>
                <td>
                  <span class="badge bg-success">{{ user.services?.length || 0 }} услуги</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="row">
      <div class="col">
        <div class="user-block-bottom">
          <div class="d-flex justify-content-between">
            <div class="left">
              Общее количество пользователей:
              <span class="users-quantity" v-if="DataUsers">{{ filteredUsers.length }} из {{ DataUsers.length }}</span>
            </div>
            <div class="pagination-wrapper">
              <button class="page-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
                ‹
              </button>

              <button class="page-btn" :class="{ active: currentPage === 1 }" @click="changePage(1)">
                1
              </button>

              <span v-for="(page, index) in visiblePages" :key="index">
                <span v-if="page === '...'" class="dots">…</span>
                <button v-else class="page-btn" :class="{ active: currentPage === page }" @click="changePage(page)">
                  {{ page }}
                </button>
              </span>

              <button v-if="totalPages > 1" class="page-btn" :class="{ active: currentPage === totalPages }"
                @click="changePage(totalPages)">
                {{ totalPages }}
              </button>

              <button class="page-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading Overlay -->
  <div v-if="isLoading" class="overlay w-100 h-100 position-fixed top-0 start-0 z-3"
    style="background-color: rgba(0, 0, 0, 0.5);">
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

export default {
  data() {
    return {
      statistic: {},
      isLoading: true,
      currentPage: 1,
      itemsPerPage: 10,
      searchActive: "",
      DataUsers: [],
      loading: true,
      addStatus: false,
      addCard: false,
      formData: {
        name: "",
        surname: "",
        username: "",
        age: "",
        weight: "",
        height: "",
        gender: "",
        birthday: "",
        mobile_id: "",
        password: "",
      },
    };
  },

  computed: {
    visiblePages() {
      const total = this.totalPages;
      const current = this.currentPage;
      const delta = 2; // сколько страниц показывать слева и справа

      const range = [];
      const rangeWithDots = [];

      let start = Math.max(2, current - delta);
      let end = Math.min(total - 1, current + delta);

      if (current - delta <= 2) {
        start = 2;
        end = Math.min(5, total - 1);
      }

      if (current + delta >= total - 1) {
        start = Math.max(total - 4, 2);
        end = total - 1;
      }

      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      if (start > 2) {
        rangeWithDots.push("...");
      }

      rangeWithDots.push(...range);

      if (end < total - 1) {
        rangeWithDots.push("...");
      }

      return rangeWithDots;
    },
    // Фильтрация по всем полям
    filteredUsers() {
      if (!this.searchActive || this.searchActive.trim() === "") {
        return this.DataUsers;
      }

      const query = this.searchActive.toLowerCase().trim();

      return this.DataUsers.filter(user => {
        const fullName = `${user.name || ""} ${user.surname || ""}`.toLowerCase();
        const phone = (user.username || "").toLowerCase();
        const age = user.age ? user.age.toString() : "";
        const weight = user.weight ? user.weight.toString() : "";
        const height = user.height ? user.height.toString() : "";
        const os = user.mobile_id === 1 ? "android" : user.mobile_id === 2 ? "ios" : "";

        return (
          fullName.includes(query) ||
          phone.includes(query) ||
          age.includes(query) ||
          weight.includes(query) ||
          height.includes(query) ||
          os.includes(query)
        );
      });
    },

    // Пагинация по отфильтрованным данным
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredUsers.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    },
  },

  watch: {
    searchActive() {
      this.currentPage = 1; // Сброс на первую страницу при новом поиске
    },
    itemsPerPage() {
      this.currentPage = 1;
    },
  },

  methods: {
    getAgeSuffix(age) {
      const lastDigit = age % 10;
      const lastTwo = age % 100;
      if (lastTwo >= 11 && lastTwo <= 19) return "лет";
      if (lastDigit === 1) return "год";
      if (lastDigit >= 2 && lastDigit <= 4) return "года";
      return "лет";
    },

    changePage(page) {
      if (page === this.currentPage) return;
      this.currentPage = page;
    },

    getInfo() {
      const token = Cookies.get("token");

      // Загрузка пользователей
      posts("https://api.mubingym.com/users", { form: "0", to: "0" }, token)
        .then(res => {
          this.DataUsers = res.data.users || [];
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
          this.loading = false;
        });

      // Статистика за последний месяц
      let currentDate = new Date().toISOString().split("T")[0];
      let oneMonthBack = new Date();
      oneMonthBack.setMonth(oneMonthBack.getMonth() - 1);
      oneMonthBack = oneMonthBack.toISOString().split("T")[0];

      posts("https://api.mubingym.com/count", { start_date: oneMonthBack, end_date: currentDate }, token)
        .then(res => {
          this.statistic = res.data || {};
          this.isLoading = false;
        })
        .catch(err => console.error(err));
    },

    submitForm() {
      const token = Cookies.get("token");
      this.isLoading = true;
      posts("https://api.mubingym.com/user_register", { ...this.formData, status: "active" }, token)
        .then(res => {
          if (res.status === 200) {
            this.isLoading = false;
            this.addStatus = true;
            this.getInfo();
            this.Delay("addStatus", 5);
          }
        })
        .catch(err => console.log(err));
    },

    Delay(target, t) {
      setTimeout(() => {
        this[target] = false;
        this.clearData(this.formData);
      }, t * 1000);
    },

    clearData(obj) {
      Object.keys(obj).forEach(key => (obj[key] = ""));
    },
  },

  mounted() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>
.mh-40 {
  min-height: 38px;
}

.abonent,
.uslugi {
  margin-top: 0;
}

.card {
  --bs-body-bg: #2c2c2e85 !important;
  border: none;
}

.card table tr {
  height: 50px;
}

.search-block img {
  top: auto !important;
}

/* Цвета бейджей */
.bg-green-text-white {
  background-color: #28a745;
  color: #ffffff;
}

.bg-red-text-white {
  background-color: #dc3545;
  color: #ffffff;
}

.bg-blue-text-white {
  background-color: #007bff;
  color: #ffffff;
}

.bg-yellow-text-dark {
  background-color: #ffc107;
  color: #343a40;
}

.bg-purple-text-white {
  background-color: #6f42c1;
  color: #ffffff;
}
.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  @media (max-width: 1200px) {
    max-width: 40%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    justify-content: center;
  }
}

.page-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 10px;

  border-radius: 10px;
  border: none;
  background: #2c2c2e;
  color: #fff;

  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #3a3a3c;
  }

  &.active {
    background: #ffc107;
    color: #000;
    font-weight: 700;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.dots {
  padding: 0 6px;
  color: #999;
  font-size: 18px;
}

</style>