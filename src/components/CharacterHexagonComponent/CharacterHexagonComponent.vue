<script setup lang="ts"></script>

<template>
  <div class="border">
    <img src="/src/media/images/characterIcons/orihime.png" id="clipped" />
  </div>
</template>

<style scoped>
.border {
  --width: 15rem;
  --height: 15rem;
  --border-width: 0.5rem;
  border: var(--border-width) solid transparent;

  padding: var(--border-width);
  background: linear-gradient(grey, lightgrey);
  border-radius: 0.5rem;
  width: var(--width);
  height: var(--height);
  transform: rotateZ(45deg) scale(0.7);
  transition: transform 0.2s;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  will-change: transform;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: rotateZ(45deg) scale(1.2);
    transition: transform 0.2s;
    z-index: 10;
    background: linear-gradient(rgb(32, 32, 32), var(--font-orange));
  }

  &:before {
    content: '';
    position: absolute;
    opacity: 0.5;
    width: 25rem;
    height: 5rem;
    background: white;
    top: -35%;
    left: 0;
    z-index: 1;
    transform: rotate(0deg);
    transition: transform 0.2s;
  }

  &:hover:before {
    transform: translate(-100px, 400%) rotate(0deg);
    transition: transform 0.2s;
  }
  img {
    width: 150%;
    height: 150%;
    object-fit: cover;
    transform: rotateZ(-45deg);
  }
}
</style>
