<template>
  <div class="container">
    <div class="row">
      <div class="col-6 d-flex justify-content-between">
        <div class="col-8 statistics w-75 bg-gray h-auto p-4 ">
          <div class="left d-flex align-items-center">
            <div class="teacher-img border-3px border-color-yellow img-width-70 border-color-yellow">
              <img class="img-width-70" src="@/assets/images/avatar.jpg" >
            </div>
            <div class="user-info m-0 col w-100">
              <div class="result-true-title ">АЗИЗА СУЛТАНОВА</div>
              <div class="d-flex justify-content-between">
                <div>
                  <div class="h6">+992 92 000 0000</div>
                  <div class="h6 color-yellow">Bronze</div>
                </div>
                <div class="">
                  <div class="h6 ">500 TJS</div>
                  <div class="h6 ">20 баллов</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-3 statistics bg-gray h-auto">

        </div>
      </div>

      <div class="col 4">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {


    return {}
  },
  methods:{
    test1(){
      document.cookie = `token=; path=/`;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>