<script setup lang="ts">
import SocialLinks from '../SocialLinks/SocialLinks.vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
</script>

<template>
  <div class="header-component">
    <div class="container">
      <RouterLink to="/" class="logo"
        ><img src="/src/media/icons/logo.png" tabindex="0"
      /></RouterLink>
      <button class="logout" v-if="authStore.isAuthenticated" @click="authStore.logout">
        Выйти
      </button>
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

    .logout {
      margin-right: 1rem;
      font-size: 1rem;
      border: 0.2rem solid var(--font-orange-05);
      color: var(--font-orange);
      width: fit-content;
      margin-left: auto;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background-color: transparent;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.192);
      }
    }

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
