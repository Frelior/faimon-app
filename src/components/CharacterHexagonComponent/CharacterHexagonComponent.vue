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

  /* border: var(--border-width) solid transparent; */
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

  padding: var(--border-width);
  background: linear-gradient(grey, lightgrey);
  /* border-radius: 0.5rem; */
  width: var(--width);
  height: var(--height);
  /* transform: scale(0.7); */
  transition: transform 0.2s;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  will-change: transform;
  display: flex;
  justify-content: center;
  align-items: center;



  &:hover {
    transform: scale(1.2);
    transition: transform 0.2s;
    z-index: 10;
    background: linear-gradient(250deg, var(--font-orange), rgb(32, 32, 32));
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
    transform: rotate(45deg);
    transition: transform 0.2s;
  }

  &:hover:before {
    transform: translate(-100px, 400%) rotate(45deg);
    transition: transform 0.2s;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
}
</style>
