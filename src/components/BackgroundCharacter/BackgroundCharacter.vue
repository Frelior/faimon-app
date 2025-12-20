<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { useHoveredCharacterIdStore } from '@/stores/counter.ts'

const route = useRoute()
const hoveredStore = useHoveredCharacterIdStore()

const isMounted = ref(false)
onMounted(() => (isMounted.value = true))

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const initialRandomNumber = randomInt(1, 17)

const imageSrc = computed(() => {
  if (!isMounted.value) return null

  if (route.name === 'characters' && hoveredStore.characterId) {
    return `/src/media/images/charactersBig/character-fhd-${hoveredStore.characterId}.png`
  }

  return `/src/media/images/charactersBig/character-fhd-${initialRandomNumber}.png`
})

const imageKey = computed(() => {
  if (route.name === 'characters') {
    return `char-${hoveredStore.characterId}`
  }
  return `random-${initialRandomNumber}`
})
</script>


<template>
  <div class="img-wrapper bg-image-character" v-if="imageSrc">
    <Transition name="fast-fade" mode="out-in">
      <img
        :key="imageKey"
        :src="imageSrc"
        :class="{ clear: route.name === 'characters' }"
      />
    </Transition>
  </div>
</template>


<style scoped>
.bg-image-character {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 60vw;
  height: 80%;
  z-index: -9;

  pointer-events: none;
  user-select: none;
  background-color: rgba(255, 255, 255, 0.13);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.9);

    &.clear {
      filter: brightness(1.2);
    }
  }

  /* mask-image: radial-gradient(ellipse at bottom right, #000 15%, #000 50%, transparent 70%); */
  mask-image: radial-gradient(
    ellipse at 70% 80%,
    black 10%,
    black 30%,
    black 40%,
    black 53%,
    black 61%,
    transparent 71%
  );
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fast-fade-enter-active,
.fast-fade-leave-active {
  transition: opacity 0.1s ease-out;
}
.fast-fade-enter-from,
.fast-fade-leave-to {
  opacity: 0;
}
</style>
