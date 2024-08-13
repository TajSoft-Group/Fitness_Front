<template>

  <div
    @click="toggleModal('.clients-list')"
    class="base-modal clients-list d-none d-flex justify-content-center align-items-center"
  >
    <div @click.stop class="holder">
      <div class="base-modal-top">
        <div class="cart-modal-top">
          <div class="cart-modal-top-title">наличные<br />Бонусы</div>
          <div class="cart-modal-top-title-2">{{ currentUser.cards[0].balance }} TJS<br /> {{ currentUser.cards[1].balance }}</div>
        </div>
      </div>
      <div class="content">
        <form
          class="form"
          @submit.prevent="submitForm(), toggleModal('.clients-list')"
        >
          <div class="d-flex justify-content-around">
            <div class="form-recipients">
              <input autocomplete="off" class="form-check-input" type="radio" id="cash" name="type" value="cash" v-model="type">
              <label for="cash" class="text-white">Наличными</label>
            </div>
            <div class="form-recipients">
              <input autocomplete="off" class="form-check-input" type="radio" id="card" name="type" value="card" v-model="type">
              <label for="card" class="text-white">Картой</label>
            </div>
            <div class="form-recipients">
              <input autocomplete="off" class="form-check-input" type="radio" id="bonus" name="type" value="bonus" v-model="type">
              <label for="bonus" class="text-white">Бонусами</label>
            </div>
          </div>
          <div v-show="type==='cash'">
            <label for="title">Оплата наличными</label>
            <input type="text" placeholder="Наличные" id="title" v-model="payment"/>
          </div>
          <div v-show="type==='bonus' || type==='card'">
            <label class="mx-0 mt-3">С вашего счёта будет снято {{ totalPrice.toFixed(2) }} <span v-show="type==='bonus'">баллов</span> <span v-show="type==='card'">TJS</span></label>
          </div>
          <div class="cart-text">
            <div class="cart-text-row">
              <span>Сумма без скидки</span>
              <span>{{ (totalWithoutDiscount).toFixed(2) }} TJS</span>
            </div>
            <div class="cart-text-row">
              <span>Сумма скидки</span>
              <span>{{ (totalWithoutDiscount - totalPrice).toFixed(2) }} TJS</span>
            </div>
            <div class="cart-text-row d-flex align-items-center">
              <span>Получение бонусов</span>
              <span v-show="type!=='bonus'">от общей суммы ( {{ currentUser.cards[1].percent }} )</span>
              <span v-show="type==='bonus'" class="text-danger h6 my-0">начисление бонусов недоступно!</span>
            </div>
            <div class="cart-text-row cart-total pb-0">
              <span>ИТОГО</span>
              <span>={{ totalPrice.toFixed(2) }} TJS</span>
            </div>
            <div class="cart-text-row">
              <span>Сдача</span>
              <span>={{ payment > 0 ? payment - totalPrice.toFixed(2) : "0" }} TJS</span>
            </div>
          </div>
          <div class="d-flex justify-content-between add-user-buttons">
            <button
              @click="toggleModal('.clients-list')"
              class="dont"
              type="button"
            >
              Отмена
            </button>
            <button class="submit" type="submit">Оплатить</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="cash container mt-5">
      <div class="row">
        <div class="col-md-12 position-relative">
          <h2>Касса</h2>
          <div
            :class="{ 'search-input': searchActive.length > 0 }"
            class="d-flex justify-content-between align-items-center search-block mt-4"
          >
            <img src="@/assets/images/icons/search.png" alt="search" />
            <input
              v-model="searchActive"
              @keydown="isBarcode"
              type="text"
              id="searchInput"
              autocomplete="off"
              ref="myInput"
              placeholder="Поиск по номеру телефона"
            />
            <button
              v-if="searchActive.length > 0"
              class="button-close"
              @click="clearSearch"
            ></button>
          </div>
          <div class="col">
            <div
              v-if="searchActive"
              class="users-block bg-gray search-result-block"
            >
              <div>
                <div
                  v-for="(searchItem, key) in searchResult"
                  :key="key"
                  class="search-result-row"
                >
                  <div class="search-result-row__title">
                    <h2>{{ outputSearchTitle(key) }}</h2>
                    <h2 class="search-result-row__count">
                      Найдено: {{ searchItem.length }}
                    </h2>
                  </div>
                  <div
                    v-for="item in searchItem"
                    :key="item.id"
                    @click="selectItem(item)"
                    class="search-result-row__item"
                  >
                    <span v-if="key === 'users'"
                      >{{ item.name }} {{ item.surname }}</span
                    >
                    <span v-if="key === 'courses'">{{ item.title }}</span>
                    <span v-if="key === 'products'">{{ item.title }}</span>
                    <span v-if="key === 'services'">{{ item.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-7">
          <div class="d-flex w-100 justify-content-between mt-0 pt-3">
            <div class="col-7">
              <div class="statistics statistics-left h-auto bg-gray mt-3 me-3">
                <div class="left d-flex align-items-center">
                  <div
                    class="teacher-img img-width-60 border-2px border-color-yellow"
                  >
                    <img v-if="currentUser" src="@/assets/images/avatar-user-empty.png" />
                    <img v-else src="@/assets/images/avatar-user-empty.png" />
                  </div>
                  <div v-if="currentUser" class="w-100">
                    <div class="h5">
                      {{ currentUser.name }} {{ currentUser.surname }}
                    </div>
                    <div class="d-flex justify-content-between">
                      <span v-if="currentUser.username" class="me-2">{{
                        currentUser.username
                      }}</span>
                      <span
                        v-if="
                          currentUser.cards.length &&
                          currentUser.cards[0].balance
                        "
                        >{{ currentUser.cards[0].balance }} TJS</span
                      >
                    </div>
                    <div class="d-flex justify-content-between">
                      <span
                        v-if="
                          currentUser.cards.length && currentUser.cards[0].name
                        "
                        class="color-yellow"
                        >{{ currentUser.cards[0].name }}</span
                      >
                      <span>{{ currentUser.cards[1].balance }} баллов</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-5 px-0">
              <div class="d-flex justify-content-between statistics bg-gray h-auto mt-3">
                <div>
                  <div class="fs-6">Цена:</div>
                  <div class="fs-6">Бонус:</div>
                  <div class="h5">Итого:</div>
                </div>
                <div class="">
                  <div class="fs-6">{{ cart.length > 0 ? cart.at(-1).price : 0 }} c</div>
                  <div class="fs-6">{{ currentUser.cards[1].balance }}</div>
                  <div class="h5">{{ totalPrice.toFixed(2) }} c</div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex w-100">
            <div class="users-block py-2 rounded-5 mt-3 p-5 w-100">
              <div class="cart-list-holder mb-5">
                <table id="dataTable" class="cartTable">
                  <thead>
                    <tr>
                      <th class="col-3 text-start"> &nbsp; Название</th>
                      <th>Кол-во (шт)</th>
                      <th>Цена</th>
                      <th>Скидка</th>
                      <th class="total">Итого</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in cart" :key="item.id">
                      <td class="col-2">
                        <div class="d-flex">
                          {{ index + 1 }}.
                          <div class="text-start ms-2" v-if="item.name">{{ item.name }}</div>
                          <div class="text-start ms-2" v-if="item.title && !item.name">{{ item.title }}</div>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex justify-content-center align-items-center">
                          <a @click="itemCnt('-', index)" class="counter d-flex align-items-center justify-content-center">-</a>
                          <input
                              class="bg-gray w-25 border-1px text-white mx-1 countInp"
                              type="number"
                              min="1"
                              max="99"
                              v-model="item.count"
                          />
                          <a @click="itemCnt('+', index)" class="counter d-flex align-items-center justify-content-center">+</a>
                        </div>
                      </td>
                      <td>{{ item.price }} сом</td>
                      <td>- {{ item.discount }} %</td>
                      <td>
                        {{ itemTotalPrice(item.count, item.price_discount).toFixed(2) }}
                        сом<br />
                      </td>
                      <td>
                        <button
                          @click="deleteProduct(index)"
                          class="delete-product"
                        >
                          <img
                            src="@/assets/images/icons/close-icon.png"
                            alt="search"
                          />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-between cart-buttons">
                <button class="button-type-1 ms-5">Отмена</button>
                <button
                  class="button-type-1 bg-yellow me-5"
                  @click="toggleModal('.clients-list')"
                >
                  Оплатить
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5 pt-1">
          <div class="statistics bg-gray h-auto p-4 mt-4">
            <h4 class="pt-3 statistics-title">ПРОДУКТЫ</h4>
            <div class="scroll-container">
              <div class="scroll-content">
                <div class="row">
                  <div class="col product-catalog">
                    <button
                        class="py-2 me-3"
                        :class="{
                      active: !activeProductCategory,
                    }"
                        @click="toggleProduct(null)"
                    >
                      Все
                    </button>
                    <button
                        class="py-2 me-3"
                        v-for="(item, index) in productCategories"
                        :key="index"
                        :class="{
                      active: activeProductCategory?.id === item.id,
                    }"
                        @click="toggleProduct(item)"
                    >
                      {{ item.name }}
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="row flex-nowrap">
                    <div
                        v-for="item in productList"
                        @click="selectItem(item);"
                        class="product-card p-0 position-relative"
                    >
                      <img
                          :src="`http://fitness.abdurazzoq.beget.tech/public/${item.img[0]}`"
                      />
                      <div class="product-info">
                        <div class="product-title mb-0">{{ item.title }}</div>
                        <div class="product-price color-yellow d-flex">
                          {{ item.price_one }} TJS
                          <span class="product-old-price text-white"
                          ><s>{{}} c</s>
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="scroll-container">
              <div class="scroll-content">
                <div class="row">
                  <h4 class="pt-3 statistics-title">УСЛУГИ</h4>
                  <div class="col product-catalog">
                    <button
                        class="py-2 me-3"
                        :class="{
                      active: !activeServiceType,
                    }"
                        @click="toggleService(null)"
                    >
                      Все
                    </button>
                    <button
                        class="py-2 me-3"
                        v-for="(item, index) in serviceType"
                        :key="index"
                        :class="{
                      active: activeServiceType?.name === item.name,
                    }"
                        @click="toggleService(item)"
                    >
                      {{ item.name }}
                    </button>
                  </div>
                </div>
                <div class="row flex-nowrap uslugi-holder">
                  <div
                      v-for="item in serviceList"
                      class="uslug-card p-0 position-relative"
                      @click="selectItem(item)"
                  >
                    <img
                        :src="`http://fitness.abdurazzoq.beget.tech/public/${item.img[0]}`"
                    />
                    <div class="product-info">
                      <div class="product-title mb-0 border-color-yellow">
                        {{ item.name }}
                      </div>
                      <div class="product-price color-yellow d-flex">
                        {{ item.price_visit }} TJS
                        <span class="product-old-price text-white"
                        >/ 1 посещение
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="scroll-container">
              <div class="scroll-content">
                <div class="row">
                  <h4 class="statistics-title">КУРСЫ</h4>
                  <div v-if="courseTypes" class="col product-catalog">
                    <button
                        class="py-2 me-3"
                        :class="{
                      active: !activeCurseType,
                    }"
                        @click="toggleCourse(null)"
                    >
                      Все
                    </button>
                    <button
                        class="py-2 me-3"
                        v-for="(item, index) in courseTypes"
                        :key="index"
                        :class="{
                      active: activeCurseType?.id === item.id,
                    }"
                        @click="toggleCourse(item)"
                    >
                      {{ item.name }}
                    </button>
                  </div>
                </div>
                <div v-if="coursesList.length" class="row flex-nowrap">
                  <div
                      v-for="course in coursesList"
                      class="uslug-card p-0 position-relative"
                      @click="selectItem(course)"
                  >
                    <img
                        :src="`http://fitness.abdurazzoq.beget.tech/public/${course.img}`"
                    />
                    <div class="product-info">
                      <div class="product-title mb-0 border-color-yellow">
                        {{ course.title }}
                      </div>
                      <div class="product-price color-yellow d-flex">
                        {{ course.price }} TJS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import posts from "@/components/axios/posts.js";
import gets from "@/components/axios/get.js";
import product from "@/pages/products/product.vue";

export default {
  data() {
    return {
      searchActive: "",
      searchResult: null,
      // type: 'cash','card','bonus',
      type: 'cash',
      payment: "",
      FormData: {
        cards_id: "0",
        services_id: [
          // {
          //   id:"7",
          //   count:"2"
          // },
        ],
        course_id: [],
        product_id: [],
        payment: 0,
        payment_type : "purchase",
        create_add: new Date()
      },
      currentUser: {
        name: 'Имя',
        surname: 'Фамилия',
        username: 'Телефон',
        cards: [
          {
            balance: '0',
            name: "Карта"
          },
          {
            balance: '0',
            name: "Бонус",
            percent : 0,
          }
        ],
      },
      cart: [],
      modal: "auto",
      modalSelector: "",
      courseTypes: [],
      activeCurseType: null,
      coursesList: [],
      productCategories: [],
      activeProductCategory: null,
      productList: [],
      serviceType: [],
      activeServiceType: null,
      serviceList: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => {
        return total + (parseFloat(item.price_discount) * parseFloat(item.count ? item.count : 1 ));
      }, 0);
    },
    totalWithoutDiscount() {
      return this.cart.reduce((total, item) => {
        return total + (parseFloat(item.price) * parseFloat(item.count ? item.count : 1 ));
      }, 0);
    }
  },
  watch: {
    // whenever question changes, this function will run
    searchActive(queryString) {
      posts("http://fitness.abdurazzoq.beget.tech/public/search_all", {
        name: queryString,
      })
        .then((response) => {
          if (response && response.data) {
            this.searchResult = response.data;
            this.simulateEnterKeyPress()
          }
        })
        .catch((error) => {
          this.error = error;
          this.Delay("loading", 1);
        });
    },
    activeCurseType: {
      async handler(type) {
        if (this.courseTypes.length) {
          if (type) {
            const data = await this.getCourses(type.id);
            this.coursesList = data;
          } else {
            this.coursesList = [];
            this.courseTypes.forEach(async (item) => {
              const data = await this.getCourses(item.id);
              data.forEach(async (item) => {
                this.coursesList.push(item);
              });
            });
          }
        }
      },
      immediate: true,
    },
    courseTypes: {
      async handler(types) {
        types.forEach(async (item) => {
          const data = await this.getCourses(item.id);
          data.forEach(async (item) => {
            this.coursesList.push(item);
          });
        });
      },
      once: true,
      deep: true,
    },

    // activeProductCategory
    activeProductCategory: {
      async handler(type) {
        if (this.productCategories.length) {
          if (type) {
            const data = await this.getProducts(type.id);
            this.productList = data;
          } else {
            this.productList = [];
            this.productCategories.forEach(async (item) => {
              const data = await this.getProducts(item.id);
              data.forEach(async (item) => {
                this.productList.push(item);
              });
            });
          }
        }
      },
      immediate: true,
    },
    productCategories: {
      async handler(types) {
        types.forEach(async (item) => {
          const data = await this.getProducts(item.id);
          data.forEach(async (item) => {
            this.productList.push(item);
          });
        });
      },
      once: true,
      deep: true,
    },

    // activeServiceType
    activeServiceType: {
      async handler(type) {
        if (this.getService.length) {
          if (type) {
            this.serviceList = [];
            const data = await this.getService(type.name);
            this.serviceList.push(data.data);
          } else {
            this.serviceList = [];
            this.serviceType.forEach(async (item) => {
              const data = await this.getService(item.name);
              this.serviceList.push(data.data);
            });
          }
        }
      },
      immediate: true,
    },
    serviceType: {
      async handler(types) {
        types.forEach(async (item) => {
          const data = await this.getService(item.name);
          this.serviceList.push(data.data);
        });
      },
      once: true,
      deep: true,
    },
    modal() {
      this.updateToggleModal();
    },
  },
  mounted() {
    this.getCourseTypes();
    this.getProductCategories();
    this.getServiceTypes();
  },
  methods: {
    itemCnt: function (action, item) {
      if (action === '+') {
        if(this.cart[item].count < 99)
          this.cart[item].count += 1
      } else {
        if (this.cart[item].count > 1)
          this.cart[item].count -= 1
      }


      this.FormData.product_id = this.cart
          .filter(value => value.type === 'product')
          .map(value => ({ id: value.id, count: value.count }));
      this.FormData.course_id = this.cart
          .filter(value => value.type === 'course')
          .map(value => ({ id: value.id, count: value.count }));
      this.FormData.services_id = this.cart
          .filter(value => value.type === 'service')
          .map(value => ({ id: value.id, count: value.count }));

    },
    simulateEnterKeyPress() {
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13, // Deprecated, but still widely used
        code: 'Enter',
        which: 13, // Deprecated, but still widely used
        bubbles: true
      });

      // Dispatch the event on the target element
      const inputElement = this.$refs.myInput; // Replace with your element reference
      if (inputElement) {
        inputElement.dispatchEvent(event);
      }
    },
    isBarcode() {
      const barcode = Number(this.searchActive);
      if (!isNaN(barcode) && this.searchActive.length === 13) {
        if (this.searchResult && Array.isArray(this.searchResult.products)) {
          const products = this.searchResult.products;

          // Example: Assign product info to a variable or do further processing
          let firstProduct = products[0];

          if (products.length > 1) {
            firstProduct = products.find(item => item.barcode === this.searchActive);
          }
          console.log('First product:', firstProduct);
          // You can use firstProduct to populate a variable or UI elements
          this.selectItem(firstProduct); // Example: store it in a data property
          this.searchActive = "";
        } else {
          console.error('Products array is missing or searchResult is not initialized.');
        }
      } else {
        console.log('Invalid barcode');
      }
    },
    deleteProduct(index) {
      this.cart.splice(index, 1);
    },
    getCourseTypes() {
      gets("http://fitness.abdurazzoq.beget.tech/public/api/courses_get_type")
          .then((response) => {
            this.courseTypes = response.data;
          })
          .catch((error) => {
            this.error = error;
            this.Delay("loading", .5);
          });
    },
    getCourses(id) {
      return gets(
          `http://fitness.abdurazzoq.beget.tech/public/api/courses/type/${id}`
      )
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            this.error = error;
            this.Delay("loading", .5);
          });
    },
    getProducts(id) {
      return gets(
          `http://fitness.abdurazzoq.beget.tech/public/product/category/${id}`
      )
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            this.error = error;
            this.Delay("loading", 1);
          });
    },
    getProductCategories() {
      gets("http://fitness.abdurazzoq.beget.tech/public/category")
          .then((response) => {
            this.productCategories = response.data;
          })
          .catch((error) => {
            this.error = error;
            this.Delay("loading", 1);
          });
    },
    getServiceTypes() {
      gets("http://fitness.abdurazzoq.beget.tech/public/api/services/name")
          .then((response) => {
            this.serviceType = response.data.data;
          })
          .catch((error) => {
            this.error = error;
            this.Delay("loading", 1);
          });
    },
    getService(id) {
      return gets(
          `http://fitness.abdurazzoq.beget.tech/public/api/services/find_by_name/${id}`
      )
          .then((response) => {
            // this.productList = response.data;
            return response.data;
          })
          .catch((error) => {
            this.error = error;
            this.Delay("loading", 1);
          });
    },
    toggleCourse(item) {
      this.activeCurseType = item;
    },
    toggleProduct(item) {
      this.activeProductCategory = item;
    },
    toggleService(item) {
      this.activeServiceType = item;
    },
    isActive(index, but) {
      return this[but].includes(index);
    },
    outputSearchTitle(key) {
      switch (key) {
        case "courses":
          return "Курсы";
        case "products":
          return "Продукты";
        case "services":
          return "Услуги";
        case "users":
          return "Пользователи";
        default:
          return key;
      }
    },
    selectItem(item) {
      console.log("item cart", item);
      if (item.type && item.type == "user") {
        this.currentUser = item;
        this.clearSearch();
      }
      if (item.type && item.type !== "user") {
        item.count = 1;
        if (item.type === "service") {
          item.price = item.price_visit;
          item.title = item.name;
        }
        item.price = item.price || item.price_one || 0;
        item.discount = item.discount || 0;
        item.price_discount = item.price - (item.price / 100) * item.discount;
        this.cart.push(item);

        switch (item.type){
          case "product":
            this.FormData.product_id = this.cart
                .filter(value => value.type === item.type)
                .map(value => ({ id: value.id, count: value.count }));
            break;
          case "course":
            this.FormData.course_id = this.cart
                .filter(value => value.type === item.type)
                .map(value => ({ id: value.id, count: value.count }));
            break;
          case "service":
            this.FormData.services_id = this.cart
                .filter(value => value.type === item.type)
                .map(value => ({ id: value.id, count: value.count }));
            break;
        }
      }
    },
    itemTotalPrice(count, price) {
      return count * price;
    },
    toggleModal(modalSelector) {
      this.modal = this.modal === "auto" ? "hidden" : "auto";
      this.modalSelector = modalSelector;
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
    async submitForm() {
      if(this.type==='cards'){
        this.FormData.cards_id = this.currentUser.cards[0].id;
        this.FormData.payment_type = "purchase";
      }else{
        this.FormData.cards_id = this.currentUser.cards[1].id;
        this.FormData.payment_type = "withdrawal_from_bonus";
      }
      this.FormData.payment = this.totalPrice.toFixed(2);

      let FormData = this.formData;

      try {
        const response = await posts(
            "http://fitness.abdurazzoq.beget.tech/public/transaction/create",
            this.FormData
        );
        if (response.status === 200) {
          console.log(200)
        } else {
          console.error(`Запрос завершился с ошибкой: ${response.status}`);
        }
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
      }


    },
    clearSearch() {
      this.searchActive = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.statistics-holder {
  margin: 0 -10px;
  margin-left: -24px !important;
}
.cash {
  .statistics {
    padding: 35px;
  }
  .statistics-title {
    font-size: 18px !important;
    padding-left: 15px;
    margin-bottom: 10px;
  }
}
button.active {
  background-color: #c3ff00;
  color: #333;
}

.scroll-container {
  overflow-x: auto; /* Включает горизонтальную прокрутку */
  white-space: nowrap; /* Запрещает перенос строк, чтобы все элементы были в одной строке */
  -ms-overflow-style: none; /* Скрывает скроллбар в IE и Edge */
  scrollbar-width: none; /* Скрывает скроллбар в Firefox */
}

.scroll-container::-webkit-scrollbar {
  display: none; /* Скрывает скроллбар в Chrome, Safari и Opera */
}

.scroll-content {
  display: inline-block;
}

.cart-modal-top {
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
  text-transform: uppercase;
  width: 100%;
  margin-bottom: 25px;
}
.cart-modal-top-title-2 {
  text-align: right;
  color: #d0fd3e;
}
.cart-text {
  font-size: 22px;
  line-height: 26px;
  padding-top: 30px;
}
.cart-text-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.cart-total {
  font-size: 24px;
  padding: 20px 0;
  span + span {
    color: #d0fd3e;
  }
}
.cart-container {
  height: calc(100% - 222px);
  margin-left: -15px !important;
  .users-block {
    position: relative;
  }
  .cart-buttons {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 30px;
  }
}
.uslugi-holder {
  min-height: 160px;
}
.delete-product {
  background: transparent;
  border: transparent;
}
.cart-list-holder {
  max-height: 525px;
  overflow-y: auto;
  scrollbar-width: thin; /* Устанавливает ширину скроллбара */
  scrollbar-color: #282829 #090909;
}

.cart-list-holder::-webkit-scrollbar {
  width: 10px;
}

.cart-list-holder::-webkit-scrollbar-track {
  background: #282829;
}

.cart-list-holder::-webkit-scrollbar-thumb {
  background: #090909;
  border-radius: 6px;
}
.cartTable th, .cartTable td{
  font-size: 16px;
}
.cartTable tr{
  height: 60px;
}
.counter{
  display: block;
  cursor: pointer;
  background: #D0FD3E;
  color: #000;
  font-weight: bolder;
  width: 20px !important;
  height: 20px !important;
  aspect-ratio: 1/1;
  border-radius: 50%;
  user-select: none;
}
.total{
  width: 100px;
}
.countInp{
  border-radius: 8px;
  padding: 4px 0 4px 10px !important;
  font-size: 14px;
}
input{
  outline: none;
}
.product-card{
  height: 140px !important;
}
.button-type-1{
  padding: 18px 25px;
  font-size: 18px;
  border-radius: 15px;
  min-width: auto;
}
.users-block.py-2 {
  padding-bottom: 20px !important;
}
</style>
