<script setup lang="ts">
import SocialLinks from '../SocialLinks/SocialLinks.vue'
</script>

<template>
  <div class="header-component">
    <div class="logo">Logo</div>
    <SocialLinks />
  </div>
</template>

<style scoped>
.header-component {
  outline: 1px solid red;

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
}
</style>
