<template>
  <div class="container mt-4">

    <!-- HEADER -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Абонементы</h3>

      <div class="d-flex">
        <div class="dpi me-3 filter-icon d-flex justify-content-center align-items-center color-yellow"
          @click="downloadFile()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download"
            viewBox="0 0 16 16">
            <path
              d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
            <path
              d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
          </svg>
        </div>
        <div @click="showPicker = !showPicker" class="dpi filter-icon d-flex justify-content-center align-items-center">
          <img height="29" width="37" src="@/assets/images/icons/filter.png" />
        </div>
      </div>
    </div>


    <!-- DATE PICKER MODAL -->
    <div v-if="showPicker" class="user-page-card cards-modal d-flex justify-content-center align-items-center"
      @click="showPicker = false">
      <div @click.stop class="content position-relative">
        <DataPicker @date-selected="onDateSelected" @close-picker="showPicker = false" />
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center search-block mb-4">
      <div class="d-flex align-items-center">
        <div class="d-flex align-items-center">
          <img src="@/assets/images/icons/search.png" alt="search" />
          <input v-model="search" type="text" id="searchInput" placeholder="Поиск по пользователю" />
        </div>
      </div>
    </div>


    <!-- TABLE -->
    <div class="card rounded-5 p-4 bg-gray" data-bs-theme="dark">
      <table class="w-100">
        <thead>
          <tr class="text-start">
            <th>Клиент</th>
            <th>Телефон</th>
            <th>Услуга</th>
            <th>Куплено</th>
            <th>Исп.</th>
            <th>Осталось</th>
            <th>Дата</th>
            <th>Действие</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in paginatedServices" :key="item.id" class="text-start">
            <td>{{ item.user_name }} {{ item.user_surname }}</td>
            <td>{{ item.user }}</td>
            <td>
              <span class="badge bg-warning text-dark">
                {{ item.services_name }}
              </span>
            </td>
            <td>{{ item.start_count }}</td>
            <td class="text-danger fw-bold">{{ item.used_count }}</td>
            <td class="text-success fw-bold">{{ item.count }}</td>
            <td>{{ item.created_at }}</td>
            <td>
              <button v-if="item.paused" class="btn btn-secondary btn-sm" disabled>
                Приостановлено: {{ formatDate(item.paused.substr(0, 10)) }}
              </button>

              <button v-else class="btn btn-warning btn-sm" @click="pauseService(item)">
                Приостановить
              </button>

              <a @click="editEnrollment(item)" class="ms-4 me-2">
                <img data-v-7847d557="" src="/src/assets/images/icons/pen.png" height="22">
              </a>
              <a @click="removeEnrollment(item)" class="mx-3"> <img data-v-7847d557=""
                  src="/src/assets/images/icons/delete.png" height="22">
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination-wrapper mt-4">
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
          ‹
        </button>

        <button class="page-btn" :class="{ active: currentPage === 1 }" @click="currentPage = 1">
          1
        </button>

        <span v-for="(p, i) in visiblePages" :key="i">
          <span v-if="p === '...'" class="dots">…</span>
          <button v-else class="page-btn" :class="{ active: currentPage === p }" @click="currentPage = p">
            {{ p }}
          </button>
        </span>

        <button v-if="totalPages > 1" class="page-btn" :class="{ active: currentPage === totalPages }"
          @click="currentPage = totalPages">
          {{ totalPages }}
        </button>

        <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
          ›
        </button>
      </div>

    <!-- LOADER -->
    <div v-if="isLoading" class="text-center mt-3">
      <div class="spinner-border text-warning"></div>
      <div class="text-light">Загрузка...</div>
    </div>

  </div>




  <!-- EDIT ENROLLMENT MODAL -->
  <div @click="toggleModal('.clients-list')"
    class="base-modal clients-list d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="holder">
      <div class="base-modal-top">
        <div class="title">Список клиентов</div>
        <button class="button-close" @click="toggleModal('.clients-list')"></button>
      </div>

      <div class="content">
        <form class="form" @submit.prevent="submitEnrollmentEdit">
          <!-- SEARCH -->
          <div class="search-input pb-4">
            <input v-model="clientsSearch" type="text" placeholder="Поиск клиента" />
          </div>
          <div v-if="clientsLoading" class="text-center">
            <div class="spinner-border text-warning"></div>
            <div class="text-light">Загрузка...</div>
          </div>
          <!-- CLIENTS LIST -->
          <div class="clients-list-holder">
            <div v-for="client in filteredClients" :key="client.id" role="button" class="user-list h-auto m-0 p-2"
              :class="{ active: selectedUserId === client.id }" @click="selectClient(client)">
              <div class="user-list-item d-flex justify-content-between" style="font-size: 18px">
                <p class="m-0 col-10">
                  {{ client.name }} {{ client.surname }} <br />
                  <span class="badge bg-yellow">{{ client.username }}</span>
                </p>
                <p class="col-2">
                  {{ client.registration_date.split(' ')[0] }}
                </p>
              </div>
            </div>
          </div>

          <!-- ACTIONS -->
          <div class="d-flex justify-content-between add-user-buttons mt-3">
            <button type="button" class="dont" @click="toggleModal('.clients-list')">
              Отмена
            </button>

            <button class="submit" type="submit" :disabled="!selectedUserId">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>
<script>
import axios from "axios";
import DataPicker from "@/pages/report/DataPicker.vue";
import Cookies from "js-cookie";
import posts from "@/components/axios/posts";

export default {
  components: { DataPicker },

  data() {
    return {
      services: [],
      isLoading: false,
      showPicker: false,
      search: "",

      currentPage: 1,
      itemsPerPage: 10,

      clientsLoading: false,
      dateFrom: null,
      dateTo: null,
      clients: [],
      clientsSearch: "",
      selectedUserId: null,
      selectedEnrollId: null
    };
  },

  computed: {
    filteredClients() {
      const q = this.clientsSearch.toLowerCase().trim();

      if (!q) return this.clients;

      return this.clients.filter(c =>
        `${c.name} ${c.surname} ${c.phone}`
          .toLowerCase()
          .includes(q)
      );
    },
    filteredServices() {
      const q = this.search.trim().toLowerCase();

      if (!q) return this.services;

      return this.services.filter(item => {
        const fullName = `${item.user_name ?? ""} ${item.user_surname ?? ""}`.toLowerCase();
        const phone = (item.user ?? "").toLowerCase();

        return (
          fullName.includes(q) ||
          phone.includes(q)
        );
      });
    },
    paginatedServices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredServices.slice(start, start + this.itemsPerPage);
    },

    totalPages() {
      return Math.ceil(this.filteredServices.length / this.itemsPerPage);
    },

    visiblePages() {
      const total = this.totalPages;
      const current = this.currentPage;
      const delta = 2;

      let start = Math.max(2, current - delta);
      let end = Math.min(total - 1, current + delta);

      if (current <= 3) {
        start = 2;
        end = Math.min(5, total - 1);
      }

      if (current >= total - 2) {
        start = Math.max(total - 4, 2);
        end = total - 1;
      }

      const pages = [];

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < total - 1) pages.push("...");

      return pages;
    }
  },

  methods: {
    toggleModal(selector) {
      document.querySelector(selector)?.classList.toggle("d-none");
    },
    async editEnrollment(item) {
      this.selectedEnrollId = item.id;
      this.selectedUserId = item.user_id ?? null;
      this.clientsSearch = "";

      await this.fetchClients();
      this.toggleModal(".clients-list");
    },

    async fetchClients() {
      this.clientsLoading = true;
      try {
        const token = Cookies.get("token");

        posts(
          "https://missfitnessbackend.tajsoft.tj/users", {
          form: "0",
          to: "0",
        }, token
        )
          .then((res) => {
            this.clientsLoading = false;
            console.log(res);
            this.clients = res.data.users ?? [];
          })
      } catch (e) {
        this.clientsLoading = false;
        console.error("Ошибка загрузки клиентов", e);
      }
    },

    selectClient(client) {
      this.selectedUserId = client.id;
    },

    async submitEnrollmentEdit() {
      if (!this.selectedUserId || !this.selectedEnrollId) return;

      this.isLoading = true;

      try {
        const token = localStorage.getItem("token");

        await axios.post(
          `https://missfitnessbackend.tajsoft.tj/api/enroll-services/update/${this.selectedEnrollId}`,
          {
            user_id: this.selectedUserId
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        this.toggleModal(".clients-list");
        this.fetchServices(); // обновить таблицу

      } catch (e) {
        console.error("Ошибка обновления абонемента", e);
        alert("Не удалось сохранить изменения");
      } finally {
        this.isLoading = false;
      }
    },

    async removeEnrollment(item) {
      const confirmed = confirm(
        `Вы уверены, что хотите удалить абонемент "${item.services_name}" у клиента ${item.user_name}?`
      );

      if (!confirmed) return;

      this.isLoading = true;

      try {
        const token = localStorage.getItem("token");

        await axios.delete(
          `https://missfitnessbackend.tajsoft.tj/api/enroll-services/delete/${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        // удаляем из списка без перезагрузки
        this.services = this.services.filter(s => s.id !== item.id);

        alert("Абонемент удалён");

      } catch (error) {
        console.error("Ошибка при удалении абонемента:", error);
        alert("Не удалось удалить абонемент");
      } finally {
        this.isLoading = false;
      }
    },
    async pauseService(item) {
      this.isLoading = true;
      const confirmed = confirm(
        `Вы уверены, что хотите приостановить услугу "${item.services_name}" для клиента ${item.user_name}?`
      );

      if (!confirmed) return;

      try {
        const token = localStorage.getItem("token");

        const res = await axios.post(
          `https://missfitnessbackend.tajsoft.tj/api/enroll-services/pause/${item.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        this.isLoading = false;

        // Если backend возвращает paused_at — используем его
        item.paused =
          res?.data?.paused ??
          new Date().toISOString().slice(0, 19).replace("T", " ");

      } catch (error) {
        console.error("Ошибка при приостановке абонемента:", error);
        alert("Не удалось приостановить абонемент. Попробуйте позже.");
      }
    },
    async downloadFile() {
      const params = new URLSearchParams({
        dateFrom: this.dateFrom,
        dateTo: this.dateTo
      });

      const response = await fetch(
        `https://missfitnessbackend.tajsoft.tj/export/subscriptions?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "subscription_report.xlsx";
      a.click();

      window.URL.revokeObjectURL(url);
    },

    onDateSelected({ dateFrom, dateTo }) {
      this.dateFrom = dateFrom;
      this.dateTo = dateTo;
      this.showPicker = false;
      this.fetchServices();
    },

    async fetchServices() {
      this.isLoading = true;

      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://missfitnessbackend.tajsoft.tj/api/services/by-date",
          {
            params: this.dateFrom && this.dateTo
              ? { from: this.dateFrom, to: this.dateTo }
              : {},
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        this.services = res.data.data ?? [];
      } catch (e) {
        console.error("Ошибка загрузки услуг:", e);
      } finally {
        this.isLoading = false;
      }
    },

    formatDate(dateTime) {
      return dateTime?.split(" ")[0] ?? "";
    }
  },

  mounted() {
    const today = new Date();
    const to = today.toISOString().slice(0, 10);

    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 1);
    const from = fromDate.toISOString().slice(0, 10);

    this.dateFrom = from;
    this.dateTo = to;

    this.fetchServices();
  },
  watch: {
    search() {
      this.currentPage = 1;
    },
    currentPage(newPage) {
      if (newPage < 1) this.currentPage = 1;
      else if (newPage > this.totalPages) this.currentPage = this.totalPages;
    }
  }
};
</script>

<style scoped>
.active {
  border: 2px solid #D0FD3E;
  border-radius: 5px;
}

.bg-gray {
  background: #2c2c2e85;
}

table th,
table td {
  padding: 12px;
}

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
  justify-content: flex-end;
  gap: 6px;
  max-width: 25%;
  margin-left: auto;

  @media (max-width: 1200px) {
    max-width: 40%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    justify-content: center;
  }
}

.page-btn {
  min-width: 34px;
  height: 34px;
  border-radius: 8px;
  border: none;
  background: #2c2c2e;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #3a3a3c;
  }

  &.active {
    background: #D0FD3E;
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
}

</style>