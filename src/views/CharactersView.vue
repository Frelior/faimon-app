<script setup lang="ts">
import { computed } from 'vue'
import CharacterHexagonComponent from '@/components/CharacterHexagonComponent/CharacterHexagonComponent.vue'
import { useCharactersStore } from '@/stores/characterStore'

const charactersStore = useCharactersStore()
const characters = computed(() => charactersStore.characters)
</script>

<template>
  <div class="characters-view view-container">
    <CharacterHexagonComponent
      v-for="character in characters"
      :key="character.id"
      :character="character"
      class="characters-view__item"
      @mouseenter="charactersStore.changeCurrentCharacterId(character.id)"
      @focus="charactersStore.changeCurrentCharacterId(character.id)"
    />
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
  gap: 1rem;

  .characters-view__item {
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
