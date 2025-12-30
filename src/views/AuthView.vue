<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

async function login() {
  await supabase.auth.signInWithOAuth({
    provider: 'discord',
  })
}
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
