<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="view-container admin-view">
    <h1>Админ панель</h1>
    <RouterLink to="/admin/characters">Изменение/добавление персонажа</RouterLink>
    <RouterLink to="/admin/tierlist">Правки в тир-листе</RouterLink>
  </div>
</template>

<style scoped></style>
