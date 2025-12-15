<script setup lang="ts">
import SocialLinks from '../SocialLinks/SocialLinks.vue'
</script>

<template>
  <div class="header-component">
    <div class="logo"><img src="/src/media/icons/logo.png" /></div>
    <SocialLinks />
  </div>
</template>

<style scoped>
.header-component {
  outline: 1px solid red;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7rem;

  .logo {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
