<script setup lang="ts">
defineProps({
  fullscreen: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div v-if="!fullscreen" class="loader"></div>
  <div v-else class="fullscreen"><div class="loader"></div></div>
</template>

<style scoped>
.loader {
  width: 5rem;
  height: 5rem;
  border: 0.5rem solid #fff;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.fullscreen {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
