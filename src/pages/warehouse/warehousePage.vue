<script>
import gets from "@/components/axios/get.js";
import Cookies from "js-cookie";
import form_Data from "@/components/axios/formData.js";
import posts from "@/components/axios/posts.js";
import deletes from "@/components/axios/deletes.js";
import Patch from "@/components/axios/Patch.js";
import { DateTime } from "luxon";

export default {
  data(){
    return{
      edit : false,
      addModal : false,
      Warehouse: [],
      formData: {
        title: "",
        count: "",
        purchase: "",
        sale: "",
      },
      images: [],
      imagesPost: [],
    }
  },
  methods: {
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
      const token = Cookies.get("token");
      gets(
          "https://api.mubingym.com/wh",
          token
      )
          .then((response) => {
            this.Warehouse = response.data.data;
            console.log(this.Warehouse)
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
              this[dataStore].push({id: Date.now(), name: "Все"});
              for (let Key in response.data) {
                this[dataStore].push(response.data[Key]);
              }
              this[dataStore].push({id: Date.now(), name: "+"});
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
      let FormData = {...this.formData};
      FormData.img = this.imagesPost[0];
      FormData.balance = FormData.count;
      FormData.created_at = new DateTime('now');
      try {
        let response;
        if (this.edit) {
          console.log('yes');
          delete FormData.img
          response = await Patch(
              `https://api.mubingym.com/wh/update/${FormData.id}`,
              FormData
          );
          this.editNull()
        } else {
          console.log("yes");
          response = await form_Data(
              "https://api.mubingym.com/wh/create",
              FormData
          );
        }
        console.log(response);
        if (response.status === 200) {
          this.addStatus = true;
          await this.getInfo(
              "https://api.mubingym.com/wh",
              "Warehouse"
          );
          await this.Delay("addStatus", 5);
          this.Delay("addStatus", 5);
        } else {
          console.error(`Запрос завершился с ошибкой: ${response.status}`);
        }
      } catch (error) {
        console.error('Error')
      }
    }
  },
  mounted() {
    this.setup()
  },
}
</script>

<template>


  <div
      @click="addModal = !addModal"
      v-if="addModal"
      class="add-user-modal d-flex justify-content-center my-1 align-items-center"
  >
    <div @click.stop class="content">
      <div class="title" v-show="!edit">ДОБАВИТЬ ТОВАР</div>
      <div class="title" v-show="edit">РЕДАКТИРОВАТЬ ТОВАР</div>
      <div class="form position-relative">
        <label for="heading">Заголовок*</label>
        <input
            ref="inputText"
            type="text"
            placeholder="Введите название"
            id="heading"
            v-model="formData.title"
            required
        />
      </div>
      <div class="form position-relative">
        <label for="count">Кол-во*</label>
        <input
            ref="inputText"
            type="text"
            placeholder="Введите количество"
            id="count"
            v-model="formData.count"
            required
        />
      </div>

      <div class="form position-relative" v-if="!edit">
        <label for="phone">Выберите фото*</label>
        <div class="img-card row p-3 justify-content-between">
          <div
              v-for="(image, index) in images"
              :key="index"
              class="card-add-img m-2"
          >
            <img :src="image" class="card-img-top" alt="Product Image"/>
          </div>
          <div
              v-show="images.length < 1"
              class="card-button align-content-center text-center m-2"
              @click="selectImage"
          >
            <button type="button" class="add-button">+</button>
          </div>
        </div>
        <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            style="display: none"
        />
      </div>
      <div class="form position-relative">
        <label for="purchase">Закупочная цена*</label>
        <input
            type="text"
            placeholder="Введите закупочную цену"
            id="purchase"
            v-model="formData.purchase"
            required
        />
      </div>


      <div class="form position-relative">
        <label for="sale">Продажная цена*</label>
        <input
            type="text"
            placeholder="Введите продажную цену"
            id="sale"
            v-model="formData.sale"
            required
        />
      </div>

      <div class="d-flex justify-content-between add-user-buttons">
        <button @click="(addCardHoliday = false); editNull()" class="dont">Отмена</button>
        <button
            class="submit"
            type="button"
            @click="addCategory(); (addCardHoliday = false)" v-if="!edit"
        >
          Добавить
        </button>
        <button
            class="submit"
            type="button"
            @click="addCategory(); (addCardHoliday = false)" v-if="edit"
        >
          Изменить
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
          <div
              class="user-add-btn d-flex justify-content-center align-items-center"
          >
            <button @click="addModal = true" class="add-user-btn me-3 py-2 px-3">
              Приход
            </button>
            <button @click="addModal = true" class="add-user-btn me-3 py-2 px-3">
              Расход
            </button>
            <button @click="addModal = true" class="add-user-btn py-2 px-3">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-4" v-for="item in Warehouse">
        <div class="bg-gray card-block h-auto position-relative">
          <router-link :to="'/warehouseItem/' + item.id">
            <div class="d-flex justify-content-between">
              <div class="col-4"><img :src="'https://api.mubingym.com/' + item.img"
                                      class="warehouse-img"></div>
              <div class="col-9 px-3">
                <h3>{{ truncatedTitle(item.title) }}</h3>
                <div class="fs-7">
                  <div class="d-flex">
                    <span class="me-3 fw-bold">Кол-во:</span>
                    <span class="color-yellow fw-bold">{{ item.count }} шт</span>
                  </div>
                  <div class="d-flex">
                    <span class="me-3 fw-bold">В наличии:</span>
                    <span class="color-yellow fw-bold">{{ item.balance }} шт</span>
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
                  <li @click="addModal = true; ( edit = item.id, formData = item )">Редактировать</li>
                  <li class="text-danger">Удалить</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.warehouse-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.menu-btn {
  position: relative; /* Ensure the .menu is positioned relative to the .menu-btn */

  .menu-icon {
    right: 10px;
    padding: 0 0 0 20px;
    bottom: 0;

    img {
      transform: scale(1.2); /* Updated for better support */
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
