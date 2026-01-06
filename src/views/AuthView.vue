<script setup lang="ts">
import { login } from '@/lib/supabaseClient'
</script>

<template>
  <div class="view-container auth-view">
    <button @click="login">Войти с помощью Discord</button>
  </div>
</template>

<style scoped>
.auth-view {
}
</style>
