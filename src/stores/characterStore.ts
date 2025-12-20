import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHoveredCharacterIdStore = defineStore('hoveredCharacterId', () => {
  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const characterId = ref(randomInt(1, 17))
  function changeCurrentId(newValue: number) {
    characterId.value = newValue
  }
  return { characterId, changeCurrentId }
})
