<script setup lang="ts">
import { useCharactersStore } from '@/stores/characterStore'
import { onUnmounted } from 'vue'
const characterStore = useCharactersStore()

onUnmounted(() => {
  characterStore.resetFilters()
})
</script>

<template>
  <div class="filters-component">
    <div class="filters-block">
      <label class="filter-button"
        ><input type="radio" name="rarity" value="ssr" v-model="characterStore.filters.rarity" />
        <p>SSR</p></label
      >
      <label class="filter-button"
        ><input type="radio" name="rarity" value="sr" v-model="characterStore.filters.rarity" />
        <p>SR</p></label
      >
      <label class="filter-button">
        <input
          type="radio"
          name="rarity"
          value=""
          checked
          v-model="characterStore.filters.rarity"
        />
        <p>All</p>
      </label>
    </div>
  </div>
</template>

<style scoped>
.filters-component {
  .filters-block {
    display: flex;
    gap: 1rem;
    outline: 1px solid white;
    .filter-button {
      padding: 0.5rem 1rem;
      background-color: var(--font-orange);
      cursor: pointer;
      input {
        /* display: none; */
      }
    }
  }
}
</style>
