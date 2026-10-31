<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title d-flex align-items-center">
            <router-link to="/clients" class="blocked d-flex align-items-center text-white text-decoration-none">
              <img class="px-3 pb-1" src="@/assets/images/icons/Stroke.png" alt="back" />
              <span>Должники</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Карточки статистики -->
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="bg-gray card-block h-100 m-0">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="h5 mh-40 text-secondary">Количество должников</div>
              <div class="fw-bolder h1 mb-0">{{ filteredDebtors.length }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="bg-gray card-block h-100 m-0">
          <div class="d-flex justify-content-between">
            <div class="card-left">
              <div class="h5 mh-40 text-secondary">Общая сумма задолженности</div>
              <div class="fw-bolder h1 mb-0 text-danger">{{ totalDebt }} TJS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Поиск и количество строк -->
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div
          :class="{ 'search-input': searchActive.length > 0 }"
          class="d-flex justify-content-between align-items-center search-block"
        >
          <div class="d-flex align-items-center flex-wrap gap-3">
            <div class="d-flex align-items-center position-relative">
              <img src="@/assets/images/icons/search.png" alt="search" />
              <input
                v-model="searchActive"
                type="text"
                id="searchInput"
                placeholder="Поиск по ФИО, телефону или балансу"
              />
            </div>
            <div class="d-flex">
              <select
                v-model.number="itemsPerPage"
                class="form-select px-4 py-3 rounded-4 bg-gray border-0 text-gray"
                data-bs-theme="dark"
              >
                <option :value="10">Отображение строк: 10</option>
                <option :value="25">Отображение строк: 25</option>
                <option :value="50">Отображение строк: 50</option>
                <option :value="100">Отображение строк: 100</option>
                <option :value="250">Отображение строк: 250</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Таблица должников -->
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card rounded-5 mt-4 p-5" data-bs-theme="dark">
          <table class="w-100">
            <thead>
              <tr class="text-start">
                <th>№</th>
                <th>ФИО</th>
                <th>Имя пользователя (Телефон)</th>
                <th>Баланс</th>
                <th>Дата создания</th>
              </tr>
            </thead>
            <tbody v-show="!isLoading">
              <tr
                v-for="(debtor, index) in paginatedDebtors"
                :key="debtor.username + '-' + index"
                class="text-start"
              >
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td class="fw-medium">
                  {{ (debtor.name || '') + ' ' + (debtor.surname || '') }}
                </td>
                <td>{{ debtor.username }}</td>
                <td>
                  <span class="badge bg-danger fs-6">
                    {{ debtor.balance }} TJS
                  </span>
                </td>
                <td>{{ debtor.create_add || '-' }}</td>
              </tr>
              <tr v-if="!isLoading && paginatedDebtors.length === 0">
                <td colspan="5" class="text-center py-4 text-secondary">
                  Должники не найдены
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Пагинация -->
    <div class="row" v-if="filteredDebtors.length > 0">
      <div class="col">
        <div class="user-block-bottom">
          <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div class="left">
              Общее количество должников:
              <span class="users-quantity blocked">
                {{ filteredDebtors.length }} из {{ debtors.length }}
              </span>
            </div>
            <div class="pagination-wrapper" v-if="totalPages > 1">
              <button
                class="page-btn"
                :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)"
              >
                ‹
              </button>

              <button
                class="page-btn"
                :class="{ active: currentPage === 1 }"
                @click="changePage(1)"
              >
                1
              </button>

              <span v-for="(page, index) in visiblePages" :key="index">
                <span v-if="page === '...'" class="dots">…</span>
                <button
                  v-else
                  class="page-btn"
                  :class="{ active: currentPage === page }"
                  @click="changePage(page)"
                >
                  {{ page }}
                </button>
              </span>

              <button
                v-if="totalPages > 1"
                class="page-btn"
                :class="{ active: currentPage === totalPages }"
                @click="changePage(totalPages)"
              >
                {{ totalPages }}
              </button>

              <button
                class="page-btn"
                :disabled="currentPage === totalPages"
                @click="changePage(currentPage + 1)"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Индикатор загрузки -->
  <div
    v-if="isLoading"
    class="overlay w-100 h-100 position-fixed top-0 start-0 z-3"
    style="background-color: rgba(0, 0, 0, 0.5);"
  >
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
import gets from "@/components/axios/get.js";

export default {
  name: "DebtorsPage",
  data() {
    return {
      debtors: [],
      isLoading: true,
      searchActive: "",
      currentPage: 1,
      itemsPerPage: 10,
    };
  },

  computed: {
    filteredDebtors() {
      if (!this.searchActive || this.searchActive.trim() === "") {
        return this.debtors;
      }

      const query = this.searchActive.toLowerCase().trim();

      return this.debtors.filter((debtor) => {
        const fullName = `${debtor.name || ""} ${debtor.surname || ""}`.toLowerCase();
        const phone = (debtor.username || "").toString().toLowerCase();
        const balance = (debtor.balance || "").toString().toLowerCase();
        const created = (debtor.create_add || "").toString().toLowerCase();

        return (
          fullName.includes(query) ||
          phone.includes(query) ||
          balance.includes(query) ||
          created.includes(query)
        );
      });
    },

    totalDebt() {
      return this.filteredDebtors.reduce((sum, item) => {
        const val = parseFloat(item.balance) || 0;
        return sum + val;
      }, 0);
    },

    paginatedDebtors() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + Number(this.itemsPerPage);
      return this.filteredDebtors.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredDebtors.length / this.itemsPerPage) || 1;
    },

    visiblePages() {
      const total = this.totalPages;
      const current = this.currentPage;
      const delta = 2;

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
  },

  watch: {
    searchActive() {
      this.currentPage = 1;
    },
    itemsPerPage() {
      this.currentPage = 1;
    },
  },

  methods: {
    changePage(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return;
      this.currentPage = page;
    },

    loadDebtors() {
      const token = Cookies.get("token");
      this.isLoading = true;

      gets("https://api.mubingym.com/api/cards/negative-balance", token)
        .then((res) => {
          this.debtors = Array.isArray(res.data)
            ? res.data
            : res.data?.data || [];
        })
        .catch((err) => {
          console.error("Ошибка загрузки списка должников:", err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  mounted() {
    this.loadDebtors();
  },
};
</script>

<style lang="scss" scoped>
.mh-40 {
  min-height: 38px;
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

