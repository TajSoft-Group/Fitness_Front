<template>
  <div class="container">
    <div class="row relative">
      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title"><router-link to="/">Управление мобильным приложением</router-link></div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="toggleModal('.take-money-modal')" class="add-user-btn">Добавить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col h-auto statistics bg-black_2 ">
        <div class="mobile-info d-flex justify-content-between">
          <img class="w-25" src="@/assets/images/logo%20gum.png">

        </div>
        <div v-for="i in headInfo" :key="i.id" class="fs-5 pe-3 pt-4 ">
          <h3  class="d-flex justify-content-between h4 color-yellow">{{i.title}}
            <img
                @click="toggleModal('.read-post-modal',editInfo(i.id))"
                class="img-width-40" src="@/assets/images/icons/pen-2.png"></h3>
          <div>{{i.body}}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-12 statistics d-grid bg-black_2 h-auto">
        <div class="row justify-content-between">
          <div class="col-5">
            <!-- Контакт 1 -->
            <div class="contacts-content">
              <div class="contacts-title h3 my-4">Мобильный телефон</div>
              <div class="contacts-body d-flex justify-content-between align-items-center mb-3 position-relative">
                <img class="img-width-55" src="@/assets/images/icons/phone-icon.png" alt="Phone Icon">
                <div class="bg-gray px-5 mx-2 fs-5 border-radius-25 py-3 flex-grow-1">Call центр</div>
                <img class="img-width-40 edit-card-hover" src="@/assets/images/icons/menu-2.png" alt="Menu Icon">

                <div class="position-absolute contacts-edit edit-card">
                  <div class="col bg-black h-auto statistics m-0 p-4">
                    <div @click="toggleModal('.phone-read-modal')" class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div @click="toggleModal('.phone-delete')" class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </div>
              </div>
              <div class="contacts-body d-flex justify-content-between align-items-center position-relative">
                <img class="img-width-55" src="@/assets/images/icons/phone-icon.png" alt="Phone Icon">
                <div class="bg-gray px-5 mx-2 fs-5 border-radius-25 py-3 flex-grow-1">+992 92 000 00 00</div>
                <img class="img-width-40 edit-card-hover" src="@/assets/images/icons/menu-2.png" alt="Menu Icon">

                <div class="position-absolute contacts-edit edit-card">
                  <div class="col bg-black h-auto statistics m-0 p-4">
                    <div @click="toggleModal('.take-money-modal')" class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col-5">
            <!-- Контакт 2 -->
            <div class="contacts-content">
              <div class="contacts-title h3 my-4">Telegram</div>
              <div class="contacts-body d-flex justify-content-between align-items-center mb-3 position-relative">
                <img class="img-width-55" src="@/assets/images/icons/telegram.png" alt="Telegram Icon">
                <div class="bg-gray px-5 mx-2 fs-5 border-radius-25 py-3 flex-grow-1">+992 92 000 00 00</div>
                <img class="img-width-40 edit-card-hover" src="@/assets/images/icons/menu-2.png" alt="Menu Icon">
                <div class="position-absolute contacts-edit edit-card">
                  <div class="col bg-black h-auto statistics m-0 p-4">
                    <div @click="toggleModal('.take-money-modal')" class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </div>
              </div>
              <div class="contacts-body d-flex justify-content-between align-items-center position-relative">
                <img class="img-width-55" src="@/assets/images/icons/link-icon.png" alt="Link Icon">
                <div class="bg-gray px-5 mx-2 fs-5 border-radius-25 py-3 flex-grow-1">https://t.me/</div>
                <img class="img-width-40 edit-card-hover" src="@/assets/images/icons/menu-2.png" alt="Menu Icon">

                <div class="position-absolute contacts-edit edit-card">
                  <div class="col bg-black h-auto statistics m-0 p-4">
                    <div @click="toggleModal('.take-money-modal')" class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col-5">
            <!-- Контакт 3 -->
            <div class="contacts-content">
              <div class="contacts-title h3 my-4">Whats App</div>
              <div class="contacts-body d-flex justify-content-between align-items-center mb-3 position-relative">
                <img class="img-width-55" src="@/assets/images/icons/whatsapp.png" alt="Whatsapp Icon">
                <div class="bg-gray px-5 mx-2 fs-5 border-radius-25 py-3 flex-grow-1">+992 92 000 00 00</div>
                <img class="img-width-40 edit-card-hover" src="@/assets/images/icons/menu-2.png" alt="Menu Icon">
                <div class="position-absolute contacts-edit edit-card">
                  <div class="col bg-black h-auto statistics m-0 p-4">
                    <div @click="toggleModal('.take-money-modal')" class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </div>
              </div>
              <div class="contacts-body d-flex justify-content-between align-items-center position-relative">
                <img class="img-width-55" src="@/assets/images/icons/link-icon.png" alt="Link Icon">
                <div class="bg-gray px-5 mx-2 fs-5 border-radius-25 py-3 flex-grow-1">https://wa.me/</div>
                <img class="img-width-40 edit-card-hover" src="@/assets/images/icons/menu-2.png" alt="Menu Icon">
                <div class="position-absolute contacts-edit edit-card">
                  <div class="col bg-black h-auto statistics m-0 p-4">
                    <div  @click="toggleModal('.take-money-modal')" class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div @click="dllStatus=true, addStatusDelay('dllStatus')" class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5">
            <!-- Контакт 4 -->
            <div class="contacts-content">
              <div class="contacts-title h3 my-4">Instagram</div>
              <div class="contacts-body d-flex justify-content-between align-items-center mb-3 position-relative">
                <img class="img-width-55" src="@/assets/images/icons/instagram.png" alt="Instagram Icon">
                <div class="bg-gray px-5 mx-2 fs-5 border-radius-25 py-3 flex-grow-1">fitness</div>
                <img class="img-width-40 edit-card-hover" src="@/assets/images/icons/menu-2.png" alt="Menu Icon">
                <div class="position-absolute contacts-edit edit-card">
                  <div class="col bg-black h-auto statistics m-0 p-4">
                    <div @c@click="toggleModal('.take-money-modal')" class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </div>
              </div>
              <div class="contacts-body d-flex justify-content-between align-items-center position-relative">
                <img class="img-width-55" src="@/assets/images/icons/link-icon.png" alt="Link Icon">
                <div class="bg-gray px-5 mx-2 fs-5 border-radius-25 py-3 flex-grow-1">www.instagram.com/</div>
                <img class="img-width-40 edit-card-hover" src="@/assets/images/icons/menu-2.png" alt="Menu Icon">
                <div class="position-absolute  contacts-edit edit-card">
                  <div class="col bg-black h-auto statistics m-0 p-4">
                    <div  class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p @click="toggleModal('.take-money-modal')"  class="m-0">Редактировать</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-4">
                      <p class="m-0 blocked">Удалить</p>
                      <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
                    </div>
                  </div>
                </div>
              </div>
<!--              add post-->
              <div @click="toggleModal('.take-money-modal')" class="add-user-modal d-none take-money-modal d-flex justify-content-center align-items-center">
                <div @click.stop  class="content">
                  <h5>ДОБАВИТЬ ИНФОРМАЦИЮ</h5>
                  <div class="courses mt-3">
                    <div class="form mt-3">
                      <label for="take-sum">Вид деятельности*</label>
                      <input v-model="addHeadInfo.title" type="text" placeholder="Фитнес клуб, финес центр" id="take-sum">
                    </div>
                    <div class="form mt-3">
                      <label for="becauses">Описание*</label>
                      <textarea v-model="addHeadInfo.body"  name="because" id="becauses" cols="350" rows="7" placeholder="Расскажите немного о направлении" maxlength="255"></textarea>
                    </div>
                      <div class="d-flex justify-content-end fs-6 opacity-50">
                        <div>255 символов</div>
                      </div>
                    </div>
                      <div class="d-flex justify-content-between add-user-buttons">
                        <button @click="toggleModal('.take-money-modal')" class="button-type-1 p-3 h-25 opacity-75">Отмена</button>
                        <button @click="addInfo(addHeadInfo,headInfo),toggleModal('.take-money-modal')" class="button-type-1 h-25 p-3 ">Добавить</button>
                      </div>
                </div>
              </div>
<!--              read Posts-->
              <div @click="resetData(addHeadInfo),toggleModal('.read-post-modal')" class="add-user-modal d-none read-post-modal d-flex justify-content-center align-items-center">
                <div @click.stop  class="content">
                  <h5>РЕДАКТИРОВАТЬ</h5>
                  <div class="courses mt-3">
                    <div class="form mt-3">
                      <label for="take-sum">Вид деятельности*</label>
                      <input v-model="addHeadInfo.title" type="text" placeholder="Фитнес клуб, финес центр" id="take-sum">
                    </div>
                    <div class="form mt-3">
                      <label for="becauses">Описание*</label>
                      <textarea v-model="addHeadInfo.body"  name="because" id="becauses" cols="350" rows="7" placeholder="Расскажите немного о направлении" maxlength="350"></textarea>
                    </div>
                      <div class="d-flex justify-content-end fs-6 opacity-50">
                        <div>255 символов</div>
                      </div>
                    </div>
                      <div class="d-flex justify-content-between add-user-buttons">
                        <button @click="resetData(addHeadInfo), toggleModal('.read-post-modal')" class="button-type-1 p-3 h-25 opacity-75">Отмена</button>
                        <button @click="saveEdit(), toggleModal('.read-post-modal')" class="button-type-1 h-25 p-3 ">Сохранить</button>
                      </div>
                </div>
              </div>

              <div @click="toggleModal('.phone-read-modal')" class="add-user-modal d-none phone-read-modal d-flex justify-content-center align-items-center">
                <div @click.stop  class="content">
                  <h5>РЕДАКТИРОВАТЬ НОМЕР ТЕЛЕФОНА</h5>
                  <div class="courses mt-3">
                    <div class="form mt-3">
                      <label for="take-sum">Номер телефона*</label>
                      <input v-model="addHeadInfo.title" type="text" placeholder="Номер телефона" id="take-sum">
                    </div>
                  </div>
                  <div class="d-flex justify-content-between add-user-buttons">
                    <button @click="toggleModal('.phone-read-modal')" class="button-type-1 p-3 h-25 opacity-75">Отмена</button>
                    <button @click="toggleModal('.phone-read-modal')" class="button-type-1 h-25 p-3 ">Добавить</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="toggleModal('.phone-delete')" class="add-user-modal phone-delete d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <div class="text-center mb-5">
        <img src="@/assets/images/icons/info.png" height="70px">
      </div>
      <h3 class="text-center">Вы действительно хотите удалить номер телефона ?</h3>
      <p class="text-center mt-3 text-gray">При удалении аккаунт пользователя все данные будут уничтожены</p>
      <div class="courses mt-3">
        <div class="cards-infos delete-user-info">
          <div class="d-flex justify-content-between add-user-buttons">
            <button @click="toggleModal('.phone-delete')" class="dont">Отмена</button>
            <button @click="toggleModal('.phone-delete')" class="submit red" type="button">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col statistics h-auto bg-black_2 w-50 col-5">
        <div class="p-4 d-flex justify-content-center">
          <div class="iphone-x">
            <i>Speaker</i>
            <b>Camera</b>
            <img :src="image">
          </div>
        </div>
        <div v-if="!errImage" class="text-center opacity-50">Минимальный размер: 393x852 px Максимальное кол-во фотографий: 1</div>
        <div v-if="errImage" class="text-center opacity-50 blocked">Изображение не соответствует указанным параметрам</div>
        <div class="d-flex mt-3">
          <button ref="fileInput" class="button-type-1 bg-yellow" @click="selectImage">Добавить</button>
          <button :class="{'bg-yellow': errBtn, 'button-disabled': errImage}" :disabled="errImage" class="ms-4 button-type-1">Сохранить</button>
        </div>
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none">
      </div>
    </div>
  </div>
</template>

<script>
import data from "bootstrap/js/src/dom/data.js";

export default {
  data() {
    return {
      headInfo:[{title:'Фитнес-клуб',body:'Фитнес-клуб — место, сочетающее в себе спортивный зал для проведения групповых и танцевальных программ, спортивный зал для игровых видов спорта (не во всех фитнес-клубах), тренажёрный зал, плавательный бассейн (не во всех фитнес-клубах; для спортивного плавания и аквааэробики), кардио-зону, залы аэробики.',id: 123},],
      dllStatus:false,
      addHeadInfo:{title:'',body:''},
      errImage:false,
      errBtn:false,
      image: 'src/assets/images/woman.png',
      searchActive: '',
      addStatus: true,
      addCard: false,
      modal: 'auto',
      modalSelector: ''
    };
  },
  methods: {
    addStatusDelay() {
      setTimeout(() => {
        this.addStatus = false;
      }, 2000);
    },
    addInfo(data, arr) {
      let allFieldsFilled = true;
      for (let key in data) {
        if (data[key] === '') {
          allFieldsFilled = false;
          break;
        }
      }
      if (allFieldsFilled) {
        arr.push({...data, id:Date.now()});
        this.resetData(data)
      } else {
        console.log("Не все поля заполнены.");
      }
    },
    editInfo(id) {
      const info = this.headInfo.find(item => item.id === id);
      if (info) {
        this.addHeadInfo = { ...info };
      }
    },
    saveEdit() {
      const index = this.headInfo.findIndex(item => item.id === this.addHeadInfo.id);
      if (index !== -1) {
        this.headInfo.splice(index, 1, {...this.addHeadInfo});
        this.resetData({...this.addHeadInfo})
      }
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    resetData(data){
      for (let key in data) {
        data[key] = '';
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;

          img.onload = () => {
            const width = img.width;
            const height = img.height;
            if (width > 400 || height > 852){
              this.errImage=true
              this.errBtn=false
            }else {
              this.errBtn=true
              this.errImage=false
              this.image = e.target.result;
            }
          };
        };
        reader.readAsDataURL(file);
      }
    },
    toggleModal(modalSelector) {
      this.modal = this.modal === 'auto' ? 'hidden' : 'auto';
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
    }
  },
  watch: {
    modal() {
      this.updateToggleModal();
    }
  },
  mounted() {
    this.addStatusDelay();
  },
};
</script>

<style lang="scss" scoped>
.iphone-x img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.iphone-x {
  position: relative;
  width: 290px;
  height: 600px;
  border-radius: 40px;
  box-shadow: 0px 0px 0px 3px #ffffff, 0px 0px 0px 13px #191919, 0px 0px 0px 20px #111;
  overflow: hidden;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  &:after {
    bottom: 7px;
    width: 140px;
    height: 4px;
    background-color: #f2f2f2;
    border-radius: 10px;
  }

  &:before {
    top: 0px;
    width: 56%;
    height: 30px;
    background-color: #1f1f1f;
    border-radius: 0px 0px 40px 40px;
  }

  i,
  b,
  s,
  span {
    position: absolute;
    display: block;
    color: transparent;
  }

  i {
    top: 0px;
    left: 50%;
    transform: translate(-50%, 6px);
    height: 8px;
    width: 15%;
    background-color: #101010;
    border-radius: 8px;
    box-shadow: inset 0px -3px 3px 0px rgba(256, 256, 256, 0.2);
  }

  b {
    left: 10%;
    top: 0px;
    transform: translate(180px, 4px);
    width: 12px;
    height: 12px;
    background-color: #101010;
    border-radius: 12px;
    box-shadow: inset 0px -3px 2px 0px rgba(256, 256, 256, 0.2);

    &:after {
      content: '';
      position: absolute;
      background-color: #2d4d76;
      width: 6px;
      height: 6px;
      top: 2px;
      left: 2px;
      top: 3px;
      left: 3px;
      display: block;
      border-radius: 4px;
      box-shadow: inset 0px -2px 2px rgba(0, 0, 0, 0.5);
    }
  }

  s {
    top: 50px;
    color: #fff;
    text-align: center;
    text-decoration: none;
    width: 100%;
    font-size: 70px;
    font-weight: 100;
    padding-top: 60px;
  }

  span {
    bottom: 50px;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    left: 30px;

    & + span {
      left: auto;
      right: 30px;
    }
  }
}
</style>
