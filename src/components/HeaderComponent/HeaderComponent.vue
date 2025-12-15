<script setup lang="ts">
import SocialLinks from '../SocialLinks/SocialLinks.vue'
</script>

<template>
  <div class="header-component">
    <div class="container">
      <div class="logo"><img src="/src/media/icons/logo.png" /></div>
      <SocialLinks />
    </div>
  </div>
</template>

<style scoped>
.header-component {
  /* outline: 1px solid red; */
  height: 10rem;
  padding: 2rem 0;
  /* background-color: black; */

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* outline: 1px solid rgb(0, 89, 255); */
    height: 100%;
    width: 100%;

    .logo {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
