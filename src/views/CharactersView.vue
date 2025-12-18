<script setup lang="ts">
import CharacterHexagonComponent from '@/components/CharacterHexagonComponent/CharacterHexagonComponent.vue'
// const characters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
</script>

<template>
  <div class="characters-view view-container">
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
    <CharacterHexagonComponent class="characters-view__item" />
  </div>
</template>

<style scoped>
.characters-view {
  --size: 7.5rem;

  display: grid;
  justify-content: center;
  grid-template-columns: repeat(12, var(--size));
  grid-auto-rows: var(--size);
  margin-bottom: var(--size);
  place-items: start center;
  gap: 5px;

  .characters-view__item {
    object-fit: cover;
    width: calc(var(--size) * 2);
    height: calc(var(--size) * 2);
    grid-column: auto / span 2;

    &:nth-child(11n - 4) {
      grid-column: 2 / span 2;
    }
    &:nth-child(7) {
      grid-column: 2 / span 2;
    }
  }
}
</style>
