<script setup lang="ts">
import CharacterHexagonComponent from '@/components/CharacterHexagonComponent/CharacterHexagonComponent.vue'
const characters = [
  { id: 1, name: 'byakuya', iconSrc: '/src/media/images/characterIcons/byakuya.png' },
  { id: 2, name: 'chad', iconSrc: '/src/media/images/characterIcons/chad.png' },
  { id: 3, name: 'ichigoBankai', iconSrc: '/src/media/images/characterIcons/ichigo-bankai.png' },
  { id: 4, name: 'ichigoInitial', iconSrc: '/src/media/images/characterIcons/ichigo-initial.png' },
  { id: 5, name: 'ichigoShikai', iconSrc: '/src/media/images/characterIcons/ichigo-shikai.png' },
  { id: 6, name: 'ikkaku', iconSrc: '/src/media/images/characterIcons/ikkaku.png' },
  { id: 7, name: 'kaname', iconSrc: '/src/media/images/characterIcons/kaname.png' },
  { id: 8, name: 'nemu', iconSrc: '/src/media/images/characterIcons/nemu.png' },
  { id: 9, name: 'orihime', iconSrc: '/src/media/images/characterIcons/orihime.png' },
  { id: 10, name: 'renji', iconSrc: '/src/media/images/characterIcons/renji.png' },
  { id: 11, name: 'rukia', iconSrc: '/src/media/images/characterIcons/rukia.png' },
  { id: 12, name: 'sajin', iconSrc: '/src/media/images/characterIcons/sajin.png' },
  { id: 13, name: 'urahara', iconSrc: '/src/media/images/characterIcons/urahara.png' },
  { id: 14, name: 'ururu', iconSrc: '/src/media/images/characterIcons/ururu.png' },
  { id: 15, name: 'uryu', iconSrc: '/src/media/images/characterIcons/uryu.png' },
  { id: 16, name: 'yachiru', iconSrc: '/src/media/images/characterIcons/yachiru.png' },
  { id: 17, name: 'yoruichi', iconSrc: '/src/media/images/characterIcons/yoruichi.png' },
]
</script>

<template>
  <div class="characters-view view-container">
    <CharacterHexagonComponent
      v-for="character in characters"
      :key="character.id"
      :character="character"
      class="characters-view__item"
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
