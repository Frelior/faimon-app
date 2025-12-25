<script setup lang="ts">
import { computed } from 'vue'
import CharacterHexagonComponent from '@/components/CharacterHexagonComponent/CharacterHexagonComponent.vue'
import { useCharactersStore } from '@/stores/characterStore'
import FiltersComponent from '@/components/FiltersComponent/FiltersComponent.vue'
const characterStore = useCharactersStore()
const characters = computed(() => characterStore.filteredCharacters)
const tierS = computed(() => characters.value.filter((character) => character.tier === 's'))
const tierA = computed(() => characters.value.filter((character) => character.tier === 'a'))
const tierB = computed(() => characters.value.filter((character) => character.tier === 'b'))
const tierC = computed(() => characters.value.filter((character) => character.tier === 'c'))
const tierD = computed(() => characters.value.filter((character) => character.tier === 'd'))
</script>

<template>
  <div class="info-view view-container">
    <FiltersComponent />
    <div class="table">
      <div class="row s">
        <div class="title">S</div>
        <div class="content">
          <CharacterHexagonComponent
            squared
            v-for="character in tierS"
            :key="character.id"
            :character="character"
            class="characters-view__item"
            @mouseenter="characterStore.changeCurrentCharacterId(character.id)"
            @focus="characterStore.changeCurrentCharacterId(character.id)"
          />
        </div>
      </div>
      <div class="row a">
        <div class="title">A</div>
        <div class="content">
          <CharacterHexagonComponent
            squared
            v-for="character in tierA"
            :key="character.id"
            :character="character"
            class="characters-view__item"
            @mouseenter="characterStore.changeCurrentCharacterId(character.id)"
            @focus="characterStore.changeCurrentCharacterId(character.id)"
          />
        </div>
      </div>
      <div class="row b">
        <div class="title">B</div>
        <div class="content">
          <CharacterHexagonComponent
            squared
            v-for="character in tierB"
            :key="character.id"
            :character="character"
            class="characters-view__item"
            @mouseenter="characterStore.changeCurrentCharacterId(character.id)"
            @focus="characterStore.changeCurrentCharacterId(character.id)"
          />
        </div>
      </div>
      <div class="row c">
        <div class="title">C</div>
        <div class="content">
          <CharacterHexagonComponent
            squared
            v-for="character in tierC"
            :key="character.id"
            :character="character"
            class="characters-view__item"
            @mouseenter="characterStore.changeCurrentCharacterId(character.id)"
            @focus="characterStore.changeCurrentCharacterId(character.id)"
          />
        </div>
      </div>
      <div class="row d">
        <div class="title">D</div>
        <div class="content">
          <CharacterHexagonComponent
            squared
            v-for="character in tierD"
            :key="character.id"
            :character="character"
            class="characters-view__item"
            @mouseenter="characterStore.changeCurrentCharacterId(character.id)"
            @focus="characterStore.changeCurrentCharacterId(character.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-view {
  gap: 1rem;
  .table {
    border: 0.01rem solid var(--skills-grid);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .row {
      border: 0.01rem solid var(--skills-grid);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      min-height: 20rem;

      .title {
        --shadow: white;
        position: relative;
        font-size: 10rem;
        text-align: center;
        text-shadow: 0 0 2rem var(--shadow);
        font-family: 'Londrina Shadow', sans-serif;
        padding: 1rem;

        .s & {
          /* color: red; */
          --shadow: red;
        }
        .a & {
          /* color: orange; */
          --shadow: orange;
        }
        .b & {
          /* color: yellow; */
          --shadow: yellow;
        }
        .c & {
          /* color: green; */
          --shadow: green;
        }
        .d & {
          /* color: blue; */
          --shadow: blue;
        }
      }

      .content {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
  }
}
</style>
