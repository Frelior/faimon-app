<script setup lang="ts">
defineProps({
  character: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="border">
    <img :src="character.iconSrc" id="clipped" />
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
  background: linear-gradient(250deg, rgb(201, 201, 201), rgb(20, 20, 20));
  width: var(--width);
  height: var(--height);
  /* transform: scale(0.7); */
  transition: transform 0.2s;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  /* will-change: transform; */
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.2);
    transition: transform 0.2s;
    z-index: 10;
    background: linear-gradient(250deg, var(--font-orange), rgb(32, 32, 32));
    box-shadow: 0 0 1rem var(--font-orange);
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
    transform: translate(-10rem, 400%) rotate(45deg);
    transition: transform 0.2s;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
}
</style>
