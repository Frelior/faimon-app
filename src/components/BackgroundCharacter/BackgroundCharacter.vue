<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCharactersStore } from '@/stores/characterStore'
import { getImageUrl } from '@/services/getImageUrl'

const store = useCharactersStore()
const imageUrl = computed(
  () => store.currentCharacter && getImageUrl(store.currentCharacter.image_full_path),
)
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <Transition name="slow" mode="out-in">
    <div class="bg-image-character" v-if="isMounted">
      <Transition name="fast" mode="out-in">
        <img
          v-if="store.currentCharacterId"
          :key="store.currentCharacterId"
          :src="imageUrl || ''"
        />
      </Transition>
    </div>
  </Transition>
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
  }

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

.slow-enter-active,
.slow-leave-active {
  transition: opacity 1s ease;
}
.fast-enter-active,
.fast-leave-active {
  transition: opacity 0.05s ease-in-out;
}
.slow-enter-from,
.slow-leave-to,
.fast-enter-from,
.fast-leave-to {
  opacity: 0;
}
</style>
