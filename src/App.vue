<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from "@/pages/NavBar.vue"

const route = useRoute()

const isAuthPage = computed(() =>
  route.fullPath === '/login' || route.fullPath === '/delete-account'
)
</script>

<template>
  <!-- NavBar только не на auth-страницах -->
  <NavBar v-if="!isAuthPage" />

  <!-- Layout wrapper -->
  <div :class="['app-layout', { 'pb-150': !isAuthPage }]">
    <router-view />
  </div>
</template>

<style>
/* ГЛОБАЛЬНЫЕ layout-стили (НЕ scoped) */

.app-layout {
  min-height: 100vh;
}

</style>
