<script setup lang="ts">
import BackgroundCharacter from '../BackgroundCharacter/BackgroundCharacter.vue'
</script>

<template>
  <div class="background">
    <video
      class="bg-video"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
      type="video/mp4"
      webkit-playsinline
      poster="/src/media/images/bg-static.png"
      src="/src/media/video/bg-video.mp4"
    ></video>
    <div class="vignette"></div>
    <BackgroundCharacter />
    <img class="mask" src="/src/media/images/mask-black.png" />
  </div>
</template>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;

  .vignette {
    position: fixed;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%);
  }
  .bg-video {
    user-select: none;
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -10;
  }
  .mask {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: -8;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
  }
}
</style>
