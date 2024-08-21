<template>
  <div class="">
    <div class="header mx-5 mt-5">
      <button class="current-month-bt button-left" @click="previousMonth"></button>
      <div class="current-month mx-3">{{ monthName }}</div>
      <button class="current-month-bt"   @click="nextMonth"></button>
    </div>
    <div class="week-days mx-3 mt-5">
      <span v-for="day in weekDays" :key="day">{{ day }}</span>
    </div>
    <div class="days mx-3 mt-4">
      <span
          v-for="day in emptyDays"
          :key="'empty-' + day"
          class="empty"
      ></span>
      <span
          class=""
          v-for="day in daysInMonth"
          :key="day"
          :class="{
          selected: isSelected(day),
          'range-start': isRangeStart(day),
          'range-end': isRangeEnd(day),
          'in-range': isInRange(day),
          today: isToday(day)
        }"
          @click="selectDate(day)"
      >
        {{ day }}
      </span>
    </div>
    <div class="buttons d-flex justify-content-between mt-5">
      <button @click="cancel" class="button-type-1 bg-gray">Отмена</button>
      <button @click="save" class="b bg-yellow button-type-1">Сохранить</button>
    </div>
  </div>
</template>

<script>
export default  {
  data() {
    return {
      currentDate: new Date(),
      rangeStart: null,
      rangeEnd: null,
      selectingRangeEnd: false,
    };
  },
  computed: {
    currentYear() {
      return this.currentDate.getFullYear();
    },
    currentMonth() {
      return this.currentDate.getMonth();
    },
    monthName() {
      return this.currentDate.toLocaleString('default', { month: 'long' });
    },
    daysInMonth() {
      const days = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      return Array.from({ length: days }, (_, i) => i + 1);
    },
    weekDays() {
      return ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    },
    emptyDays() {
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
      return firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    },
  },
  methods: {
    previousMonth() {
      this.currentDate.setMonth(this.currentMonth - 1);
      this.currentDate = new Date(this.currentDate);
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentMonth + 1);
      this.currentDate = new Date(this.currentDate);
    },
    selectDate(day) {
      const selectedDate = new Date(this.currentYear, this.currentMonth, day);

      if (!this.selectingRangeEnd) {
        this.rangeStart = selectedDate;
        this.rangeEnd = null;
        this.selectingRangeEnd = true;
      } else {
        if (selectedDate >= this.rangeStart) {
          this.rangeEnd = selectedDate;
          this.selectingRangeEnd = false;
        } else {
          this.rangeStart = selectedDate;
        }
      }
    },
    isSelected(day) {
      return (
          this.rangeStart &&
          this.rangeStart.getDate() === day &&
          this.rangeStart.getMonth() === this.currentMonth &&
          this.rangeStart.getFullYear() === this.currentYear
      );
    },
    isRangeStart(day) {
      return this.isSelected(day);
    },
    isRangeEnd(day) {
      return (
          this.rangeEnd &&
          this.rangeEnd.getDate() === day &&
          this.rangeEnd.getMonth() === this.currentMonth &&
          this.rangeEnd.getFullYear() === this.currentYear
      );
    },
    isInRange(day) {
      if (this.rangeStart && this.rangeEnd) {
        const date = new Date(this.currentYear, this.currentMonth, day);
        return date > this.rangeStart && date < this.rangeEnd;
      }
      return false;
    },
    isToday(day) {
      const today = new Date();
      return (
          today.getDate() === day &&
          today.getMonth() === this.currentMonth &&
          today.getFullYear() === this.currentYear
      );
    },
    cancel() {
      this.rangeStart = null;
      this.rangeEnd = null;
      this.selectingRangeEnd = false;
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
    save() {
      const rangeStart = this.rangeStart ? this.formatDate(this.rangeStart) : null;
      const rangeEnd = this.rangeEnd ? this.formatDate(this.rangeEnd) : rangeStart;

      if (!rangeStart && !rangeEnd) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const firstDayNextMonth = new Date(year, today.getMonth() + 1, 1);
        const lastDayOfMonth = new Date(firstDayNextMonth - 1);
        const lastDay = String(lastDayOfMonth.getDate()).padStart(2, '0');

        this.dates = {
          dateFrom: `${year}-${month}-01`,
          dateTo: `${year}-${month}-${lastDay}`,
        };
      } else {
        this.dates = {
          dateFrom: rangeStart,
          dateTo: rangeEnd,
        };
      }

      this.$emit('date-selected', this.dates); // Emit the dates to the parent
    },
  },
};
</script>

<style scoped>
.date-picker {
  background-color: #333;
  border-radius: 45px;
  color: #fff;
  width: 600px;
  height: 600px;
  padding: 0 10px;
}
.header {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 10px;
}
.week-days span,
.days span {
  width: 14.28%;
  text-align: center;
  margin-bottom: 5px;
}
.empty {
  visibility: hidden;
}
.days span {
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
}
.days span:hover {
  background-color: #555;
}
.selected,
.range-start,
.range-end {
  background-color: #ccff33;
  color: #333;
}
.in-range {
  background-color: rgba(204, 255, 51, 0.5);
}
.today {
  border: 1px solid #ccff33;
}
</style>
