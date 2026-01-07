<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { getImageUrl } from '@/services/images'
import { useCharactersStore } from '@/stores/characterStore'
import type { Character } from '@/interfaces/interfaces'
import { computed } from 'vue'

const store = useCharactersStore()
const props = defineProps<{ character: Character; squared?: boolean }>()
const iconUrl = computed(() => {
  if (!props.character?.icon_path) return ''
  return getImageUrl(props.character.icon_path)
})
</script>

<template>
  <div
    class="border"
    :class="[character.rarity, { squared: squared }]"
    draggable="false"
    tabindex="0"
    @mouseenter="store.changeCurrentCharacterId(character.id)"
    @focus="store.changeCurrentCharacterId(character.id)"
  >
    <RouterLink :to="`/character/${character.id}`" class="router-link" draggable="false">
      <img draggable="false" :src="store.editViewCharacterIconUrl || iconUrl || ''" id="clipped" />
    </RouterLink>
  </div>
</template>

<style scoped>
.router-link {
  width: 100%;
  height: 100%;
  object-fit: contain;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  user-select: none;
}
.border {
  --width: 15rem;
  --height: 15rem;
  --border-width: 0.5rem;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  padding: var(--border-width);
  background: linear-gradient(180deg, rgb(201, 201, 201), rgb(20, 20, 20));
  width: var(--width);
  height: var(--height);
  transition: transform 0.2s;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  will-change: transform;

  &.sr {
    background: linear-gradient(180deg, rgb(68, 68, 68) 35%, rgb(15, 15, 15) 75%, var(--sr) 85%);
  }
  &.ssr {
    background: linear-gradient(180deg, rgb(68, 68, 68) 35%, rgb(15, 15, 15) 75%, var(--ssr) 85%);
  }

  &:hover,
  &:focus {
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
    width: 100%;
    height: 3rem;
    background: white;
    top: 0%;
    right: 0%;
    z-index: 1;
    transform: translate(50%, -100%) rotate(45deg);
    transform-origin: center;
    transition: transform 0.2s ease-in-out;
  }

  &:hover:before,
  &:focus:before {
    transform: translate(-50%, 700%) rotate(45deg);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    user-select: none;
  }

  &.squared {
    --width: 10rem;
    --height: 15rem;
    clip-path: none;
    padding: 0.3rem;
    border-radius: 1rem;

    img {
      border-radius: 1rem;

      clip-path: none;
      object-fit: cover;
    }

    .router-link {
      clip-path: none;
    }

    &:before {
      width: 200%;
      transition: transform 0.2s ease-in-out;
    }
  }
}
</style>
