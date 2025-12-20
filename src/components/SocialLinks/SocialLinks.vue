<script setup lang="ts">
import DiscordFilled from '@vicons/material/DiscordFilled'
import YoutubeFilled from '@vicons/antd/YoutubeFilled'
import TelegramFilled from '@vicons/material/TelegramFilled'
</script>

<template>
  <div class="social-links">
    <a href="" target="_blank" tabindex="0"> <DiscordFilled /></a>
    <a href="" target="_blank" tabindex="0"> <YoutubeFilled /></a>
    <a href="" target="_blank" tabindex="0"> <TelegramFilled /></a>
  </div>
</template>

<style scoped>
.social-links {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-right: 4rem;

  a {
    width: 4rem;
    height: 4rem;
    color: white;
    transition: scale 0.1s ease-in-out;
    will-change: transform;

    &:hover {
      scale: 1.1;
    }

    svg {
      /* width: 100%;
      height: 100%; */
    }
  }
}
</style>
