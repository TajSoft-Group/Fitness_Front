<script setup>
import NavBar from "@/pages/NavBar.vue";
</script>

<template>

  <nav-bar v-if="$route.fullPath!=='/login'" />
  <router-view/>
</template>

<style scoped>

</style>
