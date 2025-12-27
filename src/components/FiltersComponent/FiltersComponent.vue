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
      <p class="block-title">Редкость</p>
      <div class="buttons">
        <label class="filter-button">
          <input
            type="radio"
            name="rarity"
            value=""
            checked
            v-model="characterStore.filters.rarity"
          />
          <p>Все</p>
        </label>
        <label class="filter-button ssr"
          ><input type="radio" name="rarity" value="ssr" v-model="characterStore.filters.rarity" />
          <p>SSR</p></label
        >
        <label class="filter-button sr"
          ><input type="radio" name="rarity" value="sr" v-model="characterStore.filters.rarity" />
          <p>SR</p></label
        >
      </div>
    </div>
    <div class="filters-block">
      <p class="block-title">Роль</p>
      <div class="buttons">
        <label class="filter-button">
          <input type="radio" name="role" value="" checked v-model="characterStore.filters.role" />
          <p>Все</p>
        </label>
        <label class="filter-button"
          ><input type="radio" name="role" value="assault" v-model="characterStore.filters.role" />
          <p>Assault</p></label
        >
        <label class="filter-button"
          ><input type="radio" name="role" value="support" v-model="characterStore.filters.role" />
          <p>Support</p></label
        >
        <label class="filter-button"
          ><input type="radio" name="role" value="tactic" v-model="characterStore.filters.role" />
          <p>Tactic</p></label
        >
      </div>
    </div>
    <div class="filters-block">
      <p class="block-title">Тип</p>
      <div class="buttons">
        <label class="filter-button">
          <input type="radio" name="type" value="" checked v-model="characterStore.filters.type" />
          <p>Все</p>
        </label>
        <label class="filter-button slash"
          ><input type="radio" name="type" value="slash" v-model="characterStore.filters.type" />
          <p>Slash</p></label
        >
        <label class="filter-button strike"
          ><input type="radio" name="type" value="strike" v-model="characterStore.filters.type" />
          <p>Strike</p></label
        >
        <label class="filter-button thrust"
          ><input type="radio" name="type" value="thrust" v-model="characterStore.filters.type" />
          <p>Thrust</p></label
        >
        <label class="filter-button spirit"
          ><input type="radio" name="type" value="spirit" v-model="characterStore.filters.type" />
          <p>Spirit</p></label
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.filters-component {
  display: flex;
  gap: 3rem;
  .filters-block {
    position: relative;
    display: flex;

    .block-title {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding: 0.5rem 1rem;
      user-select: none;
    }

    .buttons {
      display: flex;
      border-radius: 1rem;
      outline: 0.2rem solid var(--border-gray);
      overflow: hidden;
      background-color: black;

      .filter-button {
        --box-shadow-inset: white;
        --text-color: white;
        padding: 0.5rem 1rem;
        color: var(--text-color);
        /* background-color: var(--font-gray); */
        cursor: pointer;
        transition: all 0.2s ease;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;

        &:has(input:checked) {
          color: white;
          text-shadow: 0 0 0.3rem black;
          box-shadow: 0 0 0.9rem 0.3rem var(--box-shadow-inset) inset;
          border-radius: 1rem;
        }

        input {
          display: none;
        }

        &.ssr {
          --text-color: var(--ssr);
          &:has(input:checked) {
            --box-shadow-inset: var(--ssr);
          }
        }
        &.sr {
          --text-color: var(--sr);
          &:has(input:checked) {
            --box-shadow-inset: var(--sr);
          }
        }

        &.slash {
          --text-color: var(--slash);
          &:has(input:checked) {
            --box-shadow-inset: var(--slash);
          }
        }
        &.strike {
          --text-color: var(--strike);
          &:has(input:checked) {
            --box-shadow-inset: var(--strike);
          }
        }
        &.thrust {
          --text-color: var(--thrust);
          &:has(input:checked) {
            --box-shadow-inset: var(--thrust);
          }
        }
        &.spirit {
          --text-color: var(--spirit);
          &:has(input:checked) {
            --box-shadow-inset: var(--spirit);
          }
        }
      }
    }
  }
}
</style>
