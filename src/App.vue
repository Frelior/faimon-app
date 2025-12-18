<script lang="ts" setup>
import MenuComponent from './components/MenuComponent/MenuComponent.vue'
import HeaderComponent from './components/HeaderComponent/HeaderComponent.vue'
import BackgroundComponent from './components/BackgroundComponent/BackgroundComponent.vue'
</script>

<template>
  <BackgroundComponent />
  <HeaderComponent />
  <div class="container">
    <MenuComponent />
    <div class="main-window">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.main-window {
  width: 70%;
  height: 90%;
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
  &::after {
    backdrop-filter: blur(0.5rem);
    /* background-color: #000; */
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -4;
  }
}
</style>
