<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useHoveredCharacterIdStore } from '@/stores/characterStore'

const route = useRoute()
const hoveredStore = useHoveredCharacterIdStore()

const isMounted = ref(false)
onMounted(() => (isMounted.value = true))
</script>

<template>
  <div class="img-wrapper bg-image-character">
    <Transition name="fast-fade" mode="out-in">
      <img
        :key="hoveredStore.characterId"
        :src="`/src/media/images/charactersBig/character-fhd-${hoveredStore.characterId}.png`"
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
    transition:
      opacity 0.05s ease-out,
      filter 0.05s ease-out;

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

.fast-fade-enter-active,
.fast-fade-leave-active {
}
.fast-fade-enter-from,
.fast-fade-leave-to {
  opacity: 0;
}
</style>
