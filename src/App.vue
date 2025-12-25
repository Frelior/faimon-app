<script lang="ts" setup>
import { computed } from 'vue'
import LoadingComponent from './components/LoadingComponent/LoadingComponent.vue'
import MenuComponent from './components/MenuComponent/MenuComponent.vue'
import HeaderComponent from './components/HeaderComponent/HeaderComponent.vue'
import BackgroundComponent from './components/BackgroundComponent/BackgroundComponent.vue'
import CharacterPreviewComponent from './components/CharacterPreviewComponent/CharacterPreviewComponent.vue'
import { useCharactersStore } from './stores/characterStore'
import { useRoute } from 'vue-router'
const route = useRoute()
const characetrStore = useCharactersStore()
characetrStore.fetchAllCharacters()
const isCharactersDownloaded = computed(() => characetrStore.characters.length > 0)
</script>

<template>
  <template v-if="isCharactersDownloaded">
    <BackgroundComponent />
    <HeaderComponent />
    <div class="container">
      <MenuComponent />
      <div class="main-window">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <transition name="fade-slow">
        <div
          v-if="
            route.name === 'characters' || route.name === 'character' || route.name === 'tierlist'
          "
          class="character-preview-box"
        >
          <CharacterPreviewComponent />
        </div>
      </transition>
    </div>
  </template>
  <div v-else><LoadingComponent fullscreen /></div>
</template>

<style scoped>
.container {
  display: flex;
  animation: fade-in 1s ease forwards;

  .main-window {
    width: 60%;
    height: 90%;
    position: relative;
    overflow: hidden;
    align-self: flex-start;
    background-color: rgba(0, 0, 0, 0.397);
    padding-bottom: 5rem;
    padding-top: 1rem;

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
  .character-preview-box {
    /* border: 1px solid white; */
    flex-grow: 1;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 8rem;
    pointer-events: none;
    user-select: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s ease;
  }
  .fade-slow-enter-active,
  .fade-slow-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to,
  .fade-slow-enter-from,
  .fade-slow-leave-to {
    opacity: 0;
  }
}
</style>
