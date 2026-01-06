<script setup lang="ts">
import LoadingComponent from '../LoadingComponent/LoadingComponent.vue'
import { useCharactersStore } from '@/stores/characterStore'
import { computed } from 'vue'
const characterStore = useCharactersStore()
const characterObject = computed(() => {
  return characterStore.currentCharacter
})
function capitalizeFirstLetterTrimmed(str: string): string {
  const trimmed = str.trimStart()
  if (!trimmed) return str
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
}

const rarity = computed(() => characterObject.value!.rarity)
const role = computed(() => characterObject.value!.role)
const type = computed(() => characterObject.value!.type)
</script>

<template>
  <div v-if="characterObject" class="character-preview">
    <div class="bg"></div>
    <div class="title">
      <h3 class="styled-title">{{ characterObject.name }}</h3>
    </div>
    <div class="tags">
      <p class="tag" :class="rarity" v-if="rarity">{{ rarity.toUpperCase() }}</p>
      <p class="tag" :class="role">
        {{ capitalizeFirstLetterTrimmed(role) }}
      </p>
      <p class="tag" :class="type">
        {{ capitalizeFirstLetterTrimmed(type) }}
      </p>
    </div>
  </div>
  <div v-else><LoadingComponent /></div>
</template>

<style scoped>
.character-preview {
  position: relative;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(to top, transparent, black, transparent);
    mask-image: linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%);
  }

  .title {
    display: flex;
    align-items: center;
    position: relative;
    .styled-title {
      font-size: 5rem;
      font-family: 'Capture It';
      letter-spacing: 0.2rem;
      font-weight: 500;
    }
  }

  .tags {
    display: flex;
    align-items: center;
    gap: 1rem;

    .tag {
      text-shadow: 0 0 0.5rem black;
      font-size: 1.4rem;
      background-color: var(--font-gray);
      /* border: 0.3rem solid var(--font-gray); */
      padding: 0.3rem 0.6rem;
      font-family: Unbounded;

      &.slash {
        background: radial-gradient(at center, rgb(148, 0, 0), rgb(233, 16, 0));
      }
      &.strike {
        background: radial-gradient(at center, rgb(172, 83, 0), rgb(218, 116, 0));
      }
      &.thrust {
        background: radial-gradient(at center, rgb(136, 136, 0), rgb(218, 218, 0));
      }
      &.spirit {
        background: radial-gradient(at center, rgb(42, 42, 255), rgb(0, 132, 255));
      }
      &.ssr {
        background: transparent;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -1;
          background: linear-gradient(
            45deg,
            gold,
            gold,
            var(--font-orange),
            gold,
            var(--font-orange),
            var(--font-orange)
          );
          background-size: 200% 200%;
          animation: border-flow 3s ease-in-out infinite;
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
        }
      }
      &.sr {
        background: linear-gradient(
          45deg,
          purple,
          purple,
          rgb(162, 0, 255),
          purple,
          rgb(162, 0, 255),
          rgb(162, 0, 255)
        );
      }
    }
  }
}
</style>
