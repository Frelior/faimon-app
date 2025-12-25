<script setup lang="ts">
import CharacterHexagonComponent from '@/components/CharacterHexagonComponent/CharacterHexagonComponent.vue'
import { useCharactersStore } from '@/stores/characterStore'
import FiltersComponent from '@/components/FiltersComponent/FiltersComponent.vue'
import { computed, ref } from 'vue'

const isCardsView = ref(false)
const charactersStore = useCharactersStore()
const filteredCharacters = computed(() => charactersStore.filteredCharacters)
</script>

<template>
  <div class="view-container">
    <FiltersComponent />
    <div class="toggler" @click="isCardsView = !isCardsView" :class="{ on: isCardsView }"></div>
    <div class="characters-view" :class="{ cards: isCardsView }">
      <CharacterHexagonComponent
        v-for="character in filteredCharacters"
        :key="character.id"
        :character="character"
        class="characters-view__item"
        :squared="isCardsView"
        @mouseenter="charactersStore.changeCurrentCharacterId(character.id)"
        @focus="charactersStore.changeCurrentCharacterId(character.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.view-container {
  gap: 3rem;

  .toggler {
    --rotate: 45deg;
    position: absolute;
    width: 2rem;
    height: 2rem;
    background-color: rgb(209, 209, 209);
    right: 5%;
    top: 5%;
    cursor: pointer;
    transform: translate(-50%, -50%) rotate(var(--rotate));
    transition:
      transform 0.2s ease,
      background-color 0.2s ease,
      height 0.2s ease;
    &:hover {
      background-color: white;
    }

    &.on {
      --rotate: 0deg;
      height: 3rem;
    }
  }
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

  &.cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    .characters-view__item {
      width: 10rem;
      height: 15rem;
    }
  }
}
</style>
