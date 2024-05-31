<template>

  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title blocked "><router-link to="/clients" class="blocked"><img class="px-3 pb-2 blocked " src="@/assets/images/icons/Stroke.png">Заблокированные</router-link></div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-between align-items-center search-block">
          <img src="@/assets/images/icons/search.png" alt="search">
          <input type="text" placeholder="Поиск по всем параметрам">
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="users-block">
          <table class="">
            <thead>
            <tr>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Статус</th>
              <th>Абонемент</th>
              <th>Курсы</th>
              <th>Услуги</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent blocked-abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi blue blocked-abonent">1</div>
                <div class="uslugi red blocked-abonent">1</div>
                <div class="uslugi green blocked-abonent">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent blocked-abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi green blocked-abonent">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent blocked-abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi blue blocked-abonent">1</div>
              </td>
            </tr>
            <tr>
              <td>Азиза Султанова</td>
              <td>92 000 00 00</td>
              <td>Bronze</td>
              <td class="d-flex justify-content-center"><div class="abonent blocked-abonent">1</div></td>
              <td>Кардио</td>
              <td class="d-flex justify-content-center">
                <div class="uslugi red blocked-abonent">1</div>
                <div class="uslugi green blocked-abonent">1</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="user-block-bottom">
          <div class="d-flex justify-content-between">
            <div class="left">Общее количество пользователей: <span class="users-quantity blocked">2504</span></div>
            <div class="right">
              <a class="active" href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a href="#">6</a>
              <a href="#">7</a>
              <a href="#">8</a>
              <a href="#">9</a>
              <a href="#">10</a>
              <a>...</a>
              <a href="#">30</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>