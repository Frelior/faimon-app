<script setup lang="ts">
const props = defineProps<{
  id: string
}>()

const characterId = Number(props.id)
</script>

<template>
  <div class="view-container">CharacterPage {{ characterId }}</div>
</template>

<style scoped></style>
