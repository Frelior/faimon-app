<script setup lang="ts">
import { useCharactersStore } from '@/stores/characterStore'
import { computed, ref, watch } from 'vue'
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent.vue'
import { getCharacterSkills } from '@/services/skills'
import { getSkillsByType } from '@/services/skills'
import { getImageUrl } from '@/services/images'
import type { Skill } from '@/interfaces/interfaces'

const props = defineProps<{
  id: string
}>()
const characterStore = useCharactersStore()
const character = computed(() => {
  characterStore.changeCurrentCharacterId(Number(props.id))
  const char = characterStore.currentCharacter

  return char
})
const skills = ref<Skill[]>([])
watch(
  character,
  async () => {
    if (character.value) {
      const data = await getCharacterSkills(character.value.id)
      skills.value = data ?? []
      console.log(data)
    }
  },
  { immediate: true },
)

const skillSections = computed(() => [
  {
    key: 'attack',
    title: 'Базовая атака',
    skills: getSkillsByType(skills.value, 'attack'),
  },
  {
    key: 'technique',
    title: 'Техника',
    skills: getSkillsByType(skills.value, 'technique'),
  },
  {
    key: 'ultimate',
    title: 'Ульта',
    skills: getSkillsByType(skills.value, 'ultimate'),
  },
  {
    key: 'counter',
    title: 'Контратака',
    skills: getSkillsByType(skills.value, 'counter'),
  },
  {
    key: 'dodge',
    title: 'Уворот',
    skills: getSkillsByType(skills.value, 'dodge'),
  },
  {
    key: 'passive',
    title: 'Пассивки',
    skills: getSkillsByType(skills.value, 'passive'),
  },
  {
    key: 'constellation',
    title: 'Консты',
    skills: getSkillsByType(skills.value, 'constellation'),
  },
  {
    key: 'weapon',
    title: 'Оружие',
    skills: getSkillsByType(skills.value, 'weapon'),
  },
  {
    key: 'coreStamp',
    title: 'Именной штамп',
    skills: getSkillsByType(skills.value, 'coreStamp'),
  },
])
const descriptionSection = computed(() => getSkillsByType(skills.value, 'description'))
</script>

<template>
  <div class="view-container character-page">
    <template v-if="character && skills.length > 0">
      <div class="body">
        <!-- <div class="info-block base-stats">
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
      </div> -->

        <div class="info-block" v-if="descriptionSection">
          <p class="block-title">Общее:</p>
          <div
            class="block-skill description"
            v-for="description in descriptionSection"
            :key="description.id"
          >
            <div class="block-text">
              <p class="skill-title" v-if="description.name">{{ description.name }}</p>
              <p class="skill-desc" v-if="description.description">
                {{ description.description }}
              </p>
            </div>
            <img
              v-if="getImageUrl(description.image_path)"
              :src="getImageUrl(description.image_path) ?? ''"
              class="block-skill-image"
            />
          </div>
        </div>

        <div class="info-block" v-for="section in skillSections" :key="section.key">
          <p class="block-title">{{ section.title }}:</p>
          <div class="block-skill" v-for="skill in section.skills" :key="skill.id">
            <img
              v-if="getImageUrl(skill.image_path)"
              :src="getImageUrl(skill.image_path) ?? ''"
              class="block-skill-image"
              loading="lazy"
            />
            <div class="block-text">
              <p class="skill-title" v-if="skill.name">{{ skill.name }}</p>
              <p class="skill-desc" v-if="skill.description">{{ skill.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else>
      <LoadingComponent />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.character-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .body {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 7rem;

    .info-block {
      padding: 0rem 0rem;
      border: 0.3rem solid var(--font-orange-05);
      border-radius: 0.5rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 1rem;
      align-items: flex-start;
      background-color: rgba(0, 0, 0, 0.781);
      overflow: hidden;

      /* &.base-stats {
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
      } */

      .block-content {
        width: 100%;
        display: flex;
      }

      .block-title {
        align-self: center;
        font-size: 2rem;
        padding: 0.3rem 0rem;
        background: linear-gradient(
          to right,
          var(--skills-grid) 30%,
          var(--font-orange-05),
          var(--skills-grid) 70%
        );
        border: 0.3rem solid var(--font-orange-05);
        border-radius: 0.5rem;
        text-align: center;
        width: 100%;
      }

      .block-skill {
        width: 100%;
        display: flex;
        border-radius: 1rem;
        align-items: center;
        gap: 2rem;
        border: 0.3rem solid var(--font-orange-05);
        padding: 1rem 2rem;

        .block-skill-image {
          flex-shrink: 0;
          width: 7rem;
          height: 7rem;
          border-radius: 50%;
          overflow: hidden;
          border: 0.3rem solid var(--skills-grid);
          object-fit: contain;
          object-position: center;
        }
        .block-text {
          /* flex-grow: 1; */
          display: flex;
          flex-direction: column;
          gap: 2rem;
          .skill-title {
            font-size: 1.8rem;
            font-weight: bold;
            /* text-align: center; */

            .skill-desc {
            }
          }
        }

        &.description {
          flex-direction: column;

          .block-skill-image {
            border-radius: 0%;
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
}
</style>
