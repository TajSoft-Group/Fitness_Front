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
    <div class="row relative">
      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title">Персонал</div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="addCoach()" class="add-user-btn">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="toggleModal('.add-user-modal')" style="overflow: auto"
    class="add-user-modal d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <div class="title"> {{ editedCoach ? "Изменить" : "Добавить" }} персонал</div>
      <form class="form" @submit.prevent="saveCoach(), (addCard = false)">
        <label for="name">Имя*</label>
        <input type="text" placeholder="Введите имя" id="name" v-model="formData.name" required />

        <label for="surname">Фамилия*</label>
        <input type="text" placeholder="Введите фамилию" id="surname" v-model="formData.surname" required />

        <label for="phone_number">Номер телефона**</label>
        <input type="text" placeholder="Введите номер телефона" id="phone_number" v-model="formData.phone_number"
          required />
        <!--        <div class="form position-relative">-->
        <!--          <label for="name">Должность*</label>-->
        <!--          <input  type="text" :value="picked"   id="present">-->
        <!--          <img @click="presentMenu=!presentMenu" :class="{'rotate-90':presentMenu}" class="row-right-icon" src="@/assets/images/icons/row-right.png">-->
        <!--          <div :class="{'d-block':presentMenu}" class="menu-type-1 pt-4 px-4 ">-->
        <!--            <h1 >Услуги</h1>-->
        <!--            <div @click="presentMenu=!presentMenu" class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">-->
        <!--              <input type="radio" id="yoga" value="Йога" v-model="picked" />-->
        <!--              <label class="text-white" for="yoga">Тренер</label>-->
        <!--            </div>-->
        <!--            <hr>-->
        <!--            <div @click="presentMenu=!presentMenu" class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">-->
        <!--              <input type="radio" id="solarium" value="Солярий" v-model="picked" />-->
        <!--              <label class="text-white" for="solarium">Администратор</label>-->
        <!--            </div>-->
        <!--            <hr>-->
        <!--            <div @click="presentMenu=!presentMenu" class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">-->
        <!--              <input type="radio" id="dancing" value="Танцы" v-model="picked" />-->
        <!--              <label class="text-white" for="dancing">Менеджер</label>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <label for="work_experience">Опыт работы*</label>
        <input type="text" placeholder="Укажите опыт работы" id="work_experience" v-model="formData.work_experience"
          required />

        <!--        <label for="surname">Направление*</label>-->
        <!--        <div class="menu-type-2 d-flex justify-content-between  ">-->
        <!--          <div class="form-recipients">-->
        <!--            <input type="radio" id="man" name="gender" value="1" v-model="formData.gender">-->
        <!--            <label class="text-white" for="man">Кардио нагрузка</label>-->
        <!--          </div>-->
        <!--          <div class="form-recipients">-->
        <!--            <input type="radio" id="woman" name="gender" value="2" v-model="formData.gender">-->
        <!--            <label class="text-white" for="woman">Силовая нагрузка</label>-->
        <!--          </div>-->
        <!--        </div>-->

        <label for="description">Описание</label>
        <textarea id="description" placeholder="Краткое описание тренера" v-model="formData.description"
          rows="4"></textarea>


        <label for="surname">Фотография тренера*</label>
        <div class="form position-relative mt-2">
          <div class="row p-1 justify-content-center img-card">
            <div v-if="images.length <= 0" class="opacity-50 text-center">
              Фотография тренера Минимальный размер 200x200 px Максимальное
              кол-во фотографий: 1
            </div>
            <div v-for="(image, index) in images" :key="index" class="card-add-img m-2">
              <img :src="image" class="card-img-top" alt="Product Image" />
            </div>
            <div @click="selectImage(1)" v-show="images.length < 1"
              class="card-button align-content-center text-center m-2">
              <button type="button" class="add-button">+</button>
            </div>
          </div>
          <label for="surname">Фотография фона*</label>
          <div class="col-12 p-1 img-card mt-4 d-flex flex-wrap">
            <div v-if="images.length <= 0" class="opacity-50 text-center w-100">
              Фотография фона Минимальный размер 1240x400 px Максимальное кол-во
              фотографий: 5
            </div>
            <div v-for="(image, index) in images2" :key="index" class="card-add-img m-2">
              <img :src="image" class="card-img-top" alt="Product Image" />
            </div>
            <div @click="selectImage(2)" v-show="images2.length < 5"
              class="card-button align-content-center text-center m-2">
              <button type="button" class="add-button">+</button>
            </div>
          </div>
          <input type="file" ref="fileInput1" @change="handleFileChange(1)" style="display: none"
            accept="image/png,image/jpeg,image/jpg" />
          <input type="file" ref="fileInput2" @change="handleFileChange(2)" style="display: none"
            accept="image/png,image/jpeg,image/jpg" />
        </div>
        <label for="surname">Выберите цвет</label>
        <div class="ps-3 img-card d-flex flex-wrap">
          <div v-for="(color, index) in colors" :key="index" :class="{ 'bg-black_2': activeColor === color }"
            class="p-2">
            <div :style="{ backgroundColor: color }" class="color-circle" @click="selectColor(color)"></div>
          </div>
        </div>
        <div class="d-flex justify-content-between add-user-buttons">
          <button @click="toggleModal('.add-user-modal')" class="dont" type="button">
            Отмена
          </button>
          <button class="submit" type="submit">
            {{ editedCoach ? "Изменить" : "Добавить" }}
          </button>
        </div>
      </form>
    </div>
  </div>


  <!--На работе-->
  <div class="container mb-5">
    <div class="row">
      <div class="col">
        <div :class="{ 'search-input': searchActive.length > 0 }"
          class="d-flex justify-content-between align-items-center search-block">
          <img src="@/assets/images/icons/search.png" alt="search" />
          <input v-model="searchActive" type="text" id="searchInput" placeholder="Поиск по всем параметрам" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card rounded-5 mt-4 p-5" data-bs-theme="dark">
          <table class="">
            <thead>
              <tr>
                <th style="vertical-align: middle">ФИО</th>
                <th style="vertical-align: middle">Номер телефона</th>
                <th style="vertical-align: middle">Должность</th>
                <th style="vertical-align: middle">Статус</th>
                <th class="text-center" style="vertical-align: middle">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="personal in filteredUsers" class="align-items-center personal-tr border-bottom">
                <td class="d-flex justify-content-start align-items-center">
                  <router-link :to="{ name: 'TrainerPage', params: { id: personal.id } }"
                    class="d-flex col-8 align-items-center">
                    <div class="personal-img my-3" :style="{ borderColor: personal.color }">
                      <img :src="'https://missfitnessbackend.tajsoft.tj/' +
                        personal.avatar
                        " alt="" />
                    </div>
                    <div>{{ personal.name + " " + personal.surname }}</div>
                  </router-link>
                </td>

                <td>
                  <div class=""> {{ personal.phone_number }}</div>
                </td>
                <td>
                  <div class="fw-bold">Тренер</div>
                  <div class="text-yellow fw-bold"><small>Кардио нагрузка</small></div>
                </td>

                <td class="personal-status" style="vertical-align: middle">
                  <span class="badge bg-yellow" v-if="personal.status == 0">на работе</span>
                  <span class="badge bg-danger" v-else>на карантине</span>
                </td>
                <td>
                  <div class="d-flex justify-content-center align-items-center">
                    <img class="icon-sm pointer me-4" @click="editCoach(personal)"
                      src="@/assets/images/icons/pencel.png">
                    <img class="icon-sm pointer" @click="deleteCoach(personal.id)"
                      src="@/assets/images/icons/delete.png">
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
import Cookies from "js-cookie";
import { ref } from "vue";
import form_Data from "@/components/axios/formData.js";
import gets from "@/components/axios/get.js";
import posts from "@/components/axios/posts";
import deletes from "@/components/axios/deletes";
const picked = ref(`Выберите должность`);
export default {
  components: { picked },
  data() {
    return {
      toastMessage: "",
      toaster: false,
      success: true,

      isLoading: true,
      loadingText: "Загрузка...",
      error: null,
      editedCoach: null,

      picked: picked,
      images: [],
      images2: [],
      imagesPost: null,
      imagesPost2: [],
      formData: {
        name: "",
        surname: "",
        phone_number: "",
        work_experience: "",
        description: "",
        avatar: "",
        cover_imgs: "",
        color: "",
      },
      colors: [
        "#FF0000",
        "#FF4500",
        "#FFA500",
        "#FF6347",
        "#FFFF00",
        "#ADFF2F",
        "#7CFC00",
        "#00FF00",
        "#00FA9A",
        "#00CED1",
      ],
      presentMenu: false,
      statusPicker: false,
      searchActive: "",
      addStatus: false,
      addCard: false,
      modal: "auto",
      DataUsers: "",
      filteredUsers: [],
      modalSelector: "",
      activeColor: "12",
      loadData: false,
    };
  },
  methods: {
    async deleteCoach(id) {
      this.isLoading = true;
      this.loadingText = "Удаление тренера...";

      if (!confirm("Вы уверены, что хотите удалить этого тренера?")) return;

      try {
        const response = await deletes(`https://missfitnessbackend.tajsoft.tj/api/coach/delete/${id}`);

        // Если нужно проверить статус:
        if (response.status === 200) {
          this.isLoading = false;
          this.toastMessage = "Тренер успешно удален";
          this.toaster = true;
          this.success = true;
          this.Delay("toaster", 3);
          this.getInfo(); // обновляем список
        }

      } catch (error) {
        this.isLoading = false;
        this.toastMessage = "Ошибка при удалении тренера";
        this.toaster = true;
        this.success = false;
        this.Delay("toaster", 3);


        console.error("Ошибка удаления:", error);
      }
    },
    editCoach(coach) {
      console.log(coach)
      this.editedCoach = coach;

      this.formData.name = coach.name;
      this.formData.surname = coach.surname;
      this.formData.phone_number = coach.phone_number;
      this.formData.work_experience = coach.work_experience;
      this.formData.description = coach.description || "";
      this.formData.color = coach.color;
      this.formData.completed_courses = coach.completed_courses;
      this.formData.avatar = null;
      this.formData.cover_imgs = null;

      this.formData = coach;
      this.toggleModal('.add-user-modal') // открыть модалку
    },
    addCoach() {
      this.editedCoach = null;
      this.coachName = "";
      this.coachPhone = "";
      this.coachAddress = "";
      this.coachInstagram = "";
      this.coachActive = true;
      this.coachAvatar = null;
      this.imagesPost = null;
      this.imagesPost2 = null;


      this.toggleModal('.add-user-modal')
    },
    saveCoach() {
      if (this.editedCoach) {
        this.updateCoach();
      } else {
        this.submitForm();
      }
    },
    getInfo() {
      const token = Cookies.get("token");
      gets("https://missfitnessbackend.tajsoft.tj/api/coach/all", token)
        .then((response) => {
          this.DataUsers = response.data.data;
          this.filteredUsers = this.DataUsers;
          this.Delay("isLoading", 1);
          console.log(this.DataUsers);
        })
        .catch((error) => {
          this.error = error;
          this.Delay("isLoading", 1);
        });
    },
    selectColor(color) {
      this.activeColor = color;
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
    selectImage(inputNumber) {
      if (inputNumber === 1) {
        this.$refs.fileInput1.click();
      } else if (inputNumber === 2) {
        this.$refs.fileInput2.click();
      }
    },
    handleFileChange(inputNumber) {
      const fileInput = inputNumber === 1 ? this.$refs.fileInput1 : this.$refs.fileInput2;
      const file = fileInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (inputNumber === 1) {
          // аватар — один файл
          this.imagesPost = file;               // хранить сам File для отправки
          this.images = [e.target.result];      // preview base64
        } else if (inputNumber === 2) {
          if (!Array.isArray(this.imagesPost2)) {
            this.imagesPost2 = [];
          }
          if (!Array.isArray(this.images2)) {
            this.images2 = [];
          }

          this.imagesPost2.push(file);
          this.images2.push(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    },
    buildCoachFormData(payloadObject = {}) {
      const fd = new FormData();

      // простые поля (только те, которые есть)
      Object.keys(payloadObject).forEach((key) => {
        const val = payloadObject[key];
        if (val === null || val === undefined) return;
        // если это массив (например, cover_imgs уже как массив строк/значений) — пропустим, файлы отдельно
        if (Array.isArray(val)) {
          // Если нужно отправлять массив простых значений: fd.append(`${key}[]`, item)
          val.forEach(item => fd.append(`${key}[]`, item));
        } else {
          fd.append(key, val);
        }
      });

      // файл аватар (если есть File)
      if (this.imagesPost && this.imagesPost instanceof File) {
        fd.append("avatar", this.imagesPost);
      }

      // мульти-файлы cover_imgs (если есть)
      if (Array.isArray(this.imagesPost2) && this.imagesPost2.length > 0) {
        this.imagesPost2.forEach((file, idx) => {
          // сервер может ожидать cover_imgs[] или cover_imgs (проверьте API). Здесь — cover_imgs[]
          fd.append("cover_imgs[]", file);
        });
      }

      return fd;
    },

    async updateCoach() {
      this.isLoading = true;
      this.loadingText = "Сохранение изменений...";

      try {
        // Подготовим объект с полями, которые нужно отправить
        const payload = {
          name: this.formData.name,
          surname: this.formData.surname,
          phone_number: this.formData.phone_number,
          work_experience: this.formData.work_experience,
          color: this.activeColor || this.formData.color,
          description: this.formData.description,
          // другие текстовые поля, если нужны...
        };

        const fd = this.buildCoachFormData(payload);

        // Если ваш form_Data — это helper, который принимает FormData — используем его.
        // Иначе замените на axios.post с заголовком multipart/form-data
        const response = await form_Data(
          `https://missfitnessbackend.tajsoft.tj/api/coach/update/${this.editedCoach.id}`,
          fd
        )
          .then(() => {
            this.isLoading = false;
            this.toastMessage = "Данные успешно изменены";
            this.toaster = true;
            this.success = true;
            this.Delay("toaster", 3);
            this.toggleModal('.add-user-modal')
          })

        // В зависимости от того, что возвращает ваш helper — обработка:
        // если helper не возвращает response.status, можно просто вызвать getInfo()
        console.log("update response", response);

        await this.getInfo();
        this.editedCoach = null;
        // очистим форму, если нужно:
        this.clearForm();

      } catch (error) {
        this.isLoading = false;
        this.toastMessage = "Ошибка при изменении данных";
        this.toaster = true;
        this.success = false;
        this.Delay("toaster", 3);
        console.error("Ошибка updateCoach:", error);
      }
    },
    async submitForm() {
      this.isLoading = true;
      this.loadingText = "Сохранение данных...";
      try {
        const payload = {
          name: this.formData.name,
          surname: this.formData.surname,
          phone_number: this.formData.phone_number,
          work_experience: this.formData.work_experience,
          description: this.formData.description,
          color: this.activeColor || this.formData.color,
        };

        const fd = this.buildCoachFormData(payload);

        const response = await form_Data(
          "https://missfitnessbackend.tajsoft.tj/coach/create",
          fd
        );

        console.log("create response", response);
        if (response && response.status === 200) {
          this.isLoading = false;
          this.toastMessage = "Персонал успешно добавлен";
          this.toaster = true;
          this.success = true;
          this.Delay("toaster", 3);

          await this.getInfo();
          this.clearForm();
          this.toggleModal('.add-user-modal');
        }
      } catch (error) {
        this.isLoading = false;
        this.toastMessage = "Ошибка при добавлении персонала";
        this.toaster = true;
        this.success = false;
        this.Delay("toaster", 3);
        console.error("Ошибка submitForm:", error);
      }
    },
    clearForm() {
      this.formData = {
        name: "",
        surname: "",
        phone_number: "",
        work_experience: "",
        description: "", // ✅
        avatar: "",
        cover_imgs: "",
        color: "",
      };
      this.images = [];
      this.images2 = [];
      this.imagesPost = null;
      this.imagesPost2 = [];
      this.activeColor = "12";
    },
    Delay(target, t) {
      setTimeout(() => {
        this[target] = false;
        // this.clearData(this.formData)
      }, t * 1000);
    },
  },
  watch: {
    modal() {
      this.updateToggleModal();
    },
    searchActive(val) {
      const searchTerm = val.toLowerCase();
      this.filteredUsers = this.DataUsers.filter((personal) => {
        return (
          personal.name.toLowerCase().includes(searchTerm) ||
          personal.surname.toLowerCase().includes(searchTerm) ||
          personal.phone_number.toLowerCase().includes(searchTerm)
        );
      });
      if (val.length === 0) {
        this.filteredUsers = this.DataUsers;
      }
    },
  },
  mounted() {
    this.getInfo();
  },
  updateToggleModal() {
    console.log(this.modal);
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
};
</script>

<style lang="scss" scoped>
.add-user-modal {
  z-index: 1;
}

.text-yellow {
  color: #c3ff00;
}

.mh-40 {
  min-height: 38px;
}

.abonent,
.uslugi {
  margin-top: 0;
}

.card {
  --bs-body-bg: #2c2c2e85 !important;
  border: none;
}

.card table tr {
  height: 50px;
}

.search-block img {
  top: auto !important;
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

.add-user-modal .content {
  max-height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
}
</style>
