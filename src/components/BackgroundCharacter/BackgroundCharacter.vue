<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
const router = useRoute()
const isMounted = ref(false)
const isCharactersPage = computed(() => router.name === 'characters')

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <Transition name="fade">
    <img
      v-show="isMounted && !isCharactersPage"
      class="bg-image-character"
      src="/src/media/images/ichigo-bankai-full.png"
  /></Transition>
</template>

<style scoped>
.bg-image-character {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 60vw;
  /* opacity: 0.6; */
  filter: brightness(0.8);
  height: 80%;
  z-index: -9;
  object-fit: cover;
  pointer-events: none;
  user-select: none;

  -webkit-mask-image: radial-gradient(ellipse at center, #000 15%, #000 50%, transparent 70%);
  mask-image: radial-gradient(ellipse at center, #000 15%, #000 50%, transparent 70%);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
