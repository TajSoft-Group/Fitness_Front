<template>
  <div class="d-flex justify-content-between align-items-center">
    <div>
      <div class="button-type-2 rotate-180" @click="previousDay"><img src="@/assets/images/icons/button-img-right.png"></div>
    </div>
    <div class="calendar-title" v-for="item in days" :key="item.day" :class="{ 'selected': selectedDay === item.day }" @click="selectDay(item.day)">
      {{ item.day }}<br>{{ item.dayOfWeek }}
    </div>
    <div class="button-type-2" @click="nextDay"><img src="@/assets/images/icons/button-img-right.png"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: [],
      currentDate: new Date(), // переменная для текущей даты
      selectedDay: null // выбранный день
    };
  },
  created() {
    this.getDayOfWeek();
  },
  methods: {
    getDayOfWeek() {
      this.days = []; // очищаем массив перед заполнением новыми значениями

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(this.currentDate); // создаем копию текущей даты
        currentDate.setDate(currentDate.getDate() - i);

        let dayOfWeek = currentDate.getDay();
        let daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

        this.days.push({
          day: currentDate.getDate(),
          dayOfWeek: daysOfWeek[dayOfWeek]
        });
      }
      this.days.reverse(); // разворачиваем массив для правильного отображения
    },
    previousDay() {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
      this.getDayOfWeek();
    },
    nextDay() {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
      this.getDayOfWeek();
    },
    selectDay(day) {
      this.selectedDay = day;
      console.log(`Выбран день: ${day}`);
    }
  }
};
</script>

<style scoped>

</style>
