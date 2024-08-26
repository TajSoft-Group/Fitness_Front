<template>
  <div class="container">
    <div class="row relative">
      <div
          @click="toggleModal('.user-delete-modal')"
          class="add-user-modal user-delete-modal d-flex justify-content-center align-items-center"
          v-if="areyousure"
      >
        <div @click.stop class="content">
          <div class="text-center mb-5">
            <img src="@/assets/images/icons/info.png" height="70px" />
          </div>
          <h3 class="text-center">
            Вы действительно хотите удалить этот продукт?
          </h3>
          <div class="courses mt-3">
            <div class="cards-infos delete-user-info">
              <div class="d-flex justify-content-between add-user-buttons">
                <button @click="toggleModal('.user-delete-modal')" class="dont">
                  Отмена
                </button>
                <button
                  @click="
                    toggleModal('.user-delete-modal'), deleteProduct(deletedProduct.id);
                  "
                  class="submit red"
                  type="button"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="mb-4">
        <div class="container">
          <div class="row relative">
            <div :class="[dllStatus ? 'show-false' : 'show-add']"  class="added-user-message">
              <div class="result-true del-result">
                <div class="result-true-card d-flex align-items-center">
                  <img
                      class="m-4 img-width-40"
                      src="@/assets/images/icons/dell.png"
                  />
                  <div class="result-true-content">
                    <div class="result-true-title" v-if="!deletedCategory">Продукт успешно удален</div>
                    <div class="result-true-title" v-else>Категория успешно удалена</div>
                    <div class="result-true-body mt-2" v-if="!deletedCategory">
                      Продукт “{{ deletedProduct.title }}” был удален
                    </div>
                    <div class="result-true-body mt-2" v-else>
                      Категория “{{ deletedCategory.name }}” была удалена
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="col">
        <div
          class="d-flex justify-content-between title-block align-items-center"
        >
          <div class="page-title">
            <router-link to="/"
              ><img
                class="px-3 pb-2"
                src="@/assets/images/icons/Stroke.png"
              />Продукты</router-link
            >
          </div>
          <div
            class="user-add-btn d-flex justify-content-center align-items-center"
          >
            <button @click="addCardHoliday = true" class="add-user-btn">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container relative">
    <div class="row">
      <div class="col">
        <div
          :class="{ 'search-input': searchActive.length > 0 }"
          class="d-flex justify-content-between align-items-center search-block mt-4"
        >
          <img src="@/assets/images/icons/search.png" alt="search" />
          <input
            v-model="searchActive"
            type="text"
            id="searchInput"
            placeholder="Поиск по всем параметрам"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div
          v-if="searchActive.length > 0"
          class="users-block bg-gray search-result-block"
        ></div>
      </div>
    </div>
  </div>
  <div class="container mt-4">
    <div class="row">
      <div class="col">
        <div class="product-catalog d-flex align-items-center">
          <div
            class="mt-3 py-2 ps-3 pe-0 me-3"
            v-for="(item, index) in buttonsCategory"
            :key="index"
            :class="{
              active: isActive(index),
              'add-button': item.name === '+',
            }"
            @click="toggleButton(index, item.name)"
          >
            <span class="d-flex align-items-center justify-content-between position-relative">
              <span class="me-5" v-if="item.name!=='+'">{{ item.name }}</span>
              <span v-else></span>
              <span class="category-close mx-2 fw-bolder p-3 pe-0" style="position: absolute;right: 0;cursor: pointer" v-if="(item.name!=='+' && item.name!=='Все')" @click="deleteCategory(item.id)">&times;</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div v-for="(product, index) in productList" :key="index" class="col-3 position-relative">
        <div class="product-card p-0 position-relative">
          <img
            :src="'http://fitness.abdurazzoq.beget.tech/public/' + product.img"
          />
          <div class="product-info">
            <div class="product-title mb-2">{{ product.title }}</div>
            <div class="product-price color-yellow d-flex">
              {{ product.result }} TJS
              <span class="product-old-price text-white"
                ><s>{{ product.price_one }} c</s>
              </span>
            </div>
          </div>
        </div>
        <div class="product-card-menu">
          <div class="position-relative product-card-menu-btn">
            <img
              class="p-2 edit-card-hover"
              src="@/assets/images/icons/menu.png"
            />
            <div
              class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card"
            >
              <div
                  @click="(edit = true); (formData = product); addCardHoliday = true"
                class="d-flex align-items-center justify-content-between p-3 product-card-menu-item"
              >
                <p class="m-0">Редактировать</p>
                <img
                  class="img-width-20 ms-5"
                  src="@/assets/images/icons/pencel.png"
                />
              </div>
              <div
                  @click="(areyousure = true); (deletedProduct = product)"
                class="d-flex align-items-center justify-content-between p-3 product-card-menu-item"
              >
                <p class="m-0 blocked">Удалить</p>
                <img
                  class="img-width-20 ms-5"
                  src="@/assets/images/icons/delete.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    @click="toggleModal('.add-money-modal')"
    class="add-user-modal d-none add-money-modal d-flex justify-content-center align-items-center"
  >
    <div @click.stop class="content">
      <h5>ДОБАВИТЬ КАТЕГОРИЮ</h5>
      <div class="courses mt-3">
        <div class="form mt-3">
          <label for="Category">Заголовок*</label>
          <input
            v-model="AddCategory"
            type="text"
            placeholder="Введите название категории"
            id="Category"
          />
        </div>
        <div class="cards-infos">
          <div class="d-flex justify-content-between add-user-buttons">
            <button @click="toggleModal('.add-money-modal')" class="dont">
              Отмена
            </button>
            <button
              @click="
                addCategory('addCategory'), toggleModal('.add-money-modal')
              "
              class="submit"
              type="button"
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    @click="addCardHoliday = !addCardHoliday"
    v-if="addCardHoliday"
    class="add-user-modal d-flex justify-content-center my-1 align-items-center"
  >
    <div @click.stop class="content">
      <div class="title" v-show="!edit">ДОБАВИТЬ ПРОДУКТ</div>
      <div class="title" v-show="edit">РЕДАКТИРОВАТЬ ПРОДУКТ</div>
      <div class="form position-relative">
        <label for="surname">Заголовок*</label>
        <input
          ref="inputText"
          type="text"
          placeholder="Введите название продукта"
          id="heading"
          v-model="formData.title"
        />
      </div>
      <div class="form position-relative">
        <label for="discount">Описание*</label>
        <textarea
          ref="descriptionTextarea"
          id="discount"
          type="text"
          placeholder="Введите текст"
          class="description"
          v-model="formData.description"
        ></textarea>
      </div>

      <div class="form position-relative" v-if="!edit">
        <label for="phone">Выберите фото*</label>
        <div class="img-card row p-3 justify-content-between">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="card-add-img m-2"
          >
            <img :src="image" class="card-img-top" alt="Product Image" />
          </div>
          <div
            v-show="images.length < 6"
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
        <label for="barcode">Штрих-код (поднести к сканеру)*</label>
        <input
            type="text"
            placeholder="Отсканируйте штрих-код товара!"
            id="barcode"
            v-model="formData.barcode"
        />
      </div>

      <div class="form position-relative">
        <label for="name">Категория*</label>
        <input type="text" v-model="categoryActive" id="present" />
        <img
          @click="presentMenu = !presentMenu"
          :class="{ 'rotate-90': presentMenu }"
          class="row-right-icon"
          src="@/assets/images/icons/row-right.png"
        />
        <div :class="{ 'd-block': presentMenu }" class="menu-type-1 pt-4 px-4">
          <div
            v-for="item in buttonsCategory"
            class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse"
          >
            <input
              @click="
                (categoryActive = item.name),
                  (formData.category_id = item.id),
                  (presentMenu = false)
              "
              v-if="(item.name !== 'Все') & (item.name !== '+')"
              type="radio"
              :id="item.name"
              name="catcat"
            />
            <label
              @click="
                (categoryActive = item.name),
                  (formData.category_id = item.id),
                  (presentMenu = false)
              "
              v-if="(item.name !== 'Все') & (item.name !== '+')"
              class="text-white"
              :for="item.name"
              >{{ item.name }}</label
            >
          </div>
          <hr />
        </div>
      </div>

      <div class="d-flex justify-content-between mt-3 text-center">
        <div class="form col position-relative">
          <label for="price_one">Цена за шт.*</label>
          <input type="text" id="price_one" v-model="formData.price_one" />
        </div>
        <div class="form col mx-2 position-relative">
          <label for="discount">Скидка</label>
          <input type="text" id="discount" v-model="formData.discount" />
        </div>
        <div class="form col position-relative">
          <label for="surname"
            >Итого
            <span v-if="formData.price_one !== ''">{{
              (formData.result =
                formData.price_one -
                Math.round((formData.price_one / 100) * formData.discount))
            }}</span></label
          >
          <input type="text" id="heading" v-model="formData.result" />
        </div>
      </div>
      <div class="d-flex justify-content-between add-user-buttons">
        <button @click="(addCardHoliday = false); editNull()" class="dont">Отмена</button>
        <button
          class="submit"
          type="button"
          @click="addCategory('FormData'); (addCardHoliday = false)"  v-if="!edit"
        >
          Добавить
        </button>
        <button
            class="submit"
            type="button"
            @click="addCategory('FormData'); (addCardHoliday = false)" v-if="edit"
        >
          Изменить
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import gets from "@/components/axios/get.js";
import form_Data from "@/components/axios/formData.js";
import posts from "@/components/axios/posts.js";
import deletes from "@/components/axios/deletes.js";
import Patch from "@/components/axios/Patch.js";

export default {
  data() {
    return {
      edit: false,
      dllStatus: false,
      deletedCategory: false,
      areyousure: false,
      deletedProduct: "",
      images: [],
      addCardHoliday: false,
      presentMenu: false,
      picked: "",
      AddCategory: "",
      searchActive: "",
      addStatus: true,
      addCard: false,
      buttonsCategory: [],
      activeButtons: [0],
      productList: "",
      modal: "auto",
      modalSelector: "",
      formData: {
        title: "",
        price_one: "",
        discount: "",
        description: "",
        result: "",
        barcode : "",
        category_id: "",
      },
      imagesPost: [],
      categoryActive: "Выберите категорию продукта",
      categoryActive_id: "",
    };
  },
  watch: {
    modal() {
      this.updateToggleModal();
    },
  },
  methods: {
    editNull(){
      this.edit = false;
      this.formData = {
        title: "",
        price_one: "",
        discount: "",
        description: "",
        result: "",
        barcode : "",
        category_id: "",
      };
    },
    deleteProduct(id){
      console.log(id)
      deletes(`http://fitness.abdurazzoq.beget.tech/public/product/${ parseInt(id) }`)
          .then(
              (response) =>
              {
                console.log(response);
                this.dllStatus = true;
                this.areyousure=false;
                let index = this.productList.findIndex(item => item.id === id);
                if (index !== -1) {
                  this.productList.splice(index, 1);
                }
                setTimeout(()=>{ this.dllStatus=false; },2000)
              })
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

    // ///////////// //////////// => addCategory // => product
    async addCategory(typeAdd) {
      if (typeAdd === "addCategory") {
        posts("http://fitness.abdurazzoq.beget.tech/public/category_create", {
          name: this.AddCategory,
        })
          .then((response) => {
            console.log(this.AddCategory);
            if (response.status === 200) {
              this.addStatus = true;
              this.getInfo(
                "http://fitness.abdurazzoq.beget.tech/public/category",
                "buttonsCategory",
                1
              );
              this.getInfo(
                "http://fitness.abdurazzoq.beget.tech/public/product/all",
                "productList",
                2
              );
              this.Delay("addStatus", 5);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (typeAdd === "FormData") {
        let FormData = {...this.formData};
        FormData.img = this.imagesPost[0];
        try {
          let response;
          if(this.edit){
            console.log('yes');
            delete FormData.img
            response = await Patch(
                `http://fitness.abdurazzoq.beget.tech/public/product/${ FormData.id }`,
                FormData
            );
            this.editNull()
          }else{
            response = await form_Data(
                "http://fitness.abdurazzoq.beget.tech/public/product_create",
                FormData
            );
          }

          console.log(response);
          if (response.status === 200) {
            this.addStatus = true;
            await this.getInfo(
              "http://fitness.abdurazzoq.beget.tech/public/category",
              "buttonsCategory",
              1
            );
            await this.getInfo(
              "http://fitness.abdurazzoq.beget.tech/public/product/all",
              "productList",
              2
            );
            await this.Delay("addStatus", 5);
            this.Delay("addStatus", 5);
          } else {
            console.error(`Запрос завершился с ошибкой: ${response.status}`);
          }
        } catch (error) {}
      }
    },

    toggleButton(index, add) {
      const position = this.activeButtons.indexOf(index);
      if (add === "+") {
        this.toggleModal(".add-money-modal");
      } else {
        if (position !== -1) {
          this.activeButtons.splice(position, 1);
        } else {
          this.activeButtons.push(index);
        }
      }
    },
    isActive(index) {
      return this.activeButtons.includes(index);
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
    toggleModal(modalSelector) {
      this.modal = this.modal === "auto" ? "hidden" : "auto";
      this.modalSelector = modalSelector;
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
    deleteCategory(id){
      console.log(id)
      deletes(`http://fitness.abdurazzoq.beget.tech/public/category/delete/${ parseInt(id) }`)
          .then(
              (response) =>
              {
                console.log(response);
                this.dllStatus = true;
                this.deletedCategory = this.buttonsCategory.find(item => item.id === id)
                let index = this.buttonsCategory.findIndex(item => item.id === id);
                if (index !== -1) {
                  this.buttonsCategory.splice(index, 1);
                }
                setTimeout(()=>{ this.dllStatus=false; this.deletedCategory=false; },2000)
              })
    }
  },
  mounted() {
    this.getInfo(
      "http://fitness.abdurazzoq.beget.tech/public/category",
      "buttonsCategory",
      1
    );
    this.getInfo(
      "http://fitness.abdurazzoq.beget.tech/public/product/all",
      "productList",
      2
    );
  },
};
</script>

<style lang="scss" scoped>
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
.edit-card{
  font-size: 14px;
  right: 20px;
}
.product-card-menu-item{
  cursor: pointer;
}
.active .category-close{
  color: #000;
}
.category-close{
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
div.add-button{
  background: url(/src/assets/images/icons/add.png) center;
  color: #333;
  border-radius: 50%;
  min-width: 43px;
  min-height: 43px;
  padding: 0;
}
</style>
