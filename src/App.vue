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
  <img class="mask" src="/src/media/images/mask-black.png" />
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
</style>
