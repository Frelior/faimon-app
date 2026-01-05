<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { RouterLink } from 'vue-router'
async function logout() {
  await supabase.auth.signOut()
  window.location.reload()
}
</script>

<template>
  <div class="view-container admin-view">
    <div class="header">
      <div class="nav">
        <RouterLink class="link" to="/admin/edit-character"
          >Изменение/добавление персонажа</RouterLink
        >
        <RouterLink class="link" to="/admin/edit-info">Правки в инфо блоке</RouterLink>
        <button class="link" @click="logout">Выйти из аккаунта</button>
      </div>
    </div>

    <RouterView />
  </div>
</template>

<style scoped>
.admin-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .header {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;

    .nav {
      display: flex;
      gap: 1rem;

      .link {
        cursor: pointer;
        font-size: 1.6rem;
        border: 0.3rem solid var(--font-orange-05);
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        line-height: unset;

        &.router-link-active {
          background-color: var(--font-orange-05);
          color: white;
        }
      }
    }
  }
}
</style>
