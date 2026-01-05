<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  
  })
  if (error) {
    console.error(error)
    return
  }
  console.log(data)
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
