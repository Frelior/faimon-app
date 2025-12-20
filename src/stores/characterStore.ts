import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCharactersStore = defineStore('charactersStore', () => {
  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const currentCharacterId = ref(randomInt(1, 17))
  function changeCurrentCharacterId(newValue: number) {
    currentCharacterId.value = newValue
  }
  return { currentCharacterId, changeCurrentCharacterId }
})
