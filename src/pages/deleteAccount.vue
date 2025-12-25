
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
<<<<<<< HEAD
      deletes(`https://api.mubingym.com/product/${ parseInt(id) }`)
=======
      deletes(`https://api.mubingym.com//product/${ parseInt(id) }`)
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
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
<<<<<<< HEAD
        posts("https://api.mubingym.com/category_create", {
=======
        posts("https://api.mubingym.com//category_create", {
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
          name: this.AddCategory,
        })
            .then((response) => {
              console.log(this.AddCategory);
              if (response.status === 200) {
                this.addStatus = true;
                this.getInfo(
<<<<<<< HEAD
                    "https://api.mubingym.com/category",
=======
                    "https://api.mubingym.com//category",
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
                    "buttonsCategory",
                    1
                );
                this.getInfo(
<<<<<<< HEAD
                    "https://api.mubingym.com/product/all",
=======
                    "https://api.mubingym.com//product/all",
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
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
<<<<<<< HEAD
                `https://api.mubingym.com/product/${ FormData.id }`,
=======
                `https://api.mubingym.com//product/${ FormData.id }`,
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
                FormData
            );
            this.editNull()
          }else{
            response = await form_Data(
<<<<<<< HEAD
                "https://api.mubingym.com/product_create",
=======
                "https://api.mubingym.com//product_create",
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
                FormData
            );
          }

          console.log(response);
          if (response.status === 200) {
            this.addStatus = true;
            await this.getInfo(
<<<<<<< HEAD
                "https://api.mubingym.com/category",
=======
                "https://api.mubingym.com//category",
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
                "buttonsCategory",
                1
            );
            await this.getInfo(
<<<<<<< HEAD
                "https://api.mubingym.com/product/all",
=======
                "https://api.mubingym.com//product/all",
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
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
<<<<<<< HEAD
      deletes(`https://api.mubingym.com/category/delete/${ parseInt(id) }`)
=======
      deletes(`https://api.mubingym.com//category/delete/${ parseInt(id) }`)
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
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
<<<<<<< HEAD
        "https://api.mubingym.com/category",
=======
        "https://api.mubingym.com//category",
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
        "buttonsCategory",
        1
    );
    this.getInfo(
<<<<<<< HEAD
        "https://api.mubingym.com/product/all",
=======
        "https://api.mubingym.com//product/all",
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
        "productList",
        2
    );
  },
};
</script>
<template>
  <div class="container">

    <div class="row">
      <div class="card card-body bg-dark my-5 rounded-4 p-5 delAccCard">
        <img src="@/assets/images/logo%20gum.png"  alt="">
        <h3 class="text-center">Удаление аккаунта</h3>
        <p class="mx-5 my-3">
          На этой странице вы можете легко и быстро удалить свой аккаунт. Обратите внимание, что удаление аккаунта является необратимым процессом. После удаления все ваши данные, включая личную информацию, историю взаимодействий, и настройки учетной записи, будут безвозвратно удалены.
          <br>
          Перед удалением аккаунта мы рекомендуем:
        </p>
        <ul>
          <li class="mb-1 ms-5">Убедиться, что у вас нет активных подписок или невыполненных обязательств.</li>
          <li class="mb-1 ms-5">Сохранить важные данные или информацию, которые могут понадобиться в будущем.</li>
          <li class="mb-1 ms-5">Связаться с нашей службой поддержки, если у вас возникнут вопросы или проблемы с удалением.</li>
        </ul>
        <p class="mx-5 my-0">
          Наша команда стремится предоставить вам полный контроль над вашими данными и учетной записью. Если вы передумали, вы всегда можете прекратить процесс удаления до его завершения.
        </p>

        <form action="" class="w-50 d-block mx-auto">
          <label for="" class="d-block my-3">
            <span>Логин или номер телефона</span>
            <input type="text" class="form-control bg-dark rounded-3 text-white" placeholder="Логин или номер телефона">
          </label>
          <label for="" class="d-block my-3">
            <span>Пароль</span>
            <input type="text" class="form-control bg-dark rounded-3 text-white" placeholder="Пароль">
          </label>
          <label for="" class="d-block my-3">
            <button type="button"  @click="(areyousure = true);" class="form-control bg-danger text-white fw-bold rounded-3" data-toggle="modal" data-target="#exampleModal">
              Удалить аккаунт
            </button>
          </label>
        </form>

      </div>
    </div>
  </div>

  <div
      @click="toggleModal('.user-delete-modal')"
      class="add-user-modal user-delete-modal d-flex justify-content-center align-items-center"
      v-if="areyousure"
  >
    <div @click.stop class="content bg-dark">
      <div class="text-center mb-5">
        <img src="@/assets/images/icons/info.png" class="info"/>
      </div>
      <h3 class="text-center">
        Вы действительно хотите удалить аккаунт?
      </h3>
      <div class="courses mt-3">
        <div class="cards-infos delete-user-info">
          <div class="d-flex justify-content-between add-user-buttons">
            <button @click="toggleModal('.user-delete-modal')" class="dont">
              Отмена
            </button>
            <button
                @click="
                    toggleModal('.user-delete-modal'); areyousure=0
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
</template>
<style>
  .info img{
    display: block;
    margin: 0 auto;
  }
  .delAccCard             .card{
    max-width: 70% !important;
    margin: 0 auto;
  }
</style>
