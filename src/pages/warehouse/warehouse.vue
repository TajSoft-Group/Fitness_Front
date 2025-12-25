<script>
import gets from "@/components/axios/get.js";
import Cookies from "js-cookie";
import form_Data from "@/components/axios/formData.js";
import posts from "@/components/axios/posts.js";
import deletes from "@/components/axios/deletes.js";
import Patch from "@/components/axios/Patch.js";
import { DateTime } from "luxon";
import { formToJSON } from "axios";

export default {
  data() {
    return {
      category: {
        name: "",
      },
      isAddingCategory: false,
      activeCategory: null,
      success: true,
      toastMessage: 'Продукт добавлен!',
      toaster: false,
      activeTR: "",
      collection: [],
      isLoading: true,
      error: false,
      loadingText: 'Идет загрузка...',
      presentMenu: false,
      edit: false,
      deleter: false,
      addModal: false,
      incomeModal: false,
      Warehouse: [],
      WarehouseFilter: [],
      formData: {
        title: "",
        count: "",
        purchase: "",
        sale: "",
        discount: "",
        barcode: "",
        type: "1",
        category: null,
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
    }
  },
  methods: {
    showAddCategory() {
      this.isAddingCategory = !this.isAddingCategory;
    },
    removeProduct() {
      this.isLoading = true;
      this.loadingText = "Удаление продукта";
      const token = Cookies.get("token");
      if (this.deleter) {
        deletes(
<<<<<<< HEAD
          `https://api.mubingym.com/wh/delete/${this.deleter}`,
=======
          `https://api.mubingym.com//wh/delete/${this.deleter}`,
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
          token
        )
          .then((response) => {
            this.success = false;
            this.isLoading = false;
            this.toastMessage = "Продукт удален";
            this.toaster = true;
            this.Delay('toaster', 3);
            this.setup();
            console.log(this.Warehouse)
          })
          .catch((error) => {
            this.loadingText = this.error;
            this.error = error;
          });
      }
    },
    openModal(type) {
      this.incomeModal = true;
      this.formDataH.type = type; // устанавливаем type в 'income' или 'expense'
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
      this.isLoading = true;
      const token = Cookies.get("token");
      gets(
<<<<<<< HEAD
        "https://api.mubingym.com/wh",
=======
        "https://api.mubingym.com//wh",
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
        token
      )
        .then((response) => {
          this.Warehouse = response.data.data;
          this.WarehouseFilter = this.Warehouse;
          console.log(this.Warehouse)
          this.isLoading = false;
        })
        .catch((error) => {
          this.error = error;
        });
    },

    async loadCategories() {
      this.isLoading = true;
      const token = Cookies.get("token");
      gets(
<<<<<<< HEAD
        "https://api.mubingym.com/category",
=======
        "https://api.mubingym.com//category",
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
        token
      )
        .then((response) => {
          this.collection = response.data;
          this.isLoading = false;
          console.log(this.collection)
        })
        .catch((error) => {
          this.error = error;
        });
    },
    truncatedTitle(title) {
      return title.length > 10 ? title.substring(0, 10) + '...' : title;
    },

    Delay(target, t) {
      setTimeout(() => {
        this[target] = false;
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
        count: "",
        purchase: "",
        sale: "",
        discount: "",
        barcode: "",
        type: "1",
        category: null,
      };
    },
    setCategory(id) {
      if (id === null) {
        this.WarehouseFilter = this.Warehouse;
        return;
      } else if (id == this.activeCategory) {
        this.activeCategory = null;
        this.WarehouseFilter = this.Warehouse;
        return;
      }
      this.activeCategory = id;
      this.WarehouseFilter = this.Warehouse.filter((val) => {
        return id == val.category;
      })
    },
    async saveCategory() {
      try {
        let response;
        response = await fetch(
<<<<<<< HEAD
          "https://api.mubingym.com/category_create",
=======
          "https://api.mubingym.com//category_create",
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(this.category),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (response.status === 200) {

            this.category = {
              name: "",
            }

            this.showAddCategory();

            this.loadCategories();

          } else {
            console.error(`Запрос завершился с ошибкой: ${response.status}`);
          }
        } else {
          console.error(`Запрос завершился с ошибкой: ${response.status}`);
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    },
    removeCategory(id) {
      console.log(id)
      this.isLoading = true;
      this.loadingText = "Удаление..."
<<<<<<< HEAD
      deletes(`https://api.mubingym.com/category/delete/${parseInt(id)}`)
=======
      deletes(`https://api.mubingym.com//category/delete/${parseInt(id)}`)
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
        .then(
          (response) => {
            console.log(response);
            this.isLoading = false;
            this.success = false;
            this.toastMessage = "Категория удалена";
            this.toaster = true;
            this.setCategory(null);
            this.Delay('toaster', 3);
            this.loadCategories();
          })
        .catch((error) => {
          console.log(response);
          this.loadingText = error;
          this.Delay('toaster', 3);
        })
    },
    async incomeWarehouse() {
      const token = Cookies.get("token");

      let a = "";
      let b = "";
      if (this.formDataH.type == 'income') {
        a = "оприходовано !"
        b = "Оприходование..."
      } else {
        a = "израсходовано !"
        b = "Расходование..."
      }
      this.loadingText = b
      this.isLoading = true;
      let formData = new FormData();
      formData.append('product_id', this.formDataH.product_id);
      formData.append('type', this.formDataH.type);
      formData.append('count', this.formDataH.count);
      formData.append('purchase', this.formDataH.purchase);
      formData.append('sale', this.formDataH.sale);
      formData.append('created_at', new Date().toISOString()); // текущая дата и время

      try {
        let response;
        console.log("yes");
        response = await fetch(
<<<<<<< HEAD
          `https://api.mubingym.com/whh/create/${this.formDataH.type}`,
=======
          `https://api.mubingym.com//whh/create/${this.formDataH.type}`,
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
          {
            headers: {
              Authorization: `${token}`,
              "Accept": "application/json"
            },
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (response.status === 201) {
            this.addStatus = true;

            this.toastMessage = "Успешно " + a;
            this.success = true;
            this.toaster = true;
            this.Delay('toaster', 3);
            this.setup();


            this.formDataH = {
              product_id: 0,
              type: "income",
              count: "",
              purchase: "",
              sale: "",
            }

            this.activeTR = "";

            this.incomeModal = false;

          } else {
            console.error(`Запрос завершился с ошибкой: ${response.status}`);
            this.toastMessage = `Ошибка: ${response.status}!`;
            this.success = false;
            this.toaster = true;
            this.Delay('toaster', 3);
          }
        } else {
          console.error(`Запрос завершился с ошибкой: ${response.status}`);
          this.toastMessage = `Ошибка: ${response.status}!`;
          this.success = false;
          this.toaster = true;
          this.Delay('toaster', 3);
        }
      } catch (error) {
        console.error('Ошибка: ', error);
        this.toastMessage = `Ошибка: ${error}!`;
        this.success = false;
        this.toaster = true;
        this.Delay('toaster', 3);
      }
      this.isLoading = false;
    },
    async addCategory() {

      const token = Cookies.get("token");
      let formDataToSend = new FormData();

      let required = [
        "title",
        // "count",
        // "purchase",
        // "sale",
        "type",
        "category"
      ];

      let isFilled = required.every(key => {
        let val = this.formData[key];
        console.log(key)
        console.log(val !== null && val !== undefined && String(val).trim() !== "");
        return val !== null && val !== undefined && String(val).trim() !== "";
      });

      if (!isFilled) {
        this.success = false;
        this.toastMessage = "Заполните все поля!";
        this.toaster = true;
        this.Delay('toaster', 3);
        return;
      }

      this.isLoading = true;
      this.loadingText = "Отправка продукта...";

      formDataToSend.append("title", this.formData.title);
      // formDataToSend.append("count", Number(this.formData.count));
      // formDataToSend.append("balance", Number(this.formData.count));
      // formDataToSend.append("purchase", Number(this.formData.purchase));
      // formDataToSend.append("sale", Number(this.formData.sale));
      formDataToSend.append("discount", Number(this.formData.discount) || 0);
      formDataToSend.append("barcode", this.formData.barcode);
      formDataToSend.append("type", Number(this.formData.type) || 1);
      formDataToSend.append("category", Number(this.formData.category) || null);

      // ✅ Добавляем первое изображение (если есть)
      if (this.imagesPost.length > 0) {
        this.imagesPost.forEach((img, index) => {
          formDataToSend.append(`img`, img);
        });
      }

      try {
        let response;
        let message = "";
        if (this.edit) {
          message = "изменен";
          response = await fetch(
<<<<<<< HEAD
            `https://api.mubingym.com/wh/update/${this.formData.id}`,
=======
            `https://api.mubingym.com//wh/update/${this.formData.id}`,
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
            {
              method: "PATCH", // или PATCH, если API принимает
              headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(this.formData),
            }
          );
        } else {
          message = "добавлен";
<<<<<<< HEAD
          response = await fetch("https://api.mubingym.com/wh/create", {
=======
          response = await fetch("https://api.mubingym.com//wh/create", {
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
            method: "POST",
            headers: { Authorization: `${token}` },
            body: formDataToSend,
          });
        }

        if (response.ok) {
          this.addStatus = true;
          this.setup();
          this.success = true;
          this.toastMessage = "Продукт успешно " + message;
          this.toaster = true;
          this.Delay("toaster", 3);

          this.addModal = false;
          this.editNull();
          this.images = [];
          this.imagesPost = [];
        } else {
          this.success = false;
          this.toastMessage = `Ошибка: ${response.status}`;
          this.toaster = true;
          this.Delay("toaster", 3);

          console.error(`Ошибка: ${response.status}`);
        }
        this.isLoading = false;
      } catch (error) {
        console.error("Ошибка при добавлении:", error);
        this.error = error;
        this.toaster = true;
        this.toastMessage = error;
      }
    }
  },
  computed: {
    isCollection() {
      console.log(this.collection.length)
      return !this.collection.length;
    },
    isActiveCategory() {
      return (id) => this.activeCategory === id;
    }
  },
  watch: {
    activeTR: {
      async handler(newVal) {
        this.WarehouseFilter = this.Warehouse.filter(w =>
          w.title.toLowerCase().includes(newVal.toLowerCase())
        );
      }
    },
  },
  mounted() {
    this.setup();
    this.loadCategories();
  },
}
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

  <div @click="addModal = !addModal" v-if="addModal"
    class="add-user-modal d-flex justify-content-center my-1 align-items-center">
    <div @click.stop class="content">
      <div class="title" v-show="!edit">ДОБАВИТЬ ТОВАР</div>
      <div class="title" v-show="edit">РЕДАКТИРОВАТЬ ТОВАР</div>
      <div class="form position-relative">
        <label for="heading">Заголовок*</label>
        <input ref="inputText" type="text" placeholder="Введите название" id="heading" v-model="formData.title"
          required />
      </div>

      <div class="form position-relative" v-if="!edit">
        <label for="phone">Выберите фото*</label>
        <div class="img-card row p-3 justify-content-between">
          <div v-for="(image, index) in images" :key="index" class="card-add-img m-2">
            <img :src="image" class="card-img-top" alt="Product Image" />
          </div>
          <div v-show="images.length < 1" class="card-button align-content-center text-center m-2" @click="selectImage">
            <button type="button" class="add-button">+</button>
          </div>
        </div>
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
      </div>

      <div class="d-flex">
        <!-- <div class="form position-relative w-50 pe-2">
          <label for="count">Кол-во*</label>
          <input ref="inputText" type="text" placeholder="Введите количество" id="count" v-model="formData.count"
            required />
        </div> -->
        <div class="form position-relative w-50 ps-2">
          <label for="purchase">Тип*</label>
          <select name="" id="purchase" v-model="formData.type" required>
            <option value="1">Продаваемый</option>
            <option value="2">Не продаваемый</option>
          </select>
        </div>
      </div>


      <div class="d-flex">
        <!-- <div class="form position-relative w-50 pe-2">
          <label for="purchase">Закупочная цена*</label>
          <input type="text" placeholder="Введите закупочную цену" id="purchase" v-model="formData.purchase" required />
        </div> -->


        <!-- <div class="form position-relative w-50 ps-2">
          <label for="sale">Продажная цена*</label>
          <input type="text" placeholder="Введите продажную цену" id="sale" v-model="formData.sale" required />
        </div> -->
      </div>

      <div class="d-flex">
        <div class="form position-relative w-50 pe-2">
          <label for="purchase">Штрихкод*</label>
          <input type="text" placeholder="Введите штрихкод" id="barcode" v-model="formData.barcode" required />
        </div>


        <div class="form position-relative w-50 ps-2">
          <label for="sale">Скидка*</label>
          <input type="text" placeholder="Введите скидку" id="discount" v-model="formData.discount" required />
        </div>
      </div>

      <div class="form position-relative">
        <label for="purchase">Категория*</label>
        <select name="" id="" v-model="formData.category">
          <option selected disabled>Выберите категорию</option>
          <option v-for="value in collection" :value="value.id">{{ value.name }}</option>
        </select>
      </div>

      <div class="d-flex justify-content-between add-user-buttons">
        <button @click="(addModal = false); editNull()" class="dont">Отмена</button>
        <button class="submit" type="button" @click="addCategory(); (addCardHoliday = false)" v-if="!edit">
          Добавить
        </button>
        <button class="submit" type="button" @click="addCategory(); (addCardHoliday = false)" v-if="edit">
          Изменить
        </button>
      </div>
    </div>
  </div>

  <div @click="incomeModal = !incomeModal" v-if="incomeModal"
    class="add-user-modal d-flex justify-content-center my-1 align-items-center">
    <form @submit.prevent="incomeWarehouse(); (addCardHoliday = false)">
      <div @click.stop class="content">
        <div class="title mb-3" v-show="formDataH.type === 'income'">Приход товара</div>
        <div class="title mb-3" v-show="formDataH.type === 'expense'">Расход товара</div>

        <div class="position-relative">
          <label for="name" class="color-yellow" style="margin: 10px 0px 10px 20px;">Выберите товар</label>
          <input type="text" id="present" v-model="activeTR" @click="presentMenu = !presentMenu" required />
          <img @click="presentMenu = !presentMenu" :class="{ 'rotate-90': presentMenu }" class="row-right-icon mt-2"
            src="@/assets/images/icons/row-right.png" />
          <div :class="{ 'd-block': presentMenu }" class="menu-type-1 pt-4 ps-3">
            <h1 class="ps-2">Все товары</h1>
            <div class="scroll-new">
              <div role="button" v-for="wh in WarehouseFilter" @click="
                formDataH.product_id = wh.id;
              presentMenu = false;
              activeTR = wh.title;
              " class="statistics h-auto m-0 p-2">
                <hr class="m-0 p-1" />
                {{ wh.title }}
              </div>
            </div>
          </div>
        </div>

        <div class="form position-relative">
          <label for="count">Кол-во*</label>
          <input ref="inputText" type="text" placeholder="Введите количество" id="count" v-model="formDataH.count"
            required />
        </div>

        <div class="form position-relative">
          <label for="purchase">Закупочная цена*</label>
          <input type="text" placeholder="Введите закупочную цену" id="purchase" v-model="formDataH.purchase"
             />
        </div>


        <div class="form position-relative">
          <label for="sale">Продажная цена*</label>
          <input type="text" placeholder="Введите продажную цену" id="sale" v-model="formDataH.sale"  />
        </div>

        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="(incomeModal = false); editNull()" class="dont">Отмена</button>
          <button class="submit" type="submit">
            Добавить
          </button>
        </div>
      </div>
    </form>
  </div>


  <div class="container">
    <div class="row relative">
      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title"><router-link to="/">Склад</router-link></div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="openModal('income')" class="add-user-btn me-3 py-2 px-3">
              Приход
            </button>
            <button @click="openModal('expense')" class="add-user-btn me-3 py-2 px-3">
              Расход
            </button>
            <button @click="addModal = true; editNull()" class="add-user-btn py-2 px-3">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row px-3 pt-5">
      <button class="btn btn-dark border-0 bg-yellow w-auto rounded-pill me-3" @click="setCategory(null)">Все</button>
      <button class="btn btn-dark w-auto rounded-pill me-3" v-for="item in collection" @click="setCategory(item.id)">
        {{ item.name }}

        <span @click.stop="removeCategory(item.id)" v-if="isActiveCategory(item.id)" class="ms-2 btn-error">
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
        </span>
        <!-- <span class="btn-error ms-2" @click.stop="activeCategory = null; setCategory(null)"
          v-if="isActiveCategory(item.id)">
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
        </span> -->
      </button>
      <button v-if="isCollection" class="btn btn-danger text-black w-auto rounded-pill me-3 d-flex align-items-center"
        @click="loadCategories()">
        Перезагрузить категории
        <div class="spinner-border text-black spinner-reload ms-3" role="status">
          <span class="sr-only"></span>
        </div>
      </button>
      <button class="btn btn-dark rounded-circle bg-yellow fw-bolder fs-5 aspect-ratio-11"
        @click="showAddCategory()">+</button>
      <div class="w-auto py-1 text-center mx-2 py-1 d-flex flex-direction-row" v-if="isAddingCategory">
        <input type="text" v-model="category.name" class="form-control rounded-pill">
        <button class="btn btn-dark bg-yellow w-auto rounded-pill mx-1 px-4" @click="saveCategory()">Ок</button>
      </div>
    </div>
    <div class="row">
      <div class="col-4" v-for="item in WarehouseFilter">
        <div class="bg-gray card-block h-auto position-relative">
          <router-link :to="'/warehouseItem/' + item.id">
            <div class="d-flex justify-content-between">
<<<<<<< HEAD
              <div class="col-4"><img :src="'https://api.mubingym.com/' + item.img" class="warehouse-img"></div>
=======
              <div class="col-4"><img :src="'https://api.mubingym.com//' + item.img" class="warehouse-img"></div>
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
              <div class="col-9 px-3">
                <h3>{{ truncatedTitle(item.title) }}</h3>
                <div class="fs-7">
                  <div class="d-flex">
                    <span class="me-3 fw-bold">Кол-во:</span>
                    <span class="color-yellow fw-bold">{{ item.count }} шт</span>
                  </div>
                  <div class="d-flex">
                    <span class="me-3 fw-bold">Закуп. цена:</span>
                    <span class="color-yellow fw-bold">{{ item.purchase }} TJS</span>
                  </div>
                  <div class="d-flex">
                    <span class="me-3 fw-bold">Прод. цена:</span>
                    <span class="color-yellow fw-bold">{{ item.sale }} TJS</span>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
          <div class="menu-btn">
            <button class="bg-transparent border-0 position-absolute menu-icon"><img
                src="@/assets/images/icons/menu.png" alt=""></button>
            <div class="menu">
              <div class="menu-card">
                <ul>
                  <li @click="addModal = true; edit = true; formData = item">Редактировать</li>
                  <li class="text-danger" @click="(deleter = item.id); removeProduct()">Удалить</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
.aspect-ratio-11 {
  width: 50px;
  aspect-ratio: 1/1;
}

.spinner-reload {
  width: 25px;
  height: 25px;
}

.btn-error svg {
  width: 20px;
  height: 20px;
}

.btn-error {
  z-index: 2;
}

.error-toast {
  content: "";
  width: 440px;
  height: 120px;
  border-radius: 18px;
  border-left: 5px solid #FF4D4D !important;
  background: linear-gradient(58deg,
      rgba(255, 77, 77, 0.8) 0%,
      rgba(0, 0, 0, 0.8) 35%,
      rgba(20, 0, 0, 0.8) 65%,
      rgba(255, 77, 77, 0.8) 100%) !important;
}

.error-div {
  text-align: center;
}

.error-div svg {
  width: 35px;
  height: 35px;
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
    right: 0;
    padding: 0 15px 0 15px;
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

.add-user-modal {
  z-index: 2;
}
</style>
