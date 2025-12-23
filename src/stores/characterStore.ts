import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Character } from '@/interfaces/interfaces'
import { supabase } from '@/lib/supabaseClient.ts'

export const useCharactersStore = defineStore('charactersStore', () => {
  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const currentCharacterId = ref(randomInt(1, 17))

  function changeCurrentCharacterId(newValue: number) {
    currentCharacterId.value = newValue
  }
  const characters = ref<Character[]>([])

  async function fetchAllCharacters() {
    const { data, error } = await supabase.from('characters').select()

    if (error) {
      console.log(error)
      return
    }
    characters.value = data ?? []

    console.log(data)
  }

  function findCharacterById(id: number) {
    return characters.value?.find((character) => character.id === id)
  }
  return {
    currentCharacterId,
    characters,
    findCharacterById,
    changeCurrentCharacterId,
    fetchAllCharacters,
  }
})
