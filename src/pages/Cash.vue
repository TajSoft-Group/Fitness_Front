<template>
  <div
    @click="toggleModal('.clients-list')"
    class="base-modal clients-list d-none d-flex justify-content-center align-items-center"
  >
    <div @click.stop class="holder">
      <div class="base-modal-top">
        <div class="cart-modal-top">
          <div class="cart-modal-top-title">наличные<br />Бонусы</div>
          <div class="cart-modal-top-title-2">500 TJS<br />20</div>
        </div>
      </div>
      <div class="content">
        <form
          class="form"
          @submit.prevent="submitForm(), toggleModal('.clients-list')"
        >
          <label for="title">Оплата наличными</label>
          <input type="text" placeholder="Наличные" id="title" />
          <label for="title">Оплата бонусами</label>
          <input type="text" placeholder="Бонусы" id="title" />
          <div class="cart-text">
            <div class="cart-text-row">
              <span>Сумма без скидки</span>
              <span>333.00 TJS</span>
            </div>
            <div class="cart-text-row">
              <span>Сумма скидки</span>
              <span>0.00 TJS</span>
            </div>
            <div class="cart-text-row">
              <span>Оплата бонусами</span>
              <span></span>
            </div>
            <div class="cart-text-row">
              <span>Получение бонусов</span>
              <span></span>
            </div>
            <div class="cart-text-row cart-total">
              <span>ИТОГО</span>
              <span>={{ totalPrice }} TJS</span>
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
            <button class="submit" type="submit">Добавить</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="cash container">
    <div class="row">
      <div class="col position-relative">
        <div
          :class="{ 'search-input': searchActive.length > 0 }"
          class="d-flex justify-content-between align-items-center search-block"
        >
          <img src="@/assets/images/icons/search.png" alt="search" />
          <input
            v-model="searchActive"
            type="text"
            id="searchInput"
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
      <div class="row">
        <div class="col-7">
          <div class="row statistics-holder justify-content-between">
            <div class="col-7 statistics statistics-left mr-3 h-auto bg-gray">
              <div class="left d-flex align-items-center">
                <div
                  class="teacher-img img-width-60 border-2px border-color-yellow"
                >
                  <img v-if="currentUser" src="@/assets/images/avatar.jpg" />
                  <img v-else src="@/assets/images/avatar-user-empty.png" />
                </div>
                <div v-if="currentUser">
                  <div class="h5">
                    {{ currentUser.name }} {{ currentUser.surname }}
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>{{ currentUser.username }}</span>
                    <span>{{ currentUser.cards[0].balance }} TJS</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="color-yellow">{{
                      currentUser.cards[0].name
                    }}</span>
                    <span>20 баллов</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-5 statistics bg-gray h-auto">
              <div class="d-flex justify-content-between">
                <div>
                  <div class="fs-5">Цена:</div>
                  <div class="fs-5">Бонус:</div>
                  <div class="h5">Итого:</div>
                </div>
                <div class="ms-5 ps-5">
                  <div class="fs-5">333 c</div>
                  <div class="fs-5">20</div>
                  <div class="h5">{{ totalPrice }} c</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row cart-container">
            <div class="users-block p-4">
              <table id="dataTable">
                <thead>
                  <tr>
                    <th class="col-3 text-start">Название</th>
                    <th>Кол-во (шт)</th>
                    <th>Цена</th>
                    <th>Скидка</th>
                    <th>Итого</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cart" :key="item.id">
                    <td class="col-2 d-flex">
                      {{ index + 1 }}.
                      <div class="text-start ms-2">{{ item.name }}</div>
                    </td>
                    <td>
                      <input
                        class="bg-gray w-25 border-1px text-white"
                        type="number"
                        min="1"
                        max="99"
                        v-model="item.count"
                      />
                    </td>
                    <td>{{ item.price }} сом</td>
                    <td>-5%</td>
                    <td>
                      {{ itemTotalPrice(item.count, item.price) }} сом<br />
                    </td>
                  </tr>
                </tbody>
              </table>
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
        <div class="col-5 statistics bg-gray h-auto p-4">
          <h3 class="pt-3 statistics-title">ПРОДУКТЫ</h3>
          <div class="scroll-container">
            <div class="scroll-content">
              <div class="row">
                <div class="col product-catalog">
                  <button
                    class="mt-3 py-2 me-3"
                    :class="{
                      active: !activeProductCategory,
                    }"
                    @click="toggleProduct(null)"
                  >
                    Все
                  </button>
                  <button
                    class="mt-3 py-2 me-3"
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
                    @click="selectItem(item)"
                    class="product-card p-0 position-relative"
                  >
                    <img
                      :src="`http://fitness.abdurazzoq.beget.tech/public/${item.img[0]}`"
                    />
                    <div class="product-info">
                      <div class="product-title mb-2">{{ item.title }}</div>
                      <div class="product-price color-yellow d-flex">
                        {{ item.price_one }} TJS
                        <span class="product-old-price text-white"
                          ><s>{{ item.oldPrice }} c</s>
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
                <h3 class="pt-3 statistics-title">УСЛУГИ</h3>
                <div class="col product-catalog">
                  <button
                    class="mt-3 py-2 me-3"
                    :class="{
                      active: !activeServiceType,
                    }"
                    @click="toggleService(null)"
                  >
                    Все
                  </button>
                  <button
                    class="mt-3 py-2 me-3"
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
                >
                  <img
                    :src="`http://fitness.abdurazzoq.beget.tech/public/${item.img[0]}`"
                  />
                  <div class="product-info">
                    <div class="product-title mb-2 border-color-yellow">
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
                <h3 class="statistics-title">КУРСЫ</h3>
                <div v-if="courseTypes" class="col product-catalog">
                  <button
                    class="mt-3 py-2 me-3"
                    :class="{
                      active: !activeCurseType,
                    }"
                    @click="toggleCourse(null)"
                  >
                    Все
                  </button>
                  <button
                    class="mt-3 py-2 me-3"
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
                  @click="selectItem(item)"
                >
                  <img
                    :src="`http://fitness.abdurazzoq.beget.tech/public/${course.img}`"
                  />
                  <div class="product-info">
                    <div class="product-title mb-2 border-color-yellow">
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

export default {
  data() {
    return {
      searchActive: "",
      searchResult: null,
      currentUser: null,
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
      return this.cart.reduce((item, current) => item.price + current, 0);
    },
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
  methods: {
    getCourseTypes() {
      gets("http://fitness.abdurazzoq.beget.tech/public/api/courses_get_type ")
        .then((response) => {
          this.courseTypes = response.data;
        })
        .catch((error) => {
          this.error = error;
          this.Delay("loading", 1);
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
          this.Delay("loading", 1);
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
      if (item.type == "user") {
        this.currentUser = item;
      } else {
        item.count = 1;
        if (item.type === "service") {
          item.price = item.price_visit;
          item.title = item.name;
        }
        this.cart.push(item);
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
      let FormData = this.formData;
      FormData.img = this.imagesPost;
      FormData.coach_id = this.idTr;
      try {
        const response = await form_Data(
          "http://fitness.abdurazzoq.beget.tech/api/courses/create",
          FormData
        );
        if (response.status === 200) {
          this.addStatus = true;
          await this.getInfo(
            "http://fitness.abdurazzoq.beget.tech/public/api/coach/all",
            "DataUsers",
            1
          );
          await this.getInfo(
            "http://fitness.abdurazzoq.beget.tech/api/courses/all",
            "cursList",
            2
          );
          await this.getInfoUsers();
          this.Delay("addStatus", 7);
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
  mounted() {
    this.getCourseTypes();
    this.getProductCategories();
    this.getServiceTypes();
  },
};
</script>

<style lang="scss" scoped>
.statistics-holder {
  margin: 0 -10px;
}
.cash {
  .statistics {
    padding: 35px;
  }
  .statistics-title {
    font-size: 22px !important;
    padding-left: 15px;
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
</style>
