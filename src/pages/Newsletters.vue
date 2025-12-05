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


  <div class="container">
    <div class="row position-relative">
      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title"><router-link to="/"><img class="px-3 pb-2"
                src="@/assets/images/icons/Stroke.png">Рассылки</router-link></div>
          <div class="user-add-btn d-flex justify-content-center  align-items-center">
            <div class="position-relative">
              <button @click="addCardHoliday = true" class="add-user-btn ">Добавить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div v-if="addCardHoliday" class="add-user-modal d-flex justify-content-center align-items-center ">
    <div @click.stop class="content">
      <div class="title">Рассылка</div>
      <!-- <div class="form">
        <label for="name">Название рассылки*</label>
        <input type="text" placeholder="Введите название рассылки" id="name">
      </div> -->
      <!-- <div class="form position-relative">
        <label  for="surname">Заголовок**</label>
        <input ref="inputText" type="text" placeholder="Введите заголовок" id="heading">
        <div  @click="presentName('inputText')"  class=" label-name position-absolute">имя</div>
      </div> -->
      <div class="form position-relative">
        <label for="phone">Описание*</label>
        <textarea v-model="letter.message" type="text" placeholder="Введите текст" class="description pt-2"></textarea>
        <div @click="presentName('descriptionTextarea')" class="label-name position-absolute">имя</div>
      </div>
      <hr>

      <div class="menu-type-2 d-flex justify-content-between mt-3 px-3">
        <div class="form-recipients">
          <input type="radio" id="all" v-model="letter.gender" value="0" name="gender">
          <label for="all">Все</label>
        </div>
        <div class="form-recipients">
          <input type="radio" id="man" v-model="letter.gender" value="1" name="gender">
          <label for="man">Мужчина</label>
        </div>
        <div class="form-recipients">
          <input type="radio" id="woman" v-model="letter.gender" value="2" name="gender">
          <label for="woman">Женщина</label>
        </div>
      </div>
      <hr>
      <div class="menu-type-2 d-flex justify-content-around mt-4">
        <div class="form-recipients">
          <input type="radio" id="push" v-model="push" value="1" name="push">
          <label for="push">Push</label>
        </div>
        <div class="form-recipients">
          <input type="radio" id="sms" v-model="sms" value="1" name="sms">
          <label for="sms">СМС</label>
        </div>
      </div>
      <!-- <div class="form position-relative">
        <label for="name">Подарок*</label>
        <input  type="text" :value="picked"   id="present">
        <img @click="presentMenu=!presentMenu" :class="{'rotate-90':presentMenu}" class="row-right-icon" src="@/assets/images/icons/row-right.png">
        <div :class="{'d-block':presentMenu}" class="menu-type-1 pt-4 px-4 ">
          <h1 >Услуги</h1>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="yoga" value="Йога" v-model="picked" />
            <label class="text-white" for="yoga">Йога</label>
          </div>
          <hr>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="solarium" value="Солярий" v-model="picked" />
            <label class="text-white" for="solarium">Солярий</label>
          </div>
          <hr>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="dancing" value="Танцы" v-model="picked" />
            <label class="text-white" for="dancing">Танцы</label>
          </div>
          <hr>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="massage" value="Массаж" v-model="picked" />
            <label class="text-white" for="massage">Массаж</label>
          </div>
          <hr>
          <h1>Курсы</h1>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="individual-course" value="Курс индивидуальный" v-model="picked" />
            <label class="text-white" for="individual-course">Курс индивидуальный</label>
          </div>
          <hr>
          <div class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="group-course" value="Курс групповой" v-model="picked" />
            <label class="text-white" for="group-course">Курс групповой</label>
          </div>
          <hr>
        </div>
      </div>
      <div class="menu-type-2 d-flex justify-content-between mt-3">
          <div class="form-recipients">
            <input type="radio" id="all" name="recipients">
            <label for="all">Все</label>
          </div>
          <div class="form-recipients">
            <input type="radio" id="man" name="recipients">
            <label for="man">Мужчина</label>
          </div>
          <div class="form-recipients">
            <input type="radio" id="woman" name="recipients">
            <label for="woman">Женщина</label>
          </div>
      </div> -->
      <!-- <div class="d-flex justify-content-between mt-3 text-center">
       <div @click="statusPicker=true" class="form col-5 position-relative">
         <label  for="surname">Дата публикации*</label>
         <input type="text"  id="heading">
       </div>
       <div @click="statusPicker=true" class="form col-5 position-relative">
         <label  for="surname">Дата окончания*</label>
         <input type="text"  id="heading">
       </div>
     </div> -->
      <div class="d-flex justify-content-between add-user-buttons">
        <button @click="addCardHoliday = false" class="dont">Отмена</button>
        <button class="submit" type="button" @click="submitLetter()">Добавить</button>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card rounded-5 mt-4 p-5"  data-bs-theme="dark">
          <table class="mail-table">
            <thead>
              <tr>
                <th>Название</th>
                <th>Дата</th>
                <th class="text-center">Каналы</th>
                <th class="text-center">Получатели</th>
                <th class="text-center">Действия</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(letter, index) in paginatedLetters" :key="index">
                <!-- Текст -->
                <td>
                  <span v-if="!letter.showFull">
                    {{ shortText(letter.message) }}
                    <span v-if="letter.message.length > maxLength">...</span>
                  </span>

                  <span v-else>
                    {{ letter.message }}
                  </span>

                  <button v-if="letter.message.length > maxLength" @click="letter.showFull = !letter.showFull"
                    class="badge bg-yellow border-0 ms-2" style="font-size: 12px;">
                    {{ letter.showFull ? 'скрыть' : 'ещё' }}
                  </button>
                </td>

                <!-- Дата -->
                <td class="small">
                  {{ letter.created_at }}
                </td>

                <!-- Каналы -->
                <td class="text-center">
                  <img v-if="letter.type == 0" src="@/assets/images/icons/push.png" class="icon-sm">
                  <img v-else-if="letter.type == 1" src="@/assets/images/icons/push-messages.png" class="icon-sm">
                  <img v-else src="@/assets/images/icons/push-group.png" class="icon-sm">
                </td>

                <!-- Получатели -->
                <td class="text-center">
                  <img v-if="letter.gender == 0" src="@/assets/images/all.png" class="icon-sm">
                  <img v-else-if="letter.gender == 1" src="@/assets/images/male.png" class="icon-sm">
                  <img v-else src="@/assets/images/female.png" class="icon-sm">
                </td>

                <!-- Delete -->
                <td class="text-center">
                  <img class="icon-sm pointer" @click="deleteLetter(letter.id)" src="@/assets/images/icons/delete.png">
                </td>
              </tr>
            </tbody>
          </table>

          <div class="pagination d-flex justify-content-end align-items-center mt-3">
            <button class="btn btn-yellow mx-1 my-0" :disabled="pagination.currentPage === 1"
              @click="pagination.currentPage--">
              Назад
            </button>

            <span class="text-white mx-2 my-0">
              {{ pagination.currentPage }} / {{ totalPages }}
            </span>

            <button class="btn btn-yellow mx-1 my-0" :disabled="pagination.currentPage === totalPages"
              @click="pagination.currentPage++">
              Вперёд
            </button>
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

<script setup>
import { ref } from 'vue'
import DataPicker from "@/pages/analytics/DataPicker.vue";
const picked = ref(`Укажите вид поощрения`)
</script>
<script>
import ButtonSorting from "@/UI/ButtonSorting.vue";
import posts from '@/components/axios/posts';
import gets from '@/components/axios/get';
import deletes from '@/components/axios/deletes';

export default {
  data() {
    return {
      pagination: {
        currentPage: 1,
        perPage: 10
      },
      toaster: false,
      toastMessage: '',
      success: true,

      isLoading: false,
      error: null,
      loadingText: 'Загрузка...',

      addCardHoliday: false,
      dllStatus: false,
      addStatus: false,
      valueChecked: '',
      presentMenu: false,
      addCardBirthday: false,
      searchActive: '',
      addHoliday: false,
      delStatus: false,
      statusPicker: false,
      letter: {
        message: '',
        type: null,
        gender: null,
      },
      maxLength: 20,

      letters: [
        {
          message: 'День хорошего дня вам, $имя$, ждем вас в нашем фитнес-клубе',
          type: 0,
          gender: 0,
          showFull: false,
          createdAt: '2024-11-17',
        },
        {
          message: 'День хорошего дня вам, $имя$, ждем вас в нашем фитнес-клубе',
          type: 1,
          gender: 1,
          showFull: false,
          createdAt: '2024-11-17',
        },
        {
          message: 'День хорошего дня вам, $имя$, ждем вас в нашем фитнес-клубе',
          type: 2,
          gender: 2,
          showFull: false,
          createdAt: '2024-11-17',
        },

      ],
      sms: 0,
      push: 0,
    };
  },
  methods: {
    submitLetter() {
      this.isLoading = true;
      this.loadingText = 'Добавление рассылки...';
      let type = (this.sms && this.push) ? (parseInt(this.sms) + parseInt(this.push)) : (this.push ? this.push : 0);
      this.letter.type = type;
      console.log(this.letter);
      posts('https://api.mubingym.com/api/mailings/create', {
        message: this.letter.message,
        send_type: type,
        gender: this.letter.gender
      })
        .then((response) => {
          this.isLoading = false;
          this.toaster = true;
          this.toastMessage = 'Рассылка успешно добавлена!';
          this.success = true;
          this.addStatusDelay('toaster');
          this.addCardHoliday = false;
          this.loadLetters();
        })
        .catch((error) => {
          this.isLoading = false;
          this.toaster = true;
          this.toastMessage = 'Ошибка при добавлении рассылки.';
          this.success = false;
          this.addStatusDelay('toaster');
          console.error('There was an error!', error);
        });

      this.letter = {
        message: '',
        type: null,
        gender: null,
      };
      this.push = 0;
      this.sms = 0;


    },
    shortText(text) {
      return text.substring(0, 20);
    },
    presentName(ref) {
      const refObject = this.$refs[ref]
      const text = refObject.value
      const cursorPosition = refObject.selectionStart;
      const textBeforeCursor = text.substring(0, cursorPosition);
      const textAfterCursor = text.substring(cursorPosition);

      refObject.value = textBeforeCursor + ' $имя$ ' + textAfterCursor;
    },
    addStatusDelay(i) {
      setTimeout(() => {
        this[i] = false
      }, 3000)
    },
    loadLetters() {
      this.isLoading = true;
      this.loadingText = 'Загрузка рассылок...';
      gets('https://api.mubingym.com/api/mailings/get')
        .then((response) => {
          this.letters = response.data.data.map(letter => ({
            ...letter,
            showFull: false,
          }));
          console.log(this.letters);
          this.isLoading = false;
        })
        .catch((error) => {
          this.error = 'Не удалось загрузить рассылки.';
          this.isLoading = false;
        });
    },
    deleteLetter(id) {
      if (confirm('Вы уверены, что хотите удалить эту рассылку?')) {
        this.isLoading = true;
        this.loadingText = 'Удаление рассылки...';
        deletes(`https://api.mubingym.com/api/mailings/delete/${id}`)
          .then((response) => {
            this.isLoading = false;
            this.toaster = true;
            this.toastMessage = 'Рассылка успешно удалена!';
            this.success = false;
            this.addStatusDelay('toaster');
            this.loadLetters();
          })
          .catch((error) => {
            this.isLoading = false;
            this.toaster = true;
            this.toastMessage = 'Ошибка при удалении рассылки.';
            this.success = false;
            this.addStatusDelay('toaster');
            console.error('There was an error!', error);
          });
      }
    },
  },
  computed: {
    paginatedLetters() {
      const start = (this.pagination.currentPage - 1) * this.pagination.perPage;
      const end = start + this.pagination.perPage;
      return this.letters.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.letters.length / this.pagination.perPage);
    }
  },
  components: { ButtonSorting },
  mounted() {
    this.loadLetters();
  },
};


</script>

<style lang="scss" scoped>
.card{
  background-color: #2c2c2e85 !important;
  border: none;
}
.btn-yellow{
  background-color: #D0FD3E;
  color: #000;
  border: none;
  &:hover{
    background-color: #C4F437;
    color: #000;
  }
  &:disabled {
    background-color: #d4d4d4;
    color: #7a7a7a;
  }
}
.add-user-modal {
  position: fixed !important;
  z-index: 1 !important;
}

.mail-table {
  width: 100%;
  border-collapse: collapse;
}

.mail-table th {
  text-align: left;
  padding: 10px 0;
  font-size: 16px;
  color: #fff !important;
  font-weight: bolder;
}

.mail-table td {
  padding: 14px 0;
  max-width: 220px;
  // border-bottom: 1px solid #ececec;
  font-size: 15px;
}

.text-center {
  text-align: center;
}

.icon-sm {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.icon-sm.pointer {
  width: 25px !important;
  height: 25px !important;

}

.pointer {
  cursor: pointer;
}

.small {
  font-size: 1rem !important;
}

.gender {
  width: 50px;
  aspect-ratio: 1/1;
}

.error-div {
  text-align: center;
}

.error-div svg {
  width: 35px;
  height: 35px;
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
</style>