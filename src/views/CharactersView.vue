<script setup lang="ts">
import CharacterHexagonComponent from '@/components/CharacterHexagonComponent/CharacterHexagonComponent.vue'
import { useCharactersStore } from '@/stores/characterStore'
import FiltersComponent from '@/components/FiltersComponent/FiltersComponent.vue'
import { computed } from 'vue'

const charactersStore = useCharactersStore()
const filteredCharacters = computed(() => charactersStore.filteredCharacters)
</script>

<template>
  <div class="view-container">
    <FiltersComponent />
    <div class="characters-view">
      <CharacterHexagonComponent
        v-for="character in filteredCharacters"
        :key="character.id"
        :character="character"
        class="characters-view__item"
        @mouseenter="charactersStore.changeCurrentCharacterId(character.id)"
        @focus="charactersStore.changeCurrentCharacterId(character.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.view-container {
  gap: 3rem;
}
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
