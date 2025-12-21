<script setup lang="ts">
import CharacterHexagonComponent from '@/components/CharacterHexagonComponent/CharacterHexagonComponent.vue'
import { useCharactersStore } from '@/stores/characterStore'
const characters = [
  {
    id: 1,
    name: 'ichigoInitial',
  },
  {
    id: 2,
    name: 'ichigoShikai',
  },
  {
    id: 3,
    name: 'ichigoBankai',
  },
  {
    id: 4,
    name: 'rukia',
  },
  {
    id: 5,
    name: 'orihime',
  },
  {
    id: 6,
    name: 'chad',
  },
  {
    id: 7,
    name: 'yoruichi',
  },
  {
    id: 8,
    name: 'byakuya',
  },
  {
    id: 9,
    name: 'urahara',
  },
  {
    id: 10,
    name: 'yachiru',
  },
  {
    id: 11,
    name: 'nemu',
  },
  {
    id: 12,
    name: 'renji',
  },
  {
    id: 13,
    name: 'ururu',
  },
  {
    id: 14,
    name: 'uryu',
  },
  {
    id: 15,
    name: 'sajin',
  },
  {
    id: 16,
    name: 'ikkaku',
  },
  {
    id: 17,
    name: 'kaname',
  },
]
const charactersStore = useCharactersStore()
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
