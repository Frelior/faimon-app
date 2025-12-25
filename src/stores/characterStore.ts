import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Character } from '@/interfaces/interfaces'
import { supabase } from '@/lib/supabaseClient.ts'
import type { Filters } from '@/interfaces/interfaces'

export const useCharactersStore = defineStore('charactersStore', () => {
  const currentCharacterId = ref(randomInt(1, 17))
  const characters = ref<Character[]>([])
  const filteredCharacters = computed(() => filterCharacters(characters.value, filters))
  const filters = reactive<Filters>({
    role: null,
    type: null,
    rarity: null,
  })

  function filterCharacters(characters: Character[], filters: Filters): Character[] {
    return characters.filter((character) => {
      if (filters.role && character.role !== filters.role) return false
      if (filters.type && character.type !== filters.type) return false
      if (filters.rarity && character.rarity !== filters.rarity) return false
      return true
    })
  }

  function resetFilters() {
    filters.role = null
    filters.type = null
    filters.rarity = null
  }

  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function changeCurrentCharacterId(newValue: number) {
    currentCharacterId.value = newValue
  }

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
    filteredCharacters,
    filters,
    findCharacterById,
    changeCurrentCharacterId,
    fetchAllCharacters,
    resetFilters,
  }
})
