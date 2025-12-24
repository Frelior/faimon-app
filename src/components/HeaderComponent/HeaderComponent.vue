<script setup lang="ts">
import SocialLinks from '../SocialLinks/SocialLinks.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="header-component">
    <div class="container">
      <RouterLink to="/" class="logo"
        ><img src="/src/media/icons/logo.png" tabindex="0"
      /></RouterLink>
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
