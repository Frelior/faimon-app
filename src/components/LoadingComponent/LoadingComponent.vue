<script setup lang="ts">
defineProps({
  fullscreen: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="wrapper">
    <div v-if="!fullscreen" class="loader"></div>
    <div v-else class="fullscreen"><div class="loader"></div></div>
  </div>
</template>

<style scoped>
.wrapper {
  opacity: 0;
  animation: fade-in 4s linear forwards;
}
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

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  75% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
</style>
