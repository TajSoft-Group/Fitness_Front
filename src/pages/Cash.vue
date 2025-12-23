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

  <div @click="toggleModal('.clients-list')"
    class="base-modal clients-list d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="holder">
      <div class="base-modal-top">
        <div class="cart-modal-top">
          <div class="cart-modal-top-title">наличные<br />Бонусы</div>
          <div class="cart-modal-top-title-2">{{ currentUser.cards[0].balance }} TJS<br /> {{
            currentUser.cards[1].balance }}</div>
        </div>
      </div>
      <div class="content">
        <form class="form" @submit.prevent="submitForm()">
          <div class="d-flex justify-content-around">
            <div class="form-recipients">
              <input autocomplete="off" class="form-check-input" type="radio" id="cash" name="type" value="cash"
                v-model="type">
              <label for="cash" class="text-white">Наличными</label>
            </div>
            <div class="form-recipients">
              <input autocomplete="off" class="form-check-input" type="radio" id="card" name="type" value="card"
                v-model="type">
              <label for="card" class="text-white">Картой</label>
            </div>
            <div class="form-recipients">
              <input autocomplete="off" class="form-check-input" type="radio" id="bonus" name="type" value="bonus"
                v-model="type">
              <label for="bonus" class="text-white">Бонусами</label>
            </div>
          </div>
          <div v-if="type === 'cash'">
            <label for="title">Оплата наличными</label>
            <input type="text" placeholder="Наличные" id="title" v-model="payment" required />
          </div>
          <div v-show="type === 'bonus' || type === 'card'">
            <label class="mx-0 mt-3" v-if="currentUser.cards[0].balance >= totalPrice">С вашего счёта будет снято {{
              totalPrice.toFixed(2) }} <span v-show="type === 'bonus'">баллов</span> <span
                v-show="type === 'card'">TJS</span></label>
            <label class="mx-0 mt-3" v-else-if="type === 'bonus' && currentUser.cards[1].balance >= totalPrice">С вашего
              счёта будет снято {{ totalPrice.toFixed(2) }} <span v-show="type === 'bonus'">баллов</span> <span
                v-show="type === 'card'">TJS</span></label>
            <label class="mx-0 mt-3 text-danger" v-else>У вас недостаточно средств для совершения покупки</label>
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
              <span v-show="type !== 'bonus'"> {{ (totalPrice.toFixed(2) * currentUser.cards[1].percent) / 100 }}
                GymКоинов</span>
              <span v-show="type === 'bonus'" class="text-danger h6 my-0">начисление бонусов недоступно!</span>
            </div>
            <div class="cart-text-row cart-total pb-0">
              <span>ИТОГО</span>
              <span>={{ totalPrice.toFixed(2) }} TJS</span>
            </div>
            <div class="cart-text-row" v-show="type === 'cash'">
              <span>Сдача</span>
              <span>={{ payment > 0 ? payment - totalPrice.toFixed(2) : "0" }} TJS</span>
            </div>
          </div>
          <div class="d-flex justify-content-between add-user-buttons">
            <button @click="toggleModal('.clients-list')" class="dont" type="button">
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
        <div :class="{ 'search-input': searchActive.length > 0 }"
          class="d-flex justify-content-between align-items-center search-block mt-4">
          <img src="@/assets/images/icons/search.png" alt="search" />
          <input v-model="searchActive" @keyup.enter="searchDo(searchActive)" type="text" id="searchInput"
            autocomplete="off" ref="myInput" placeholder="Поиск по номеру телефона" />
          <button v-if="searchActive.length > 0" class="button-close" @click="clearSearch"></button>
        </div>
        <div class="col">
          <div v-if="searchActive" class="users-block bg-gray search-result-block">
            <div>
              <div v-for="(searchItem, key) in searchResult" :key="key" class="search-result-row">
                <div class="search-result-row__title">
                  <h2>{{ outputSearchTitle(key) }}</h2>
                  <h2 class="search-result-row__count">
                    Найдено: {{ searchItem.length }}
                  </h2>
                </div>
                <div v-for="item in searchItem" :key="item.id" @click="selectItem(item)"
                  class="search-result-row__item">
                  <span v-if="key === 'users'">{{ item.name }} {{ item.surname }}</span>
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
                <div class="teacher-img img-width-60 border-2px border-color-yellow">
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
                    <span v-if="
                      currentUser.cards.length &&
                      currentUser.cards[0].balance
                    ">{{ currentUser.cards[0].balance }} TJS</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span v-if="
                      currentUser.cards.length && currentUser.cards[0].name
                    " class="color-yellow">{{ currentUser.cards[0].name }}</span>
                    <span>{{ currentUser.cards[1].balance }} баллов</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5 px-0">
            <div class="d-flex justify-content-between statistics bg-gray h-auto mt-3">
              <div>
                <div class="fs-6">Цена (от):</div>
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
                    <th>Цена (от)</th>
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
                        <a @click="itemCnt('-', index)"
                          class="counter d-flex align-items-center justify-content-center">-</a>
                        <input class="bg-gray border-1px text-white mx-1 countInp" type="number" min="1" max="99"
                          v-model="item.count" />
                        <a @click="itemCnt('+', index)"
                          class="counter d-flex align-items-center justify-content-center">+</a>
                      </div>
                    </td>
                    <td>{{ item.price }} сом</td>
                    <td>- {{ item.discount }} %</td>
                    <td>
                      <span v-if="item.type === 'product'">
                        {{ calculateFifoPrice(
                          item.history_count,
                          item.count,
                        item.count_on_stock
                        ).toFixed(2) }} сом
                      </span>

                      <span v-else>
                        {{ ((item.discount_price != undefined  ? item.discount_price : item.price) * (item.count || 1)).toFixed(2) }} сом
                      </span>
                    </td>

                    <td>
                      <button @click="deleteProduct(index)" class="delete-product">
                        <img src="@/assets/images/icons/close-icon.png" alt="close" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-between cart-buttons">
              <button class="button-type-1 ms-5">Отмена</button>
              <button class="button-type-1 bg-yellow me-5" @click="toggleModal('.clients-list')">
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
                  <button class="py-2 me-3" :class="{
                    active: !activeProductCategory,
                  }" @click="toggleProduct(null)">
                    Все
                  </button>
                  <button class="py-2 me-3" v-for="(item, index) in productCategories" :key="index" :class="{
                    active: activeProductCategory?.id === item.id,
                  }" @click="toggleProduct(item)">
                    {{ item.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="scroll-container">
            <div class="scroll-content">
              <div class="row">
                <div class="row flex-nowrap">
                  <div v-for="item in productList" @click="selectItem(item);"
                    class="product-card p-0 position-relative">
                    <img :src="`https://api.mubingym.com/${item.img[0]}`" />
                    <div class="product-info">
                      <div class="product-title mb-0">{{ item.title }}</div>
                      <div class="product-price color-yellow d-flex">
                        {{ (item.price_one - (item.price_one * item.discount) / 100) }} TJS
                        <span class="product-old-price text-white" v-if="item.discount != 0"><s>{{ item.price_one }}
                            c</s>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 class="pt-3 statistics-title">УСЛУГИ</h4>
          <div class="scroll-container">
            <div class="scroll-content">
              <div class="row">
                <div class="col product-catalog">
                  <button class="py-2 me-3" :class="{
                    active: !activeServiceType,
                  }" @click="toggleService(null)">
                    Все
                  </button>
                  <button class="py-2 me-3" v-show="serviceList" v-for="(item, index) in serviceType" :key="index"
                    :class="{
                      active: activeServiceType?.name === item.name,
                    }" @click="toggleService(item)">
                    {{ item.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="scroll-container">
            <div class="scroll-content">
              <div class="row flex-nowrap uslugi-holder">
                <div v-for="item in serviceList" class="uslug-card p-0 position-relative" @click="selectItem(item)">
                  <img :src="`https://api.mubingym.com/${item?.img?.[0] ? item.img[0] : ''}`" />
                  <div class="product-info">
                    <div class="product-title mb-0 border-color-yellow">
                      {{ item.name }}
                    </div>
                    <div class="product-price color-yellow d-flex">
                      {{ item.price }} TJS
                      <span class="product-old-price text-white">/ 1 посещение
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 class="statistics-title">КУРСЫ</h4>

          <div class="scroll-container">
            <div class="scroll-content">
              <div class="row">
                <div class="col product-catalog">
                  <button class="py-2 me-3" :class="{
                    active: !activeCurseType,
                  }" @click="toggleCourse(null)">
                    Все
                  </button>
                  <button class="py-2 me-3" v-show="courseTypes" v-for="(item, index) in courseTypes" :key="index"
                    :class="{
                      active: activeCurseType?.name === item.name,
                    }" @click="toggleCourse(item)">
                    {{ item.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="scroll-container">
            <div class="scroll-content">
              <div v-if="coursesList.length" class="row flex-nowrap">
                <div v-for="course in coursesList" class="uslug-card p-0 position-relative" @click="selectItem(course)">
                  <img :src="`https://api.mubingym.com/${course.img}`" />
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

<script>
import posts from "@/components/axios/posts.js";
import gets from "@/components/axios/get.js";
import product from "@/pages/products/product.vue";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      isLoading: false,
      loadingText: "Идет загрузка...",
      toastMessage: 'Транзакция успешно проведена',
      toaster: false,
      error: false,
      searchActive: "",
      searchResult: null,
      // type: 'cash','card','bonus',
      success: false,
      type: 'cash',
      payment: "",
      FormData: {
        cards_id: "",
        items: [],
        payment: 0,
        payment_type: "cash",
        create_add: new Date()
      },
      currentUser: {
        id: null,
        name: 'Имя',
        surname: 'Фамилия',
        username: 'Телефон',
        cards: [
          {
            id: "",
            balance: '0',
            name: "Карта"
          },
          {
            id: "",
            balance: '0',
            name: "Бонус",
            percent: 0,
          }
        ],
      },
      cart: [],
      modal: "auto",
      modalSelector: "",
      courseTypes: [],
      activeCurseType: null,
      coursesList: [],
      courses: [],
      productCategories: [],
      activeProductCategory: null,
      productList: [],
      products: [],
      serviceType: [],
      activeServiceType: null,
      serviceList: [],
      services: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => {
        // 🔥 ТОВАРЫ — FIFO
        if (item.type === 'product' && item.history_count?.length) {
          return total + this.calculateFifoPrice(
            item.history_count,
            item.count,            // сколько покупают
            item.count_on_stock    // сколько реально на складе
          );
        }

        // 🔹 услуги / курсы
        return total + (Number(item.price_discount) * (item.count || 1));
      }, 0);
    },
    totalWithoutDiscount() {
      return this.cart.reduce((total, item) => {
        // 🔥 ТОВАРЫ — FIFO (без скидки, т.к. скидки у партий нет)
        if (item.type === 'product' && item.history_count?.length) {
          return total + this.calculateFifoPrice(
            item.history_count,
            item.count,
            item.count_on_stock
          );
        }

        // 🔹 услуги / курсы
        return total + (Number(item.price) * (item.count || 1));
      }, 0);
    }
  },
  watch: {
    // whenever question changes, this function will run
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

    // activeServiceType
    activeServiceType: {
      async handler(type) {
        this.serviceList = []; // Clear the service list initially
        if (type) {
          // Find service by type name
          const foundService = this.getService(type.name);
          if (foundService) {
            this.serviceList.push(foundService);
          }
        } else {
          // Show all services if no specific type is selected
          const allServices = this.getService();
          this.serviceList = allServices;
        }
      },
      immediate: true,
    },

    modal() {
      this.updateToggleModal();
    },
  },
  mounted() {
    this.doAll();
  },
  methods: {
    doAll() {
      this.isLoading = true;
      try {
        Promise.all([
          this.loadService(),
          this.loadCourses(),
          this.loadProducts(),
          this.getCourseTypes(),
          this.getProductCategories(),
          this.getServiceTypes(),
        ]).then((responses) => {
          if (!this.error) {
            this.Delay('isLoading', 1)
          }
        }).catch((error) => {
          console.error("Ошибка при загрузке данных:", error);
        });

      } catch (e) {
        this.error = e.message;
      }

    },
    searchDo(queryString) {
      const barcode = Number(queryString);
      if (!isNaN(barcode) && (queryString).length === 13) {
        this.isBarcode(barcode)
      } else {
        posts("https://api.mubingym.com/search_all", {
          name: queryString,
        })
          .then((response) => {
            if (response && response.data) {
              this.searchResult = response.data;
            }
          })
          .catch((error) => {
            this.error = error;
            this.Delay("loading", 1);
          });
      }
    },
    Delay(target, t) {
      setTimeout(() => {
        this[target] = false
      }, t * 1000)
    },
    itemCnt(action, index) {
      const item = this.cart[index];

      if (action === '+') {
        if (item.type === 'product' && item.count >= item.count_on_stock) {
          return; // нельзя больше, чем есть на складе
        }
        item.count += 1;
      } else {
        if (item.count > 1) {
          item.count -= 1;
        }
      }
    },
    isBarcode(barcode) {
      const foundProduct = this.products.find(
        item => String(item.barcode) === String(barcode)
      );

      if (foundProduct) {
        this.selectItem(foundProduct);
      } else {
        this.success = false;
        this.toastMessage = 'Товар по штрихкоду не найден';
        this.toaster = true;
        this.Delay("toaster", 2);
      }

      this.searchActive = "";
    },
    deleteProduct(index) {
      this.cart.splice(index, 1);
    },
    getCourseTypes() {
      gets("https://api.mubingym.com/api/courses_get_type")
        .then((response) => {
          this.courseTypes = response.data;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    getCourses(id) {
      return this.courses.filter((val) => {
        return val.findType === id;
      })
    },
    loadCourses() {
      return gets(
        `https://api.mubingym.com/api/courses/all`
      )
        .then((response) => {
          this.courses = response.data;
          this.courses.forEach((value) => { value.findType = value.type; value.type = 'course'; })
          this.coursesList = this.courses;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    getProducts(id) {
      return this.products.filter((value) => {
        return value.category === id;
      })
    },
    loadProducts() {
      return gets(`https://api.mubingym.com/product/all/cash`)
        .then((response) => {
          this.products = response.data.map(product => {
            const basePrice = this.resolveProductPrice(product);
            const discount = parseFloat(product.discount || 0);

            return {
              ...product,
              type: 'product',
              price: basePrice,
              price_discount: basePrice - (basePrice * discount) / 100
            };
          });

          this.productList = this.products;
        });
    },
    resolveProductPrice(product) {
      if (
        Array.isArray(product.history_count) &&
        product.history_count.length > 0
      ) {
        // FIFO — продаём по самой старой цене
        return parseFloat(product.history_count[0].price);
      }

      // fallback если истории нет
      return parseFloat(product.price_one || 0);
    },
    calculateFifoPrice(history, sellCount, stockCount) {
      const normalizedHistory = this.normalizeHistory(history, stockCount);

      let remaining = sellCount;
      let total = 0;

      for (const batch of normalizedHistory) {
        if (remaining <= 0) break;

        const used = Math.min(batch.count, remaining);
        total += used * Number(batch.price);
        remaining -= used;
      }

      return total;
    },
    getProductCategories() {
      gets("https://api.mubingym.com/category")
        .then((response) => {
          this.productCategories = response.data;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    getServiceTypes() {
      gets("https://api.mubingym.com/api/services/name")
        .then((response) => {
          this.serviceType = response.data.data;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    getService(name = null) {
      if (name === null) {
        return this.services;
      } else {
        return this.services.find(service => { console.log('services.name', service.name); console.log('setted name', name); return service.name === name });
      }
    },
    normalizeHistory(history, stockCount = 0) {
      let historySum = history.reduce((s, h) => s + Number(h.count), 0);
      let toRemove = historySum - stockCount;

      if (toRemove <= 0) {
        return history.map(h => ({ ...h }));
      }

      const normalized = history.map(h => ({ ...h }));

      for (const batch of normalized) {
        if (toRemove <= 0) break;

        const diff = Math.min(batch.count, toRemove);
        batch.count -= diff;
        toRemove -= diff;
      }

      return normalized.filter(b => b.count > 0);
    },
    loadService() {
      return gets(`https://api.mubingym.com/api/services/all`)
        .then((response) => {
          if (response && response.data && response.data.data) {
            this.services = response.data.data;
            this.services.forEach((service) => {
              service.type = 'service';
            });
            this.serviceList = this.services;
          } else {
            console.error('Unexpected response structure:', response);
            this.error = 'Failed to load services. Please try again later.';
          }
        })
        .catch((error) => {
          console.error('API request failed:', error);
          this.error = 'Failed to load services. Please try again later.';
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
      // выбор пользователя
      if (item.type === "user") {
        this.currentUser = item;
        this.clearSearch();
        return;
      }

      // товары / услуги / курсы
      if (item.type !== "user") {
        const index = this.cart.findIndex(
          v => v.id === item.id && v.type === item.type
        );

        if (index === -1) {
          this.cart.push({
            ...item,
            count: 1,

            // 🔥 фиксируем остаток на складе в момент добавления
            count_on_stock: item.count ?? 0
          });
        } else {
          this.itemCnt('+', index);
        }
      }

    },
    itemTotalPrice(count, price) {
      return parseFloat(count) * parseFloat(price);
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
      // базовая структура
      this.FormData = {
        products: [],
        services: [],
        courses: [],
        payment: parseFloat(this.payment).toFixed(2),
        payment_type: "cash",
        user_id: this.currentUser.id,
        create_add: new Date()
      };

      if (this.FormData.payment < this.totalPrice && this.type == 'cash') {
        this.success = false;
        this.toaster = true;
        this.toastMessage = 'Сумма оплаты меньше суммы заказа';
        this.Delay("toaster", 2);

        return;
      }


      if (this.type != 'cash' && this.FormData.user_id == null) {
        this.success = false;
        this.toaster = true;
        this.toastMessage = 'Выберите пользователя чтобы оплатить картой/баллами';
        this.Delay("toaster", 2);

        return;
      }

      delete this.FormData.payment

      // тип оплаты
      if (this.type === "card") {
        this.FormData.cards_id = this.currentUser.cards[0].id;
        if (this.currentUser.cards[0].balance < this.totalPrice) {
          this.success = false;
          this.toaster = true;
          this.toastMessage = 'Недостаточно средств на карте!';
          this.Delay("toaster", 2);

          return;
        }
        // this.FormData.payment = this.totalPrice.toFixed(2)

        this.FormData.payment_type = "purchase";
      }

      if (this.type === "bonus") {
        this.FormData.cards_id = this.currentUser.cards[1].id;
        this.FormData.payment_type = "withdrawal_from_bonus";
        if (this.currentUser.cards[1].balance < this.totalPrice) {
          this.success = false;
          this.toaster = true;
          this.toastMessage = 'Недостаточно средств на карте!';
          this.Delay("toaster", 2);

          return;
        }
      }

      if (this.cart.length === 0) {
        this.success = false;
        this.toaster = true;
        this.toastMessage = 'Корзина пуста!';
        this.Delay("toaster", 2);

        return;
      }

      this.loadingText = "Оплата заказа..."
      this.isLoading = true;

      // разбрасываем корзину по категориям
      this.cart.forEach(item => {
        if (item.type === "product") {
          this.FormData.products.push({
            product_id: item.id,
            count: item.count || 1
          });
        } else if (item.type === "service") {
          this.FormData.services.push({
            service_id: item.id,
            // count: (item.count || 1) * (item.visit_count || 1) // если у услуг есть visit_count
            count: (item.count || 1) // если у услуг есть visit_count
          });
        } else if (item.type === "course") {
          this.FormData.courses.push({
            course_id: item.id,
            count: item.count || 1
          });
        }
      });

      console.log("Отправляем FormData:", this.FormData);

      try {
        const response = await posts(
          "https://api.mubingym.com/api/order/create/v2",
          this.FormData
        );

        if (response.status === 200) {
          this.success = true;
          this.toaster = true;
          this.toastMessage = 'Транзакция успешно проведена';
          this.Delay("toaster", 2);
          this.payment = 0;
          this.toggleModal('.clients-list');
          // сброс
          this.FormData = {
            products: [],
            services: [],
            courses: [],
            payment: 0,
            payment_type: "cash",
            user_id: this.currentUser.id,
            create_add: new Date()
          };
          this.cart = [];
          this.currentUser = {
            id: null,
            name: 'Имя',
            surname: 'Фамилия',
            username: 'Телефон',
            cards: [
              {
                id: "",
                balance: '0',
                name: "Карта"
              },
              {
                id: "",
                balance: '0',
                name: "Бонус",
                percent: 0,
              }
            ],
          }
        } else {
          console.error(`Запрос завершился с ошибкой: ${response.status}`);
        }
        this.loadingText = "Идет загрузка..."
        this.isLoading = false
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
      }
      ;
    },
    clearSearch() {
      this.searchActive = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.base-modal {
  z-index: 1 !important;
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
  overflow-x: auto;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
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

  span+span {
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
  scrollbar-width: thin;
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

.cartTable th,
.cartTable td {
  font-size: 16px;
}

.cartTable tr {
  height: 60px;
}

.counter {
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

.total {
  width: 100px;
}

.countInp {
  width: 28%;
  border-radius: 8px;
  padding: 4px 0 4px 10px !important;
  font-size: 14px;
}

input {
  outline: none;
}

.product-card {
  height: 140px !important;
}

.button-type-1 {
  padding: 18px 25px;
  font-size: 18px;
  border-radius: 15px;
  min-width: auto;
}

.users-block.py-2 {
  padding-bottom: 20px !important;
}

.delete-product img {
  width: 10px;
}
</style>