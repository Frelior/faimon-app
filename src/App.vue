<script lang="ts" setup>
import MenuComponent from './components/MenuComponent/MenuComponent.vue'
import HeaderComponent from './components/HeaderComponent/HeaderComponent.vue'
</script>

<template>
  <HeaderComponent />
  <div class="container">
    <MenuComponent />
    <div class="main-window"><router-view /></div>
  </div>
</template>

<style scoped>
.container {
  /* outline: 1px solid red; */
}
</style>
