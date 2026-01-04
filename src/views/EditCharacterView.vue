<script setup lang="ts">
import EditCharacterSkillsView from './EditCharacterSkillsView.vue'
import CharacterHexagonComponent from '@/components/CharacterHexagonComponent/CharacterHexagonComponent.vue'
import type { Character } from '@/interfaces/interfaces'
import { useCharactersStore } from '@/stores/characterStore'
import { computed, onBeforeUnmount, ref } from 'vue'
import { uploadImage, generateImagePath, deleteImage, setPreview } from '@/services/images'
import { updateCharacter, deleteCharacter as delChar } from '@/services/characters'
const processing = ref(false)
const store = useCharactersStore()
const characters = computed(() => store.characters)
const currentCharacter = computed(() => store.currentCharacter as Character)
const currentCharacterFields = computed(() => {
  if (currentCharacter.value) {
    return Object.keys(currentCharacter.value) as (keyof Character)[]
  }
  return []
})
const selectedCharacterId = computed({
  get: () => store.currentCharacterId,
  set: (id) => {
    if (id !== null) store.changeCurrentCharacterId(id)
  },
})

const iconFile = ref<File | null>(null)
const imageFile = ref<File | null>(null)
const oldIconPath = ref<string | null>(null)
const oldImagePath = ref<string | null>(null)
function onIconChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (!target.files || !target.files[0]) return
  iconFile.value = target.files[0]
  console.log(iconFile.value)
  store.editViewCharacterIconUrl = setPreview(iconFile.value, store.editViewCharacterIconUrl)
  console.log(store.editViewCharacterIconUrl)
  const path = generateImagePath('characterIcons', iconFile.value.name)
  oldIconPath.value = currentCharacter.value.icon_path
  currentCharacter.value.icon_path = path
}
function onImageChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (!target.files || !target.files[0]) return
  imageFile.value = target.files[0]
  console.log(imageFile.value)
  store.editViewCharacterImageUrl = setPreview(imageFile.value, store.editViewCharacterImageUrl)
  console.log(store.editViewCharacterIconUrl)
  const path = generateImagePath('characterFull', imageFile.value.name)
  oldImagePath.value = currentCharacter.value.image_full_path
  currentCharacter.value.image_full_path = path
}
async function uploadCharacter() {
  processing.value = true
  const confirm = window.confirm('Вы уверены, что хотите обновить персонажа?')
  if (!confirm) return
  const character = currentCharacter.value
  if (!character.name) {
    alert('НЕТ ИМЕНИ ПЕРСОНАЖА')
    processing.value = false
    return
  }
  console.log('UPLOADINBG CHARACTER: ', character)
  let imagesError = false
  if (character.icon_path) {
    if (oldIconPath.value) await deleteImage(oldIconPath.value).catch((e) => console.log(e))
    await uploadImage(character.icon_path, iconFile.value).catch(() => (imagesError = true))
  }
  if (character.image_full_path) {
    if (oldImagePath.value) await deleteImage(oldImagePath.value).catch((e) => console.log(e))
    await uploadImage(character.image_full_path, imageFile.value).catch(() => (imagesError = true))
  }
  await updateCharacter(character)
  processing.value = false
  store.editViewCharacterIconUrl = ''
  store.editViewCharacterImageUrl = ''
  if (imagesError) {
    alert('Ошибка загрузки изображений')
  }
  alert('Информация персонажа обновлена, перезагрузите страницу')
  store.changeCurrentCharacterId(character.id)
}
async function deleteCharacter() {
  processing.value = true
  const confirm = window.confirm('Вы уверены, что хотите удалить персонажа?')
  if (!confirm) {
    processing.value = false
    return
  }
  await delChar(currentCharacter.value)
  processing.value = false
}
onBeforeUnmount(() => {
  if (store.editViewCharacterIconUrl) {
    URL.revokeObjectURL(store.editViewCharacterIconUrl)
  }
  if (store.editViewCharacterImageUrl) {
    URL.revokeObjectURL(store.editViewCharacterImageUrl)
  }
})
</script>

<template>
  <div class="view-container edit-character" v-if="currentCharacter">
    <div class="character-info">
      <button
        @click="
          {
            ;(console.log(currentCharacter), console.log(store.currentCharacterId))
          }
        "
      >
        object log
      </button>

      <div class="header">
        <div class="selected">
          <p>Выбрано: {{ currentCharacter.name }}</p>
          <select v-model="selectedCharacterId">
            <option v-for="character in characters" :key="character.id" :value="character.id">
              {{ character.name }}
            </option>
            <option :value="-1">Новый</option>
          </select>
        </div>
        <div class="preview-icons">
          <CharacterHexagonComponent :character="currentCharacter" />
          <CharacterHexagonComponent :character="currentCharacter" squared />
        </div>
      </div>

      <div class="current-info">
        <div class="debug-info">
          <div v-for="field in currentCharacterFields" :key="field">
            {{ field }}: {{ currentCharacter[field] }}
          </div>
        </div>
        <div class="object-ifno">
          <div class="info-fields">
            <label
              >Имя
              <input type="text" v-model="currentCharacter.name" />
            </label>
            <label
              >Редкость
              <select v-model="currentCharacter.rarity">
                <option value="sr">sr</option>
                <option value="ssr">ssr</option>
              </select>
            </label>
            <label
              >Роль
              <select v-model="currentCharacter.role">
                <option value="assault">assault</option>
                <option value="support">support</option>
                <option value="tactic">tactic</option>
              </select>
            </label>
            <label
              >Тип урона
              <select v-model="currentCharacter.type">
                <option value="slash">slash</option>
                <option value="strike">strike</option>
                <option value="thrust">thrust</option>
                <option value="spirit">spirit</option>
              </select>
            </label>
            <label
              >Тир
              <select v-model="currentCharacter.tier">
                <option value="s">s</option>
                <option value="a">a</option>
                <option value="b">b</option>
                <option value="c">c</option>
                <option value="d">d</option>
              </select>
            </label>
          </div>
          <div class="info-fields">
            <label
              >АТК
              <input type="number" v-model="currentCharacter.attack" />
            </label>
            <label
              >DEF
              <input type="number" v-model="currentCharacter.defence" />
            </label>
            <label
              >HP
              <input type="number" v-model="currentCharacter.hp" />
            </label>
            <label
              >CRIT DMG %
              <input type="number" v-model="currentCharacter.crit_damage" />
            </label>
            <label
              >CRIT RATE %
              <input type="number" v-model="currentCharacter.crit_rate" />
            </label>
          </div>
          <div class="info-fields">
            <label
              >Иконка 136х160 .png
              <input type="file" accept="image/png" @change="onIconChange" multiple="false" />
            </label>
            <label
              >1920х1080 арт персонажа .png
              <input type="file" accept="image/png" @change="onImageChange" multiple="false" />
            </label>
          </div>
        </div>
      </div>

      <div class="btns">
        <button class="btn save" @click="uploadCharacter">СОХРАНИТЬ ПЕРСОНАЖА</button>
        <p v-if="processing">загрузочка...</p>
        <button class="btn delete" @click="deleteCharacter">УДАЛИТЬ ПЕРСОНАЖА</button>
      </div>
    </div>
    <EditCharacterSkillsView />
  </div>
</template>

<style scoped>
.edit-character {
  position: relative;

  .character-info {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      /* background-color: red; */
    }
    .preview-icons {
      pointer-events: none;
      display: flex;
      gap: 1rem;
    }
    .current-info {
      border: 0.3rem solid var(--border-gray);

      display: flex;
      flex-direction: column;
      gap: 1rem;
      .debug-info {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        div {
          border: 0.1rem solid var(--border-gray);
          opacity: 0.7;
        }
      }
      .object-ifno {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        .info-fields {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          label {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
  .btns {
    margin-top: 2rem;
    font-weight: bold;
    display: flex;
    gap: 3rem;

    .btn {
      padding: 0.5rem 2rem;
      width: fit-content;
      cursor: pointer;
      &.save {
        background-color: rgb(0, 196, 0);
      }
      &.delete {
        background-color: red;
      }
    }
  }
}
</style>
