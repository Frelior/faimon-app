<script lang="ts" setup>
import MenuComponent from './components/MenuComponent/MenuComponent.vue'
import HeaderComponent from './components/HeaderComponent/HeaderComponent.vue'
</script>

<template>
  <HeaderComponent />
  <div class="container">
    <MenuComponent />
    <div class="main-window">
      <router-view />
    </div>
  </div>
  <div class="background">
    <video
      class="bg-video"
      autoplay
      loop
      disablepictureinpicture=""
      poster="/src/media/images/bg-static.png"
      src="/src/media/video/bg-video.mp4"
    ></video>
    <div class="vignette"></div>
    <img class="mask" src="/src/media/images/mask-black.png" />
  </div>
</template>

<style scoped>
.main-window {
  width: 70%;
  height: 90%;
  flex-grow: 1;
  padding: 3rem;
  margin-right: auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 0.4rem; /* толщина бордера */
    pointer-events: none;

    background: linear-gradient(
      45deg,
      var(--font-gray),
      var(--font-gray),
      transparent,
      transparent,
      var(--font-orange),
      transparent,
      transparent,
      var(--font-gray),
      transparent,
      transparent,
      var(--font-orange),
      var(--font-orange)
    );
    background-size: 200% 200%;
    animation: border-flow 60s ease-in-out infinite;
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
  }
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -5;

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
  }
}
</style>
