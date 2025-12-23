<script setup lang="ts"></script>

<template>
  <div class="loader"></div>
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

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
