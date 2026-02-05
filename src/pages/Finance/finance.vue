<template>
  <!-- HEADER -->
  <div class="container">
    <div class="row relative">
      <div class="col  mb-4">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title">
            <router-link to="/">Финансы</router-link>
          </div>

          <div class="d-flex">
            <div v-if="activeTab === 'services'" @click="downloadFile()"
              class="dpi me-3 filter-icon d-flex justify-content-center align-items-center color-yellow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download"
                viewBox="0 0 16 16">
                <path
                  d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path
                  d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
              </svg>
            </div>

            <div @click="statusPicker = !statusPicker"
              class="dpi filter-icon d-flex justify-content-center align-items-center">
              <img height="29" width="37" src="@/assets/images/icons/filter.png" />
            </div>
          </div>

        </div>
      </div>

      <!-- DATE PICKER -->
      <div v-if="statusPicker" @click="statusPicker = false"
        class="user-page-card cards-modal d-flex justify-content-center align-items-center">
        <div @click.stop class="content position-relative">
          <DataPicker @date-selected="reloadAPI" @close-picker="statusPicker = false" />
        </div>
      </div>
    </div>
  </div>

  <!-- TABS -->
  <div class="container mt-3">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button class="nav-link" :class="{ active: activeTab === 'products' }" @click="activeTab = 'products'">
          Товары
        </button>
      </li>

      <li class="nav-item">
        <button class="nav-link" :class="{ active: activeTab === 'services' }" @click="activeTab = 'services'">
          Услуги
        </button>
      </li>

      <li class="nav-item">
        <button class="nav-link" :class="{ active: activeTab === 'courses' }" @click="activeTab = 'courses'">
          Курсы
        </button>
      </li>
    </ul>

    <div class="tab-content mt-3">

      <!-- ================= PRODUCTS ================= -->
      <div class="tab-pane fade" :class="{ 'show active': activeTab === 'products' }">
        <div class="row">

          <div class="col-4">
            <div class="bg-gray card-block">
              <div class="card-title">Продано (шт)</div>
              <div class="card-quantity">
                {{ products.summary.total_sold_qty }}
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="bg-gray card-block">
              <div class="card-title">Сумма продаж</div>
              <div class="card-quantity">
                {{ products.summary.total_sales_sum }} смн.
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="bg-gray card-block">
              <div class="card-title">Кол-во товаров</div>
              <div class="card-quantity">
                {{ products.summary.products_count }}
              </div>
            </div>
          </div>

          <div v-for="(item, index) in products.data" :key="index" class="col-3">
            <div class="bg-gray card-block">
              <div class="card-title">{{ item.product_name }}</div>
              <div class="card-quantity fs-4 text-yellow">
                {{ item.total_sales }} смн.
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ================= SERVICES ================= -->
      <div class="tab-pane fade" :class="{ 'show active': activeTab === 'services' }">
        <div class="row">

          <div class="col-4">
            <div class="bg-gray card-block">
              <div class="card-title">Продано (шт)</div>
              <div class="card-quantity">
                {{ services.summary.count }}
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="bg-gray card-block">
              <div class="card-title">Сумма продаж</div>
              <div class="card-quantity">
                {{ services.summary.revenue }} смн.
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="bg-gray card-block">
              <div class="card-title">Кол-во услуг</div>
              <div class="card-quantity">
                {{ services.data.length }}
              </div>
            </div>
          </div>

          <div v-for="(item, index) in services.data" :key="index" class="col-3">
            <div class="bg-gray card-block">
              <div class="card-title">{{ item.service_name }}</div>
              <div class="card-quantity fs-4 text-yellow">
                {{ item.total_revenue }} смн.
              </div>
              <div class="text-white small">
                Продано: {{ item.total_sold_count }}
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ================= COURSES ================= -->
      <div class="tab-pane fade" :class="{ 'show active': activeTab === 'courses' }">
        <div class="row">

          <div class="col-4">
            <div class="bg-gray card-block">
              <div class="card-title">Продано (шт)</div>
              <div class="card-quantity">
                {{ courses.summary.count }}
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="bg-gray card-block">
              <div class="card-title">Сумма продаж</div>
              <div class="card-quantity">
                {{ courses.summary.revenue }} смн.
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="bg-gray card-block">
              <div class="card-title">Кол-во курсов</div>
              <div class="card-quantity">
                {{ courses.data.length }}
              </div>
            </div>
          </div>

          <div v-for="(item, index) in courses.data" :key="index" class="col-3">
            <div class="bg-gray card-block">
              <div class="card-title">{{ item.service_name }}</div>
              <div class="card-quantity fs-4 text-yellow">
                {{ item.total_revenue }} смн.
              </div>
              <div class="text-muted small">
                Продано: {{ item.total_sold_count }}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

  <!-- LOADER -->
  <div v-if="isLoading" class="overlay position-fixed top-0 start-0 w-100 h-100" style="background: rgba(0,0,0,.5)">
    <div class="position-fixed top-50 start-50 translate-middle text-center">
      <div class="spinner-border text-warning"></div>
      <div class="mt-2 text-light">Идет загрузка...</div>
    </div>
  </div>
</template>

<script>
import DataPicker from "@/pages/transactions/DataPicker.vue";
import gets from "@/components/axios/get";

export default {
  components: { DataPicker },

  data() {
    return {
      activeTab: 'products',
      statusPicker: false,
      isLoading: false,

      dateFrom: null,
      dateTo: null,

      products: {
        summary: {
          total_sold_qty: 0,
          total_sales_sum: 0,
          products_count: 0
        },
        data: []
      },

      services: {
        data: [],
        summary: {
          count: 0,
          revenue: 0
        }
      },

      courses: {
        data: [],
        summary: {
          count: 0,
          revenue: 0
        }
      }
    };
  },

  methods: {
    async downloadFile() {
      const params = new URLSearchParams({
        dateFrom: this.dateFrom,
        dateTo: this.dateTo
      });

      const response = await fetch(
        `https://missfitnessbackend.tajsoft.tj/api/services/by-date/excel`,
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
    async reloadAPI(payload = {}) {
      this.dateFrom = payload.dateFrom || this.dateFrom;
      this.dateTo = payload.dateTo || this.dateTo;

      if (!this.dateFrom || !this.dateTo) return;

      const baseURL = 'https://missfitnessbackend.tajsoft.tj/api';
      const token = localStorage.getItem('token');

      this.isLoading = true;

      try {
        const [
          productsRes,
          servicesRes,
          coursesRes
        ] = await Promise.all([
          gets(`${baseURL}/reports/products-sales-all?from=${this.dateFrom}&to=${this.dateTo}`, token),
          gets(`${baseURL}/report/service?start_date=${this.dateFrom}&end_date=${this.dateTo}`, token),
          gets(`${baseURL}/report/course?start_date=${this.dateFrom}&end_date=${this.dateTo}`, token)
        ]);

        /* ================= PRODUCTS ================= */
        this.products.summary = productsRes?.data?.summary ?? {
          total_sold_qty: 0,
          total_sales_sum: 0,
          products_count: 0
        };

        this.products.data = productsRes?.data?.data ?? [];

        /* ================= SERVICES ================= */
        const servicesData = servicesRes?.data?.data ?? [];

        this.services.data = servicesData;
        this.services.summary = {
          count: servicesData.reduce((sum, i) => sum + Number(i.total_sold_count || 0), 0),
          revenue: servicesData.reduce((sum, i) => sum + Number(i.total_revenue || 0), 0)
        };

        /* ================= COURSES ================= */
        const coursesData = coursesRes?.data?.data ?? [];

        this.courses.data = coursesData;
        this.courses.summary = {
          count: coursesData.reduce((sum, i) => sum + Number(i.total_sold_count || 0), 0),
          revenue: coursesData.reduce((sum, i) => sum + Number(i.total_revenue || 0), 0)
        };

      } catch (error) {
        console.error('API error:', error);
      } finally {
        this.isLoading = false;
      }
    }
  },

  mounted() {
    const today = new Date();
    const to = today.toISOString().slice(0, 10);

    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 1);
    const from = fromDate.toISOString().slice(0, 10);

    this.reloadAPI({
      dateFrom: from,
      dateTo: to
    });
  }
};
</script>

<style lang="scss" scoped>
.card-block {
  height: auto;
}

.text-yellow {
  color: #D0FD3E;
}

.nav-tabs {
  border-bottom: none;
}

.nav-tabs .nav-link {
  background: #2c2c2e85;
  color: #ffffff;
  border: none;
  border-radius: 12px 12px 0 0;
  margin-right: 6px;
  padding: 10px 20px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgba(208, 253, 62, 0.25);
    color: #212529;
  }
}

.nav-tabs .nav-link.active {
  background: #D0FD3E;
  color: #212529;
  font-weight: 600;
}
</style>