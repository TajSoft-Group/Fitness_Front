<template>
  <div class="container">
    <div class="row relative">

      <div @click="toggleModal('.user-delete-modal')" class="add-user-modal user-delete-modal d-none d-flex justify-content-center align-items-center">
        <div @click.stop class="content">
          <div class="text-center mb-5">
            <img src="@/assets/images/icons/info.png" height="70px">
          </div>
          <h3 class="text-center">Вы действительно хотите удалить этот продукт?</h3>
          <div class="courses mt-3">
            <div class="cards-infos delete-user-info">
              <div class="d-flex justify-content-between add-user-buttons">
                <button @click="toggleModal('.user-delete-modal')"  class="dont">Отмена</button>
                <button @click="toggleModal('.user-delete-modal'), dllStatus=true, StatusDelay('dllStatus')" class="submit red" type="button">Удалить</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <transition name="bounce" v-if="addStatus" class="added-user-message">
        <div class="result-true">
          <div class="result-true-card d-flex align-items-center">
            <img class="m-4 img-width-40" src="@/assets/images/icons/check_add.png">
            <div class="result-true-content ">
              <div class="result-true-title">Пользователь добавлен</div>
              <div class="result-true-body mt-2">Новый пользователь успешно добавлен в список клиентов</div>
            </div>
          </div>
        </div>
      </transition>

      <transition v-if="dllStatus"  name="bounce"   class="z-3 added-user-message ">
        <div class="result-true del-result">
          <div class="result-true-card d-flex align-items-center">
            <img class="m-4 img-width-40" src="@/assets/images/icons/dell.png">
            <div class="result-true-content ">
              <div class="result-true-title">Продукт успешно удален</div>
              <div class="result-true-body mt-2">Продукт “Батончик протеиновый” был удален </div>
            </div>
          </div>
        </div>
      </transition>

      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title"><router-link to="/"><img class="px-3 pb-2" src="@/assets/images/icons/Stroke.png">Продукты</router-link></div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="addCardHoliday=true" class="add-user-btn">Добавить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container relative m">
    <div class="row">
      <div class="col">
        <div :class="{'search-input':searchActive.length>0}"  class="d-flex justify-content-between align-items-center search-block mt-4">
          <img src="@/assets/images/icons/search.png" alt="search">
          <input v-model="searchActive"  type="text" id="searchInput" placeholder="Поиск по всем параметрам">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div v-if="searchActive.length>0" class="users-block bg-gray search-result-block ">
        </div>
      </div>
    </div>
  </div>
<div class="container mt-4">
    <div class="row">
      <div class="col">
        <div class="product-catalog ">
            <button
                class="mt-3  py-2 me-3"
                v-for="(item, index) in buttonsCategory"
                :key="index"
                :class="{'active': isActive(index), 'add-button': item === '+'}"
                @click="toggleButton(index,item)"
            >{{ item }}</button>
        </div>
      </div>
      <div class="color-yellow h2 mt-4">Все</div>
    </div>
</div>

  <div class="container">
    <div class="row">
    <div class="col-3 position-relative">
      <div class="product-card p-0 position-relative">
        <img src="@/assets/images/woman.png">
        <div class="product-info ">
          <div class="product-title mb-2">Батончик протеиновый</div>
          <div class="product-price color-yellow d-flex ">15 TJS
            <span class="product-old-price text-white "><s>22 c</s>
            </span>
          </div>
        </div>
        </div>
    <div class="product-card-menu">
    <div class="position-relative "><img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
      <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
        <div  class="d-flex align-items-center justify-content-between px-3 py-4">
          <p class="m-0">Редактировать</p>
          <img class="img-width-20 ms-5" src="@/assets/images/icons/pencel.png">
        </div>
        <div class="d-flex align-items-center justify-content-between px-3 py-4">
          <p @click="toggleModal('.user-delete-modal')" class="m-0 blocked">Удалить</p>
          <img class="img-width-20 ms-5" src="@/assets/images/icons/delete.png">
        </div>
      </div>
    </div>
    </div>
    </div>
    <div class="col-3 position-relative">
      <div class="product-card p-0 position-relative">
        <img src="@/assets/images/woman.png">
        <div class="product-info ">
          <div class="product-title mb-2">Батончик протеиновый</div>
          <div class="product-price color-yellow d-flex ">15 TJS
            <span class="product-old-price text-white "><s>22 c</s>
            </span>
          </div>
        </div>
        </div>
    <div class="product-card-menu">
    <div class="position-relative "><img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
      <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
        <div @click="dllStatus=true , addStatusDelay('dllStatus')" class="d-flex align-items-center justify-content-between px-3 py-4">
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
    <div class="col-3 position-relative">
      <div class="product-card p-0 position-relative">
        <img src="@/assets/images/woman.png">
        <div class="product-info ">
          <div class="product-title mb-2">Батончик протеиновый</div>
          <div class="product-price color-yellow d-flex ">15 TJS
            <span class="product-old-price text-white "><s>22 c</s>
            </span>
          </div>
        </div>
        </div>
    <div class="product-card-menu">
    <div class="position-relative "><img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
      <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
        <div @click="dllStatus=true , addStatusDelay('dllStatus')" class="d-flex align-items-center justify-content-between px-3 py-4">
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
    <div class="col-3 position-relative">
      <div class="product-card p-0 position-relative">
        <img src="@/assets/images/woman.png">
        <div class="product-info ">
          <div class="product-title mb-2">Батончик протеиновый</div>
          <div class="product-price color-yellow d-flex ">15 TJS
            <span class="product-old-price text-white "><s>22 c</s>
            </span>
          </div>
        </div>
        </div>
    <div class="product-card-menu">
    <div class="position-relative "><img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
      <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
        <div class="d-flex align-items-center justify-content-between px-3 py-4">
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
    <div class="col-3 position-relative">
      <div class="product-card p-0 position-relative">
        <img src="@/assets/images/woman.png">
        <div class="product-info ">
          <div class="product-title mb-2">Батончик протеиновый</div>
          <div class="product-price color-yellow d-flex ">15 TJS
            <span class="product-old-price text-white "><s>22 c</s>
            </span>
          </div>
        </div>
        </div>
    <div class="product-card-menu">
    <div class="position-relative "><img class="p-2 edit-card-hover" src="@/assets/images/icons/menu.png">
      <div class="col bg-black h-auto statistics m-0 p-4 position-absolute edit-card  ">
        <div @click="dllStatus=true , addStatusDelay('dllStatus')" class="d-flex align-items-center justify-content-between px-3 py-4">
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
  </div>


  <div  @click="toggleModal('.add-money-modal')" class="add-user-modal d-none add-money-modal d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <h5>ДОБАВИТЬ КАТЕГОРИЮ</h5>
      <div class="courses mt-3">
        <div class="form mt-3 ">
          <label for="sum">Заголовок*</label>
          <input v-model="AddCategory" type="text" placeholder="Введите название категории" id="sum">
        </div>
        <div class="cards-infos">
          <div class="d-flex justify-content-between add-user-buttons">
            <button class="dont">Отмена</button>
            <button @click="addCategory" class="submit" type="button">Добавить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="addCardHoliday=!addCardHoliday" v-if="addCardHoliday" class="add-user-modal d-flex justify-content-center align-items-center ">
    <div @click.stop  class="content">
      <div class="title">ДОБАВИТЬ ПРОДУКТ</div>
      <div class="form position-relative">
        <label  for="surname">Заголовок**</label>
        <input ref="inputText" type="text" placeholder="Введите заголовок" id="heading">
      </div>
      <div class="form position-relative">
        <label for="phone">Описание*</label>
        <textarea ref="descriptionTextarea"  type="text"  placeholder="Введите текст" class="description"
        ></textarea>
      </div>

      <div class="form position-relative">
        <label for="phone">Описание*</label>
        <div class="img-card row p-3 justify-content-between">
        <div v-for="(image, index) in images" :key="index" class="card-add-img m-2">
            <img :src="image" class="card-img-top" alt="Product Image">
        </div>
          <div class="card-button align-content-center text-center m-2" @click="selectImage">
            <button class="add-button">+</button>
          </div>
        </div>
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none">
      </div>

      <div class="form position-relative">
        <label for="name">Категория*</label>
        <input  type="text" :value="picked" id="present">
        <img @click="presentMenu=!presentMenu" :class="{'rotate-90':presentMenu}" class="row-right-icon" src="@/assets/images/icons/row-right.png">
        <div :class="{'d-block':presentMenu}" class="menu-type-1 pt-4 px-4 ">
          <div v-for="item in buttonsCategory" class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input v-if=" item!=='Все' & item!=='+'"   @click="presentMenu=false" type="radio" :id="item" :value="item" v-model="picked" />
            <label v-if=" item!=='Все' & item!=='+'" class="text-white" :for="item">{{item}}</label>
          </div>
          <hr>
        </div>
      </div>

      <div class="d-flex justify-content-between mt-3 text-center">
        <div  class=" form col position-relative">
          <label  for="surname">Цена за шт.*</label>
          <input type="text"  id="heading">
        </div>
        <div  class=" form col mx-2 position-relative">
          <label  for="surname">Скидка</label>
          <input type="text"  id="heading">
        </div>
        <div  class=" form col position-relative">
          <label  for="surname">Итого</label>
          <input type="text"  id="heading">
        </div>
      </div>
      <div class="d-flex justify-content-between add-user-buttons">
        <button @click="addCardHoliday=false" class="dont">Отмена</button>
        <button class="submit" type="button" @click="addCardHoliday=false, addStatus=true, StatusDelay('addStatus') ">Добавить</button>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  data(){
    return{
      dllStatus:false,
      images: [],
      addCardHoliday:false,
      presentMenu:false,
      picked:'',
      AddCategory:'',
      searchActive:'',
      addStatus:false,
      addCard:false,
      buttonsCategory: ['Все', 'Батончики', 'Печенья', 'Коктейли', '+'],
      activeButtons: [0],
      modal:'auto',
      modalSelector:'',
    }
  },
  watch: {
    modal() {
      this.updateToggleModal();
    }
  },
  methods:{
    StatusDelay(i){
      setTimeout(()=>{
        this[i]=false
      },3000)
    },
    addCategory(){
      if (this.AddCategory!==''){
        this.buttonsCategory.pop()
        this.buttonsCategory.push(this.AddCategory)
        this.buttonsCategory.push('+')
        this.AddCategory=''
        this.activeButtons
        this.toggleModal('.add-money-modal')
        this.activeButtons.push(-1)
      }
    },
    toggleButton(index,add) {
      const position = this.activeButtons.indexOf(index);
      console.log(add)
      if (add==='+'){
        this.toggleModal('.add-money-modal')
      }else{
        if (position !== -1) {
          this.activeButtons.splice(position, 1);
        }
        else {
          this.activeButtons.push(index);
        }
      }

    },
    isActive(index) {
      return this.activeButtons.includes(index);

    },
    updateToggleModal() {
      if (this.modal==="auto"){
        document.querySelector(this.modalSelector).classList.add("d-none")
        document.body.style.overflow=this.modal
      }else {
        document.body.style.overflow=this.modal
        document.querySelector(this.modalSelector).classList.remove("d-none")
      }

    },
    toggleModal(modalSelector) {
      this.modal = this.modal === 'auto' ? 'hidden' : 'auto';
      this.modalSelector=modalSelector
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },

  },
}

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

</style>