<script lang="ts" setup>
import MenuComponent from './components/MenuComponent/MenuComponent.vue'
import HeaderComponent from './components/HeaderComponent/HeaderComponent.vue'
</script>

<template>
  <HeaderComponent />
  <MenuComponent />
  <div class="main-window"><router-view /></div>
</template>

<style scoped></style>
