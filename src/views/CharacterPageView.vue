<script setup lang="ts">
import { useCharactersStore } from '@/stores/characterStore'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
const props = defineProps<{
  id: string
}>()
const characterStore = useCharactersStore()
const router = useRouter()

const character = computed(() => {
  const pageCharacterId = Number(props.id)
  const char = characterStore.findCharacterById(pageCharacterId)

  if (!char) {
    router.replace({ name: 'not-found' })
    return
  }
  characterStore.changeCurrentCharacterId(Number(props.id))
  return char
})
</script>

<template>
  <div class="view-container character-page" v-if="character">
    <div class="header">
      <h2 class="styled-title">{{ character.name }}</h2>
    </div>
    <div class="body">
      <div class="info-block base-stats">
        <p class="block-title">Base stats:</p>

        <div class="block-content">
          <div class="block-skill">
            <div class="block-text">
              <p class="skill-title">Attack</p>
              <p class="skill-desc">142</p>
            </div>
          </div>

          <div class="block-skill">
            <div class="block-text">
              <p class="skill-title">Defence</p>
              <p class="skill-desc">228</p>
            </div>
          </div>

          <div class="block-skill">
            <div class="block-text">
              <p class="skill-title">HP</p>
              <p class="skill-desc">3421</p>
            </div>
          </div>

          <div class="block-skill">
            <div class="block-text">
              <p class="skill-title">Crit damage</p>
              <p class="skill-desc">120%</p>
            </div>
          </div>

          <div class="block-skill">
            <div class="block-text">
              <p class="skill-title">Crit rate</p>
              <p class="skill-desc">20%</p>
            </div>
          </div>
        </div>
      </div>

      <div class="info-block">
        <p class="block-title">Passive skills:</p>
        <div class="block-skill">
          <img src="" class="block-skill-image" />
          <div class="block-text">
            <p class="skill-title">Getsuga</p>
            <p class="skill-desc">
              Ичиго наносит 5 ударов с сумарным уроном от 5 ударов равным 247% от АТК, и получая
              Духовное давление(настакивает ульт). Прекратите атаковать после третьего удара, и
              Ичиго совершит кратковременную атаку. Когда появится свечение, нажмите кнопку базовой
              атаки, чтобы выполнить специальную атаку.
            </p>
          </div>
        </div>
        <div class="block-skill">
          <img src="" class="block-skill-image" />
          <div class="block-text">
            <p class="skill-title">Hollow mask</p>
            <p class="skill-desc">
              In the state [Hollow], - Every time a special attack is launched, the damage of the
              next Ultimate [Kuroi Getsuga Tensho] will increase in [15%], This effect can be
              accumulated up to 4 times.
            </p>
          </div>
        </div>
      </div>
      <div class="info-block">
        <p class="block-title">Passive skills:</p>
        <div class="block-skill">
          <img src="" class="block-skill-image" />
          <div class="block-text">
            <p class="skill-title">Getsuga</p>
            <p class="skill-desc">
              Special attacks prioritize enemies inflicted with Getsuga Mark.
            </p>
          </div>
        </div>
        <div class="block-skill">
          <img src="" class="block-skill-image" />
          <div class="block-text">
            <p class="skill-title">Hollow mask</p>
            <p class="skill-desc">
              In the state [Hollow], - Every time a special attack is launched, the damage of the
              next Ultimate [Kuroi Getsuga Tensho] will increase in [15%], This effect can be
              accumulated up to 4 times.
            </p>
          </div>
        </div>
      </div>
      <div class="info-block">
        <p class="block-title">Passive skills:</p>
        <div class="block-skill">
          <img src="" class="block-skill-image" />
          <div class="block-text">
            <p class="skill-title">Getsuga</p>
            <p class="skill-desc">
              Special attacks prioritize enemies inflicted with Getsuga Mark.
            </p>
          </div>
        </div>
        <div class="block-skill">
          <img src="" class="block-skill-image" />
          <div class="block-text">
            <p class="skill-title">Hollow mask</p>
            <p class="skill-desc">
              In the state [Hollow], - Every time a special attack is launched, the damage of the
              next Ultimate [Kuroi Getsuga Tensho] will increase in [15%], This effect can be
              accumulated up to 4 times.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.character-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .body {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;

    .info-block {
      padding: 0rem 0rem;
      border: 0.3rem solid var(--font-orange-05);
      border-radius: 0.5rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      background-color: rgba(0, 0, 0, 0.781);
      overflow: hidden;

      &.base-stats {
        .block-content {
          .block-skill {
            .block-text {
              text-align: center;
              .skill-title {
                font-size: 1.5rem;
              }
              .skill-desc {
                font-size: 2rem;
                white-space: pre-line;
              }
            }
          }
        }
      }

      .block-content {
        width: 100%;
        display: flex;
      }

      .block-title {
        align-self: center;
        font-size: 2rem;
        padding: 0.3rem 0rem;
        background-color: var(--skills-grid);
        text-align: center;
        width: 100%;
      }

      .block-skill {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1rem;
        border: 0.3rem solid var(--skills-grid);
        padding: 1rem 1rem 1rem 1rem;

        .block-skill-image {
          width: 7rem;
          height: 7rem;
          border-radius: 50%;
          border: 0.3rem solid var(--skills-grid);
          object-fit: cover;
          object-position: center;
          background-color: var(--skills-grid);
        }
        .block-text {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          .skill-title {
            font-size: 1.8rem;
            .skill-desc {
            }
          }
        }
      }
    }
  }
}
</style>
