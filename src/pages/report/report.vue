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
      <div @click.stop class="content">
        <DataPicker @date-selected="onDateSelected" />
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
            <th>Использовано</th>
            <th>Осталось</th>
            <th>Дата</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in filteredServices" :key="item.id" class="text-start">
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
            <td>{{ formatDate(item.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- LOADER -->
    <div v-if="isLoading" class="text-center mt-3">
      <div class="spinner-border text-warning"></div>
      <div class="text-light">Загрузка...</div>
    </div>

  </div>
</template>
<script>
import axios from "axios";
import DataPicker from "@/pages/transactions/DataPicker.vue";

export default {
  components: { DataPicker },

  data() {
    return {
      services: [],
      isLoading: false,
      showPicker: false,
      search: "",

      dateFrom: null,
      dateTo: null,
    };
  },

  computed: {
    filteredServices() {
      if (!this.search) return this.services;

      const q = this.search.toLowerCase();

      return this.services.filter(i =>
        `${i.user_name} ${i.user_surname}`.toLowerCase().includes(q) ||
        i.user.includes(q) ||
        i.services_name.toLowerCase().includes(q)
      );
    }
  },

  methods: {
    async downloadFile() {
      const params = new URLSearchParams({
        dateFrom: this.dateFrom, // yyyy-mm-dd
        dateTo: this.dateTo
      });

      const response = await fetch(
        `https://missfitnessbackend.tajsoft.tj/export/subscriptions?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'subscription_report.xlsx';
      a.click();

      window.URL.revokeObjectURL(url);
    },
    /** 🔥 ПРИНИМАЕМ ДАТЫ ИЗ DataPicker */
    onDateSelected({ dateFrom, dateTo }) {
      this.dateFrom = dateFrom;
      this.dateTo = dateTo;
      this.showPicker = false;

      this.fetchServices();
    },

    /** 🔥 ЗАПРОС К API */
    async fetchServices() {
      console.log(this.dateFrom, this.dateTo);
      let params = {};
      if (!this.dateFrom || !this.dateTo) {
        params = {};
      } else {
        params = {
          from: this.dateFrom,
          to: this.dateTo
        };
      }

      this.isLoading = true;

      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://missfitnessbackend.tajsoft.tj/api/services/by-date`,
          {
            params: params,
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        this.services = res.data.data || [];
      } catch (e) {
        console.error("Ошибка загрузки услуг:", e);
      } finally {
        this.isLoading = false;
      }
    },

    formatDate(dateTime) {
      return dateTime.split(" ")[0];
    }
  },

  mounted() {
    /** 🔹 ДЕФОЛТ — ПОСЛЕДНИЙ МЕСЯЦ */
    const today = new Date();
    const to = today.toISOString().slice(0, 10);

    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 1);
    const from = fromDate.toISOString().slice(0, 10);

    this.dateFrom = from;
    this.dateTo = to;

    this.fetchServices();
  }
};
</script>
<style scoped>
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
</style>