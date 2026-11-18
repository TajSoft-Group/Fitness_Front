<script>
import { API_URL } from '@/config';
import gets from "@/components/axios/get.js";
import Cookies from "js-cookie";
import form_Data from "@/components/axios/formData.js";
import posts from "@/components/axios/posts.js";
import deletes from "@/components/axios/deletes.js";
import Patch from "@/components/axios/Patch.js";
import { DateTime } from "luxon";
import JsBarcode from "jsbarcode";

export default {
  data() {
    return {
      id: null,
      edit: false,
      addModal: false,
      incomeModal: false,
      Warehouse: [],
      WarehouseItem: [],
      formData: {
        title: "",
        count: "",
        purchase: "",
        sale: "",
      },
      formDataH: {
        product_id: 0,
        type: "income",
        count: "",
        purchase: "",
        sale: "",
      },
      images: [],
      imagesPost: [],
      // для лоадеров и тостеров
      isLoading: true,
      loadingText: "",
      toaster: false,
      toastMessage: "",
      success: true,
    };
  },

  methods: {
    ensureEAN13(raw) {
      if (!raw) return "";
      const digits = String(raw).replace(/\D/g, "");
      if (digits.length === 13) return digits;
      if (digits.length === 12) {
        const nums = digits.split("").map(Number);
        let sum = 0;
        for (let i = 0; i < 12; i++) {
          sum += nums[i] * (i % 2 === 0 ? 1 : 3);
        }
        const mod = sum % 10;
        const check = mod === 0 ? 0 : 10 - mod;
        return digits + String(check);
      }
      return digits.padStart(13, "0");
    },

    renderBarcode() {
      const code = this.ensureEAN13(this.WarehouseItem?.barcode || "");
      if (!code) return;
      try {
        JsBarcode(this.$refs.barcodeCanvas, code, {
          format: "ean13",
          displayValue: true,
          textMargin: 2,
          fontSize: 14,
          height: 60,
          width: 2,
        });
      } catch (e) {
        const canvas = this.$refs.barcodeCanvas;
        if (canvas && canvas.getContext) {
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    },

    selectImage() {
      this.$refs.fileInput.click();
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagesPost.push(file);
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },

    setup() {
      this.loadingText = "Загрузка данных...";
      this.id = this.$route.params.id;
      const token = Cookies.get("token");

      gets(`${API_URL}/whh/history/${this.id}`, token)
        .then((response) => {
          this.Warehouse = response.data.history;
          this.WarehouseItem = response.data.warehouse;
          this.formDataH.product_id = this.WarehouseItem.id;
          console.log(this.Warehouse);
          this.isLoading = false;
        })
        .catch((error) => {
          this.error = error;
          this.loadingText = error;
        });
    },

    truncatedTitle(title) {
      return title;
    },

    Delay(target, t) {
      setTimeout(() => {
        this[target] = false;
        this.AddCategory = "";
      }, t * 1000);
    },

    StatusDelay(i) {
      setTimeout(() => {
        this[i] = false;
      }, 3000);
    },

    getInfo(url, dataStore, id) {
      gets(url)
        .then((response) => {
          console.log(response);
          this[dataStore] = [];
          if (id === 1) {
            this[dataStore].push({ id: Date.now(), name: "Все" });
            for (let Key in response.data) {
              this[dataStore].push(response.data[Key]);
            }
            this[dataStore].push({ id: Date.now(), name: "+" });
          } else if (id === 2) {
            this[dataStore] = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
        });
    },

    editNull() {
      this.edit = false;
      this.formData = {
        title: "",
        price_one: "",
        discount: "",
        description: "",
        result: "",
        barcode: "",
        category_id: "",
      };
    },

    async addCategory() {
      let FormData = { ...this.formData };
      FormData.img = this.imagesPost[0];
      FormData.balance = FormData.count;
      FormData.created_at = new DateTime("now");
      try {
        let response;
        if (this.edit) {
          delete FormData.img;
          response = await Patch(`${API_URL}/wh/update/${FormData.id}`, FormData);
          this.editNull();
        } else {
          response = await form_Data(API_URL + "/wh/create", FormData);
        }
        if (response.status === 200) {
          this.addStatus = true;
          await this.getInfo(API_URL + "/wh", "Warehouse");
          await this.Delay("addStatus", 5);
        } else {
          console.error(`Запрос завершился с ошибкой: ${response.status}`);
        }
      } catch (error) {
        console.error("Error");
      }
    },

    // 🟢 ДОБАВЛЕННЫЕ ФУНКЦИИ
    async incomeWarehouse() {
      await this.handleWarehouseTransaction("income", "оприходовано", "Оприходование");
    },

    async outcomeWarehouse() {
      await this.handleWarehouseTransaction("expense", "израсходовано", "Расходование");
    },

    async handleWarehouseTransaction(type, successMsg, loadingMsg) {
      this.loadingText = loadingMsg + "...";
      this.isLoading = true;

      let formData = new FormData();
      formData.append("product_id", this.formDataH.product_id);
      formData.append("type", type);
      formData.append("count", this.formDataH.count);
      formData.append("purchase", this.formDataH.purchase);
      formData.append("sale", this.formDataH.sale);
      formData.append("created_at", new Date().toISOString());

      try {
        const response = await fetch(`${API_URL}/whh/create/${type}`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `${Cookies.get("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          this.toastMessage = `Успешно ${successMsg}!`;
          this.success = true;
          this.toaster = true;
          this.Delay("toaster", 3);
          this.setup();

          this.formDataH = {
            product_id: 0,
            type: "income",
            count: "",
            purchase: "",
            sale: "",
          };
          this.incomeModal = false;
        } else {
          this.toastMessage = `Ошибка: ${response.status}!`;
          this.success = false;
          this.toaster = true;
          this.Delay("toaster", 3);
        }
      } catch (error) {
        console.error("Ошибка:", error);
        this.toastMessage = `Ошибка: ${error}!`;
        this.success = false;
        this.toaster = true;
        this.Delay("toaster", 3);
      }

      this.isLoading = false;
    },
  },

  watch: {
    WarehouseItem: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.renderBarcode();
        });
      },
    },
  },

  mounted() {
    this.setup();
  },
};
</script>

<template>
  <section class="mb-4">
    <div class="container">
      <div class="row relative">
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

  <div @click="incomeModal = !incomeModal" v-if="incomeModal"
    class="add-user-modal d-flex justify-content-center my-1 align-items-center">
    <div @click.stop class="content">
      <div class="title mb-3" v-show="formDataH.type === 'income'">Приход товара</div>
      <div class="title mb-3" v-show="formDataH.type === 'expense'">Расход товара</div>

      <div class="form position-relative">
        <label for="count">Кол-во*</label>
        <input ref="inputText" type="text" placeholder="Введите количество" id="count" v-model="formDataH.count"
          required />
      </div>

      <div class="form position-relative" v-show="formDataH.type === 'income'">
        <label for="purchase">Закупочная цена*</label>
        <input type="text" placeholder="Введите закупочную цену" id="purchase" v-model="formDataH.purchase" required />
      </div>


      <div class="form position-relative">
        <label for="sale">Продажная цена*</label>
        <input type="text" placeholder="Введите продажную цену" id="sale" v-model="formDataH.sale" required />
      </div>

      <div class="d-flex justify-content-between add-user-buttons">
        <button @click="(incomeModal = false); editNull()" class="dont">Отмена</button>
        <button class="submit" v-if="formDataH.type==='income'" type="button" @click="incomeWarehouse(); (incomeModal = false)">
          Добавить
        </button>
        <button class="submit" v-else type="button" @click="outcomeWarehouse(); (incomeModal = false)">
          Добавить
        </button>
      </div>
    </div>
  </div>


  <div class="container">
    <div class="row relative">
      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title">
            <router-link to="/">Склад</router-link>
          </div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="incomeModal = true; formDataH.type='income'" class="add-user-btn me-3 py-2 px-3">
              Приход
            </button>
            <button @click="incomeModal = true; formDataH.type='expense'" class="add-user-btn me-3 py-2 px-3">
              Расход
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="bg-gray card-block h-auto position-relative">
          <div class="d-flex justify-content-between">
            <div class="col-3"><img :src="$api + '/' + WarehouseItem.img" class="warehouse-img"></div>
            <div class="col-9 px-3">
              <h3>{{ truncatedTitle(WarehouseItem.title) }}</h3>
              <div class="fs-7">
                <div class="d-flex">
                  <div class="me-4">
                    <div class="d-flex">
                      <span class="me-3 fw-bold">Кол-во:</span>
                      <span class="color-yellow fw-bold">{{ WarehouseItem.count }} шт</span>
                    </div>
                    <div class="d-flex">
                      <span class="me-3 fw-bold">Закуп. цена:</span>
                      <span class="color-yellow fw-bold">{{ WarehouseItem.purchase }} TJS</span>
                    </div>
                    <div class="d-flex">
                      <span class="me-3 fw-bold">Прод. цена:</span>
                      <span class="color-yellow fw-bold">{{ WarehouseItem.sale }} TJS</span>
                    </div>
                    <div class="d-flex">
                      <span class="me-3 fw-bold">Описание:</span>
                      <span class="color-yellow fw-bold">{{ WarehouseItem.description }}</span>
                    </div>
                  </div>
                  <div class="ms-4">
                    <div class="d-flex">
                      <span class="me-3 fw-bold">Категория</span>
                      <span class="color-yellow fw-bold">{{ WarehouseItem.category }}</span>
                    </div>
                    <div class="d-flex">
                      <span class="me-3 fw-bold">Скидка:</span>
                      <span class="color-yellow fw-bold">{{ WarehouseItem.discount }}</span>
                    </div>
                    <div class="d-flex">
                      <span class="me-3 fw-bold">Штрихкод:</span>
                      <span class="color-yellow fw-bold">
                        <canvas ref="barcodeCanvas" v-if="WarehouseItem && WarehouseItem.barcode"></canvas>
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 bg-gray card-block h-auto mt-4 p-4 rounded-3">
        <h3 class="mb-3">История приход/расход</h3>
        <table class="table table-gray table-bordered mb-0">
          <thead>
            <tr>
              <th scope="col">Дата</th>
              <th scope="col">Тип</th>
              <th scope="col">Количество</th>
              <th scope="col">Закупочная цена</th>
              <th scope="col">Продажная цена</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Warehouse" :key="item.id">
              <td><span class="badge bg-info text-black px-3">{{ item.created_at }}</span></td>
              <td v-if="item.type === 'income'"><span class="badge bg-yellow">Приход</span></td>
              <td v-else><span class="badge bg-danger">Расход</span></td>
              <td class="fw-bolder">{{ item.count }} шт</td>
              <td><span class="badge bg-warning text-black">{{ item.purchase }}</span></td>
              <td><span class="badge bg-yellow">{{ item.sale ?? 0 }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
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
<style scoped lang="scss">
.table-gray td,
.table-gray th {
  color: #fff;
  background-color: transparent;
}

.warehouse-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.menu-btn {
  position: relative;
  /* Ensure the .menu is positioned relative to the .menu-btn */

  .menu-icon {
    right: 10px;
    padding: 0 0 0 20px;
    bottom: 0;

    img {
      transform: scale(1.2);
      /* Updated for better support */
    }
  }

  .menu-card {
    display: none;
    position: absolute;
    right: 0;
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
    z-index: 9;
  }
}

.fs-7 {
  font-size: 14px;
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

.edit-card {
  font-size: 14px;
  right: 20px;
}

.product-card-menu-item {
  cursor: pointer;
}

.active .category-close {
  color: #000;
}

.category-close {
  font-size: 29px;
  line-height: 0;
}

.product-catalog div {
  border: none;
  color: white;
  background: rgb(58, 58, 60);
  border-radius: 50px;
  min-width: 100px;
  font-weight: 500;
  font-size: 14px;
}

.product-catalog div.active {
  background-color: #c3ff00;
  color: #333;
}

div.add-button {
  background: url(/src/assets/images/icons/add.png) center;
  color: #333;
  border-radius: 50%;
  min-width: 43px;
  min-height: 43px;
  padding: 0;
}
</style>
