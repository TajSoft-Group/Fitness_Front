<template>
  <div @click="statusPicker = false" v-if="statusPicker"
    class="user-page-card cards-modal d-flex justify-content-center align-items-center">
    <div @click.stop class="content position-relative">
      <DataPicker @date-selected="filterTransactionsByDate" @close-picker="statusPicker = false" />
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-12 mb-5 d-flex justify-content-between align-items-end">
        <div :class="{ 'search-input': searchActive.length > 0 }"
          class="d-flex justify-content-between align-items-center search-block">
          <img src="@/assets/images/icons/search.png" alt="search" />
          <input v-model="searchActive" type="text" id="searchInput" placeholder="Поиск по всем параметрам" />
        </div>
        <div @click="statusPicker = !statusPicker"
          class="dpi filter-icon d-flex justify-content-center align-items-center">
          <img height="29" width="37" src="@/assets/images/icons/filter.png" alt="user">
        </div>
      </div>
    </div>
    <div class="row" v-if="Object.keys(searchFilteredTransactions).length">
      <template v-for="(transaction, index) in searchFilteredTransactions" :key="index">
        <div class="col-md-12">
          <h3 class="mt-3 fw-bolder">{{ index }}</h3>
        </div>

        <div class="col-md-5 mb-3" v-for="(userTransactions, idx) in transaction" :key="idx">
          <div class="cardUser p-3 d-flex align-items-center"
            :class="{ 'bottomBorders': selectedUser === userTransactions.user.username && selectedDate === index }"
            @click="toggleUserTransactions(userTransactions.user.username, index)">
            <div class="col-md-3">
              <img src="@/assets/images/avatar-user-empty.png" alt="User Avatar">
            </div>
            <div class="col-md-8 pe-2">
              <p class="m-0 fw-bold">{{ userTransactions.user.name + ' ' + userTransactions.user.surname }}</p>
              <p class="m-0 d-flex justify-content-between w-100">
                <span>{{ userTransactions.user.username }}</span>
                <span>{{ userTransactions.user.cards[0] ? userTransactions.user.cards[0].balance : '0' }} TJS</span>
              </p>
              <p class="m-0 d-flex justify-content-between w-100">
                <span class="color-yellow">Карта</span>
                <span>{{ userTransactions.user.cards[1] ? userTransactions.user.cards[1].balance : '0' }} баллов</span>
              </p>
            </div>
            <div class="col-md-1 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="22" viewBox="0 0 14 22" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M0.913144 21.488C0.271946 20.8773 0.271946 19.8872 0.913145 19.2765L9.60351 11L0.913149 2.72347C0.271951 2.11281 0.271951 1.12272 0.913149 0.512059C1.55435 -0.0986072 2.59394 -0.0986071 3.23514 0.512059L13.0865 9.8943C13.7277 10.505 13.7277 11.495 13.0865 12.1057L3.23513 21.488C2.59393 22.0986 1.55434 22.0986 0.913144 21.488Z"
                  fill="#D0FD3E" />
              </svg>
            </div>
          </div>


          <div class="col-md-12" v-if="selectedUser === userTransactions.user.username && selectedDate === index">
            <div class="cardUser p-4 borderCorrection">
              <table class="w-100 mb-3">
                <thead>
                  <tr>
                    <th colspan="2">Название</th>
                    <th>Тип</th>
                    <th>Цена</th>
                    <th>Кол-во</th>
                    <th>Оплата</th>
                    <th>Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in userTransactions.items" :key="item.id">
                    <td colspan="2">{{ item.title == "Пополнение баланса" ? "Пополнение" : item.title }}</td>
                    <td>
                      {{
                        item.type === 'service'
                          ? 'Услуга'
                          : item.type === 'product'
                            ? 'Продукт'
                            : item.type === 'course'
                              ? 'Курс'
                              : ''
                      }}
                    </td>
                    <td>{{ Number(item.price).toFixed(2) }}</td>
                    <td>{{ item.count }}</td>
                    <td>
                      {{
                        item.bank_name === ''
                          ? 'Наличные'
                          : item.bank_name
                      }}
                    </td>
                    <td>{{ Number(item.total_price).toFixed(2) }}</td>
                  </tr>

                  <tr v-for="item in userTransactions.duty_items" :key="item.id" class="text-danger">
                    <td colspan="2">{{ item.title }}</td>
                    <td>{{
                      item.type === 'service'
                        ? 'Услуга'
                        : item.type === 'product'
                          ? 'Продукт'
                          : item.type === 'course'
                            ? 'Курс'
                            : ''
                    }}</td>
                    <td>{{ Number(item.price).toFixed(2) }}</td>
                    <td>{{ item.count }}</td>
                    <td>В долг</td>
                    <td>{{ Number(item.total_price).toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>


              <div class="w-100">
                <div class="d-flex justify-content-between">
                  <span class="fw-bold">ИТОГО</span>
                  <span class="fw-bold">
                    <span class="color-yellow">
                      {{
                        Number(
                          userTransactions.summary.total_amount
                        ).toFixed(2)
                      }}
                    </span>
                    TJS
                  </span>
                </div>

                <div v-if="userTransactions.summary.duty.total_amount > 0" class="d-flex justify-content-between">
                  <span class="fw-bold color-yellow">Задолженность</span>
                  <span class="fw-bold color-yellow">
                    {{
                      Number(
                        userTransactions.summary.duty.total_amount
                      ).toFixed(2)
                    }}
                    TJS
                  </span>
                </div>

                <div class="d-flex justify-content-between">
                  <span class="fw-bold">Транзакции</span>
                  <span class="fw-bold">
                    <span class="color-yellow">
                      {{ userTransactions.summary.total_transactions }}
                    </span>
                    раз(а)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-4">
      </template>

    </div>
    <div class="row" v-else>
      <h3 class="text-center color-yellow my-5 py-5">Транзакций пока нету...</h3>
    </div>
  </div>

  <div v-if="isLoading" class="overlay w-100 h-100 position-fixed top-0 start-0 z-3"
    style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="position-fixed top-50 start-50 translate-middle z-3 text-center">
      <div class="spinner-border text-warning" role="status">
        <span class="sr-only"></span>
      </div>
      <div class="mt-2 text-light text-center">Идет загрузка...</div>
    </div>
  </div>
</template>

<script>
import gets from "@/components/axios/get.js";
import Cookies from "js-cookie";
import DataPicker from "@/pages/transactions/DataPicker.vue";
export default {
  components: { DataPicker },
  data() {
    return {
      dates: {
        dateFrom: '',
        dateTo: '',
      },
      transactions: [],
      filteredTransactions: [],
      isLoading: true,
      statusPicker: false,
      selectedUser: null,
      selectedDate: null,
      searchActive: "",
    };
  },
  methods: {
    filterTransactionsByDate(selectedDates) {
      const from = new Date(selectedDates.dateFrom);
      const to = new Date(selectedDates.dateTo);

      this.filteredTransactions = Object.keys(this.transactions)
        .filter(date => !isNaN(new Date(date)))
        .reduce((acc, date) => {
          const d = new Date(date);
          if (d >= from && d <= to) acc[date] = this.transactions[date];
          return acc;
        }, {});

      this.statusPicker = false;
    },
    toggleUserTransactions(username, date) {
      if (this.selectedUser === username && this.selectedDate === date) {
        this.selectedUser = null;
        this.selectedDate = null; // Deselect if the same user and date are clicked again
      } else {
        this.selectedUser = username; // Set selectedUser to the clicked user's username
        this.selectedDate = date; // Set selectedDate to the clicked date
      }
    },
    loadData() {
      const token = Cookies.get("token");

      gets('https://missfitnessbackend.tajsoft.tj/api/transactions', token)
        .then((response) => {
          const normalized = {};

          Object.keys(response.data).forEach(date => {
            if (!date) return;

            normalized[date] = Object.values(response.data[date]).map(userTx => {
              return {
                ...userTx,
                items: Object.values(userTx.items) // ✅ object → array
              };
            });
          });

          this.isLoading = false;
          this.transactions = normalized;
          this.filteredTransactions = normalized;
        });
    },
  },
  computed: {
    searchFilteredTransactions() {
      if (!this.searchActive.trim()) {
        return this.filteredTransactions
      }

      const query = this.searchActive.toLowerCase()
      const result = {}

      Object.entries(this.filteredTransactions).forEach(([date, users]) => {
        const filteredUsers = users.filter(userTx => {
          const user = userTx.user || {}

          return [
            user.name,
            user.surname,
            user.username,
            user.phone_number
          ]
            .filter(Boolean)
            .some(field =>
              field.toString().toLowerCase().includes(query)
            )
        })

        if (filteredUsers.length) {
          result[date] = filteredUsers
        }
      })

      return result
    }
  },
  mounted() {
    this.loadData()
  },
}
</script>

<style scoped lang="scss">
.cardUser {
  background: #1b1b1c;
  border-radius: 20px;
}

.cardUser .imgUser {
  height: 50px;
}

.borderCorrection {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bottomBorders {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

tr {
  border-bottom: 1px solid #747474;
}

td,
th {
  padding: 10px 0;
  font-size: 14px;
}
</style>