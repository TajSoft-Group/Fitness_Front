<template>
  <section class="mb-4">
    <div class="container">
      <div class="row position-absolute top-0 pt-4">
        <div :class="[toaster ? 'show-false' : 'show-add']" class="added-user-message">
          <div class="result-true" :class="{ 'error-toast': !success }">
            <div class="result-true-card d-flex align-items-center">
              <img class="m-4 img-width-40" v-show="success" src="@/assets/images/icons/check_add.png">
              <img class="m-4 img-width-40" v-show="!success" src="@/assets/images/icons/dell.png">
              <div class="result-true-content ">
                <div class="result-true-title">{{ toastMessage }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="col">
      <div class="statistics bg-gray">
        <BarChart class="m-0 " style="width: 100%; height: 400px" />
      </div>
    </div>
  </div>


  <div class="container">
    <div class="bg-gray card-block">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5>Банки</h5>
        <button class="btn-add-bank" @click="openCreateBank">
          + Добавить
        </button>
      </div>

      <div class="row">
        <div v-for="bank in banks" :key="bank.id" class="col-md-4 mb-4">
          <div class="bank-card">
            <div class="bank-card-header d-flex justify-content-between align-items-center">
              <h6 class="bank-title">{{ bank.name }}</h6>

              <div class="bank-menu">
                <button class="menu-btn">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>

                <div class="menu-dropdown">
                  <div @click="openEditBank(bank)">Редактировать</div>
                  <div class="danger" @click="openDeleteBank(bank)">Удалить</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>


  <div @click="toggleModal('.bank-modal')"
    class="base-modal bank-modal d-none d-flex justify-content-center align-items-center">

    <div @click.stop class="holder">
      <div class="base-modal-top">
        <div class="title">
          {{ bankForm.id ? 'Изменить банк' : 'Добавить банк' }}
        </div>
        <button class="button-close" @click="toggleModal('.bank-modal')"></button>
      </div>

      <div class="content">
        <form class="form" @submit.prevent="saveBank()">

          <label>Название банка</label>
          <input type="text" placeholder="Введите название" v-model="bankForm.name" required />

          <div class="d-flex justify-content-between add-user-buttons">
            <button type="button" class="dont" @click="toggleModal('.bank-modal')">
              Отмена
            </button>
            <button type="submit" class="submit d-flex align-items-center justify-content-center"
              :disabled="bankSaving">
              <span v-if="!bankSaving">
                {{ bankForm.id ? 'Изменить' : 'Добавить' }}
              </span>

              <span v-else class="spinner"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>


  <div @click="toggleModal('.bank-delete-modal')"
    class="base-modal bank-delete-modal d-none d-flex justify-content-center align-items-center">

    <div @click.stop class="holder">
      <div class="base-modal-top">
        <div class="title">Удалить банк</div>
        <button class="button-close" @click="toggleModal('.bank-delete-modal')"></button>
      </div>

      <div class="content">
        <p class="text-white mb-4">
          Вы уверены, что хотите удалить банк
          <b class="color-yellow">{{ deleteBankItem?.name }}</b>?
        </p>

        <div class="d-flex justify-content-between add-user-buttons">
          <button type="button" class="dont" @click="toggleModal('.bank-delete-modal')">
            Отмена
          </button>
          <button type="button" class="submit bg-danger"
            @click="confirmDeleteBank()">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="globalLoading" class="global-loader d-flex justify-content-center align-items-center">
    <div class="loader-box text-center">
      <div class="spinner"></div>
      <div class="mt-3 text-white">
        <div class="spinner-border text-warning" v-show="!error" role="status">
          <span class="sr-only"></span>
        </div>
        <p>{{ globalLoadingText || 'Загрузка...' }}</p>
      </div>
    </div>
  </div>


  <!-- <div class="container">
    <div class="row">
      <div class="col">
        <div class="statistics bg-gray h-auto">
          <div class="d-flex justify-content-between">
            <div class="load-title">Нагруженность зала</div>
            <div class="d-flex">
              <div class="load-info text-center">
                <div class="time">{{ workloadMin }}</div>
                <div class="load-level">Мин. нагруженность</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="load-info text-center">
                <div class="time">{{ workloadMid }}</div>
                <div class="load-level">Сред. нагруженность</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="load-info text-center">
                <div class="time high-load">{{ workloadMax }}</div>
                <div class="load-level">Пиковое время</div>
              </div>
            </div>
          </div>
          <LineChart
              :groupData="groupData"
              :individualData="individualData"
              :categories="categories"
              style="width: 100%; height: 400px"
          />
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import LineChart from "@/components/Chart/LineChart.vue";
import BarChart from "@/components/Chart/BarChart.vue";
import Cookies from "js-cookie";
import gets from "@/components/axios/get";
import posts from "@/components/axios/posts"; // ✅ БЫЛО ОТСУТСТВИЕ

export default {
  name: "Visitors",
  components: {
    LineChart,
    BarChart,
  },
  data() {
    return {
      // charts
      workloadMax: "",
      workloadMin: "",
      workloadMid: "",
      groupData: [0, 5, 6, 8, 10, 18, 14, 15, 14, 12, 10, 8, 7, 4, 4],
      individualData: [0, 0, 5, 6, 7, 8, 9, 10, 9, 9, 8, 7, 7, 4, 2],
      categories: Array.from({ length: 15 }, (_, i) => `${i + 8}:00`),

      // banks
      banks: [],
      banksLoading: false,

      bankForm: {
        id: null,
        name: "",
      },

      deleteBankItem: null,

      // modal system (КРИТИЧНО)
      modal: "auto",
      modalSelector: "",

      bankSaving: false,
      deleteBankLoading: false,

      globalLoading: false,
      globalLoadingText: "",

      toaster: false,
      toastMessage: '',
      success: false,


    };
  },

  methods: {

    showToast(message, isSuccess = true, duration = 2) {
      this.success = isSuccess;
      this.toastMessage = message;
      this.toaster = true;

      setTimeout(() => {
        this.toaster = false;
      }, duration * 1000);
    },

    /* ================= MODAL CORE ================= */

    toggleModal(selector) {
      this.modal = this.modal === "auto" ? "hidden" : "auto";
      this.modalSelector = selector;
    },

    updateToggleModal() {
      const modalEl = document.querySelector(this.modalSelector);
      if (!modalEl) return;

      if (this.modal === "auto") {
        modalEl.classList.add("d-none");
        document.body.style.overflow = "auto";
      } else {
        modalEl.classList.remove("d-none");
        document.body.style.overflow = "hidden";
      }
    },

    /* ================= BANK UI ================= */

    openCreateBank() {
      this.bankForm = { id: null, name: "", code: "" };
      this.toggleModal(".bank-modal");
    },

    openEditBank(bank) {
      this.bankForm = { ...bank };
      this.toggleModal(".bank-modal");
    },

    openDeleteBank(bank) {
      this.deleteBankItem = bank;
      this.toggleModal(".bank-delete-modal");
    },

    /* ================= API ================= */

    async saveBank() {
      if (this.globalLoading) return;

      this.globalLoading = true;
      this.globalLoadingText = this.bankForm.id
        ? "Сохранение изменений..."
        : "Добавление банка...";

      const token = Cookies.get("token");

      const url = this.bankForm.id
        ? `https://missfitnessbackend.tajsoft.tj/api/banks/update/${this.bankForm.id}`
        : `https://missfitnessbackend.tajsoft.tj/api/banks/create`;

      try {
        await posts(url, this.bankForm, token);

        await this.loadBanks(); // обновляем список
        this.showToast(
          this.bankForm.id ? 'Банк успешно изменён' : 'Банк успешно добавлен',
          true
        );
      } catch (error) {
        console.error("Save bank error:", error);
        this.showToast('Ошибка при сохранении банка', false);
      } finally {
        this.toggleModal(".bank-modal");
        this.globalLoading = false;
        this.globalLoadingText = "";
      }
    },


    async confirmDeleteBank() {
      if (this.globalLoading) return;

      this.globalLoading = true;
      this.globalLoadingText = "Удаление банка...";

      const token = Cookies.get("token");

      try {
        await posts(
          `https://missfitnessbackend.tajsoft.tj/api/banks/delete/${this.deleteBankItem.id}`,
          {},
          token
        );

        await this.loadBanks();
        this.showToast('Банк успешно удалён', true);
      } catch (error) {
        this.showToast('Ошибка при удалении банка', false);
        console.error("Delete bank error:", error);
      } finally {
        this.toggleModal(".bank-delete-modal");
        this.globalLoading = false;
        this.globalLoadingText = "";
      }
    },

    async loadBanks() {
      const token = Cookies.get("token");
      this.banksLoading = true;

      try {
        const response = await gets(
          "https://missfitnessbackend.tajsoft.tj/api/banks/get/all",
          token
        );

        this.banks = response.data.data ?? [];
      } catch (error) {
        console.error("Banks load error:", error);
      } finally {
        this.banksLoading = false;
      }
    },

    /* ================= STATS ================= */

    sumFun() {
      const arrSum = this.groupData.map(
        (v, i) => v + this.individualData[i]
      );
      const sum = arrSum.reduce((x, y) => x + y, 0);

      this.workloadMax =
        arrSum.indexOf(Math.max(...arrSum)) + 8 + ":00";
      this.workloadMid =
        arrSum.indexOf(Math.round(sum / arrSum.length)) + 8 + ":00";
      this.workloadMin =
        arrSum.indexOf(Math.min(...arrSum)) + 8 + ":00";
    },
  },

  mounted() {
    this.sumFun();
    this.loadBanks();
  },

  watch: {
    modal() {
      this.updateToggleModal();
    },
  },
};
</script>


<style scoped>
/* ===== GLOBAL LOADER ===== */
.global-loader {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 99999;
}

.loader-box {
  background: #111;
  padding: 28px 36px;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, .6);
}

/* SPINNER */
.spinner {
  width: 38px;
  height: 38px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: #d0fd3e;
  border-radius: 50%;
  animation: spin .9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ===== BANK CARD ===== */
.bank-card {
  background: linear-gradient(180deg, #1c1f23, #16181c);
  border-radius: 16px;
  padding: 20px;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all .25s ease;
  position: relative;
}

.bank-card:hover {
  border-color: rgba(208, 253, 62, 0.35);
  box-shadow: 0 10px 30px rgba(0, 0, 0, .45);
}

/* ===== HEADER ===== */
.bank-card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.bank-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

/* ===== MENU ===== */
.bank-menu {
  position: relative;
}

.menu-btn {
  background: transparent;
  border: none;
  padding: 4px 4px 15px 15px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}

.menu-btn span {
  width: 4px;
  height: 4px;
  background: #9ca3af;
  border-radius: 50%;
}

.menu-btn:hover span {
  background: #d0fd3e;
}

/* ===== DROPDOWN ===== */
.menu-dropdown {
  position: absolute;
  right: 0;
  top: 26px;
  background: #0f1114;
  border-radius: 12px;
  padding: 10px 0;
  min-width: 160px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, .6);
  display: none;
  z-index: 20;
}

.bank-menu:hover .menu-dropdown {
  display: block;
}

.menu-dropdown div {
  padding: 10px 18px;
  font-size: 14px;
  cursor: pointer;
  color: #e5e7eb;
  transition: background .2s;
}

.menu-dropdown div:hover {
  background: rgba(255, 255, 255, 0.05);
}

.menu-dropdown .danger {
  color: #ff4d4f;
}

.btn-add-bank {
  background: #d0fd3e;
  color: #000;
  border: none;
  padding: 8px 18px;
  border-radius: 10px;
  font-weight: 600;
  transition: .2s;
}

.btn-add-bank:hover {
  background: #bde92e;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.card-block {
  height: auto;
}
</style>
