<template>


  <div class="container">
    <div class="row relative">
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

      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title"><router-link to="/"><img class="px-3 pb-2" src="@/assets/images/icons/Stroke.png">Шкафчики</router-link></div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="editStatus=false,editStatusPicked=false, toggleModal('.add-user-modal') " class="add-user-btn">Добавить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="toggleModal('.add-user-modal')" class="add-user-modal d-flex justify-content-center align-items-center d-none">
    <div @click.stop class="content">
      <div v-if="editStatus ? messageRead='РЕДАКТИРОВАТЬ':messageRead='ДОБАВИТЬ ШКАФЧИК'" class="title">{{messageRead}}</div>
      <div class="form">
        <label for="name">Номер шкафчика*</label>
        <input v-model="addLockers.id" maxlength="3" type="number" placeholder="Введите номер шкафчика" id="name">
      </div><div class="d-none">{{editStatusPicked ? picked=addLockers.status:newPicked=picked}}</div>
      <div class="form position-relative">
        <label for="name">Статус шкафчика*</label>
        <input id="present" name="menu"  v-model="picked" placeholder="Выберите статус шкафчика" type="text" readonly >
        <img @click="presentMenu=!presentMenu" :class="{'rotate-90':presentMenu}" class="row-right-icon" src="@/assets/images/icons/row-right.png">
        <div :class="{'d-block':presentMenu}" class="menu-type-1 pt-4 px-4 ">
          <div @click="editStatusPicked=false" class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input  type="radio" id="yoga" name="menu" value="Занято" v-model="picked" />
            <label class="text-white d-flex align-items-center" for="yoga">
              <div class="locker-status bg-red me-3"></div>
              <div class="h5 text-white m-0">Занято</div>
            </label>
          </div>
          <hr>
          <div @click="editStatusPicked=false" class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="yoga" name="menu" value="Свободно" v-model="picked" />
            <label class="text-white d-flex align-items-center" for="yoga">
              <div class="locker-status bg-yellow me-3"></div>
              <div class="h5 text-white m-0">Свободно</div></label>
          </div>
          <hr>
          <div @click="editStatusPicked=false" class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="yoga" name="menu" value="Не работает" v-model="picked"  />
            <label class="text-white d-flex align-items-center" for="yoga">
              <div class="locker-status bg-gray-2 me-3"></div>
              <div class="h5 text-white m-0">Не работает</div></label>
          </div>
          <hr>
        </div>
        <div class="d-flex justify-content-between mt-4">
        <button @click="toggleModal('.add-user-modal')" class="button-type-1">Отмена</button>
        <button v-if="!editStatus" @click="addInfo(addLockers,lockersArr), toggleModal('.add-user-modal')"  class="button-type-1 bg-yellow">Добавить</button>
        <button v-if="editStatus" @click="saveLockers(),toggleModal('.add-user-modal')"  class="button-type-1 bg-yellow">Сохранить</button>
        </div>
      </div>
    </div>
  </div>


  <div class="container relative">
    <div class="row">
      <div class="col justify-content-between align-items-center mt-4">
        <div :class="{'search-input':searchActive.length>0}" class="d-flex justify-content-between align-items-center search-block m-0">
          <img src="@/assets/images/icons/search.png" alt="search">
          <input v-model="searchActive"  type="text" id="searchInput" placeholder="Поиск по всем параметрам">
          <a @click="filterStatus=!filterStatus" class="position-relative">
            <div class="filter-icon d-flex justify-content-center align-items-center position-relative">
              <img class="position-static "  src="/src/assets/images/icons/filter.png" alt="user"></div>

          <div v-if="filterStatus" class="position-absolute filter-block p-4 bg-black h-auto right">
            <div class="d-flex align-items-center">
              <div class="locker-status bg-red me-3"></div>
              <div class="h5 text-white m-0">Занято</div>
            </div>
            <hr>
            <div class="d-flex align-items-center">
              <div class="locker-status bg-yellow me-3"></div>
              <div class="h5 text-white m-0">Свободно</div>
            </div>
            <hr>
            <div class="d-flex align-items-center">
              <div class="locker-status bg-gray-2 me-3"></div>
              <div class="h5 text-white m-0">Не работает</div>
            </div>
            <hr>
          </div>
          </a>
        </div>
      </div>
    </div>

    <div class="col">
      <div v-show="searchActive.length > 0" class="users-block search-result-block p-4">
        <div v-for="i in filteredLockers" :key="i.id" class="locker-col position-relative mt-4">
          <div @click="toggleFilterBlock(i)" :class="{
          'bg-yellow': i.status === 'Свободно',
          'bg-red': i.status === 'Занято',
          'bg-gray-2': i.status === 'Не работает',
        }" class="locker-col position-relative mt-4">
            <div>{{ i.id }}</div>
            <div>
              <img class="position-absolute top-0 pt-4 right pe-3" src="@/assets/images/icons/menu-3.png">
              <div v-if="i.showFilterBlock"  class="position-absolute filter-block p-4 top-0 mt-4 bg-black h-auto">
                <div @click="editLockers(i.id),searchActive='',toggleModal('.add-user-modal'), editStatus=true,editStatusPicked=true" class="d-flex align-items-center justify-content-between">
                  <div class="h5 text-white m-0">Редактировать</div>
                  <img class="img-width-20" src="@/assets/images/icons/pencel.png">
                </div>
                <hr>
                <div class="d-flex align-items-center justify-content-between">
                  <div v-show="i.open ? message ='Открыть шкафчик' : message='Закрыть шкафчик'" class="h5 text-white m-0">{{ message }}</div>
                  <img :class="{'rotate-180':!i.open}" class="img-width-20" src="@/assets/images/icons/take-money.png">
                </div>
                <hr>
                <div v-if="i.status!=='Занято'" class="d-flex align-items-center justify-content-between">
                  <div  v-show="i.open ? messageBlock='Заблокировать' : messageBlock='Разблокировать'" class="h5 text-white m-0">{{ messageBlock }}</div>
                  <img class="img-width-20" src="@/assets/images/icons/blocked.png">
                </div>
                <hr>
                <div @click="dellLockers(i.id)" v-if="i.status!=='Занято'" class="d-flex align-items-center justify-content-between">
                  <div class="h5 text-white blocked m-0">Удалить</div>
                  <img class="img-width-20" src="@/assets/images/icons/delete.png">
                </div>
              </div>
            </div>
            <div class="fs-6 position-absolute bottom-0 right pe-3">{{ i.status }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="container">
    <div class="lockers-list mt-5 row">
      <div v-for="i in lockersArr" :key="i.id" class="col-2">
        <div @click="toggleFilterBlock(i,lockersArr)" :class="{
          'bg-yellow': i.status === 'Свободно',
          'bg-red': i.status === 'Занято',
          'bg-gray-2': i.status === 'Не работает',
        }" class="locker-col position-relative mt-4">
          <div>{{ i.id }}</div>
          <div>
            <img class="position-absolute top-0 pt-4 right pe-3" src="@/assets/images/icons/menu-3.png">
            <div v-if="i.showFilterBlock"  class="position-absolute filter-block p-4 top-0 mt-4 bg-black h-auto">
              <div @click="editLockers(i.id),toggleModal('.add-user-modal'), editStatus=true,editStatusPicked=true" class="d-flex align-items-center justify-content-between">
                <div class="h5 text-white m-0">Редактировать</div>
                <img class="img-width-20" src="@/assets/images/icons/pencel.png">
              </div>
              <hr>
              <div class="d-flex align-items-center justify-content-between">
                <div @click="saveLockers('openClose',i.id)"
                     v-show="i.open ? message ='Открыть шкафчик' : message='Закрыть шкафчик'"
                     class="h5 text-white m-0">{{ message }}</div>
                <img
                    :class="{'rotate-180':!i.open}"
                    class="img-width-20"
                    src="@/assets/images/icons/take-money.png">
              </div>
              <hr>
              <div v-if="i.status!=='Занято'" class="d-flex align-items-center justify-content-between">
                <div  v-show="i.open ? messageBlock='Заблокировать' : messageBlock='Разблокировать'" class="h5 text-white m-0">{{ messageBlock }}</div>
                <img class="img-width-20" src="@/assets/images/icons/blocked.png">
              </div>
              <hr>
              <div @click="dellLockers(i.id)" v-if="i.status!=='Занято'" class="d-flex align-items-center justify-content-between">
                <div class="h5 text-white blocked m-0">Удалить</div>
                <img class="img-width-20" src="@/assets/images/icons/delete.png">
              </div>
            </div>
          </div>
          <div class="fs-6 position-absolute bottom-0 right pe-3">{{ i.status }}</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { ref } from 'vue'
const picked = ref(``)
</script>
<script>
export default {

  data(){
    return{
      lockersArr:[{id:1,status:'Не работает',open:false,blocked:1},{id:2,status:'Свободно',open:1,blocked:1},{id:3,status:'Занято',open:false,blocked:0}],
      addLockers:{id:'',status:'Не работает',open:true,blocked:0},
      editStatus:false,
      presentMenu:false,
      filterStatus:false,
      editStatusPicked:true,
      searchActive:'',
      addStatus:true,
      addCard:false,
      modal:'auto',
      modalSelector:'',
      newPicked:'',
      message:'',
      messageBlock:'',
    }
  },
  methods:{
    addStatusDelay(){
      setTimeout(()=>{
        this.addStatus=false
      },2000)
    },
    toggleModal(modalSelector) {
      this.modal = this.modal === 'auto' ? 'hidden' : 'auto';
      this.modalSelector = modalSelector;
    },
    updateToggleModal() {
      if (this.modal==="auto"){
        document.querySelector(this.modalSelector).classList.add("d-none")
        document.body.style.overflow=this.modal
      }else{
        document.body.style.overflow=this.modal
        document.querySelector(this.modalSelector).classList.remove("d-none")
      }

    },
    toggleFilterBlock(locker,i) {
      locker.showFilterBlock = !locker.showFilterBlock;
      for (let item of i){
        if (item.id!==locker.id){
          item.showFilterBlock=false
        }
      }


    },
    addInfo(data, arr){
      let index =this.lockersArr.findIndex(item => item.id === this.addLockers.id);
      if (index === -1){
        data.status=this.newPicked
        arr.push({...data})
      }
    },
    dellLockers(id){
      let index =this.lockersArr.findIndex(item => item.id === id);
      if (index !== -1){
        this.lockersArr.splice(index, 1)
      }
    },
    editLockers(id){
      let ed = this.lockersArr.find(item => item.id ===id)
      this.addLockers={...ed}
      console.log(ed)
    },
    saveLockers(f,id){
      if(f==='openClose'){
        let ed = this.lockersArr.find(item => item.id === id)
        let index = this.lockersArr.findIndex(item => item.id === id);
        if (index !== -1) {
          ed.open=!ed.open
          this.lockersArr.splice(index, 1, {...ed})
        }
      }
      else {
        let index = this.lockersArr.findIndex(item => item.id === this.addLockers.id);
        if (index !== -1) {
          this.addLockers.status = this.newPicked
          this.lockersArr.splice(index, 1, {...this.addLockers})
        }
      }
    }
  },
  watch: {
    modal() {
      this.updateToggleModal();
    },
  },
  mounted() {
    this.addStatusDelay();

  },
  computed: {
    filteredLockers() {
      return this.lockersArr.filter(locker => {
        const searchString = this.searchActive.toLowerCase()
        return (
            locker.id.toString().includes(searchString) ||
            locker.status.toLowerCase().includes(searchString) ||
            (locker.open ? 'открыт' : 'закрыт').toLowerCase().includes(searchString) ||
            (locker.blocked ? 'заблокирован' : 'разблокирован').toLowerCase().includes(searchString)
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
