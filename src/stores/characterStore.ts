import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Character } from '@/interfaces/interfaces'
import { supabase } from '@/lib/supabaseClient.ts'
import type { Filters } from '@/interfaces/interfaces'
import { randomInt } from '@/services/randomInt'

export const useCharactersStore = defineStore('charactersStore', () => {
  const characters = ref<Character[]>([])
  const currentCharacterId = ref(0)
  const currentCharacter = computed(() =>
    characters.value.find((character) => character.id === currentCharacterId.value),
  )
  const filteredCharacters = computed(() =>
    filterCharacters(characters.value, filters).sort((a, b) => a.id - b.id),
  )
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

  function changeCurrentCharacterId(newValue: number) {
    currentCharacterId.value = newValue
  }
  async function fetchAllCharacters() {
    const { data, error } = await supabase.from('characters').select()
    if (error) {
      console.log(error)
      return
    }
    if (data) {
      currentCharacterId.value = randomInt(1, data.length)
      characters.value = data ?? []
    }
  }

  return {
    currentCharacterId,
    characters,
    filteredCharacters,
    filters,
    currentCharacter,
    changeCurrentCharacterId,
    fetchAllCharacters,
    resetFilters,
  }
})
