import { ref, reactive, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import type { Character, Filters, Skill } from '@/interfaces/interfaces'
import { getRandomFromArray } from '@/services/utility'
import { fetchAllCharacters, createNewCharacter } from '@/services/characters'

export const useCharactersStore = defineStore('charactersStore', () => {
  const editViewCharacterIconUrl = ref('')
  const editViewCharacterImageUrl = ref('')
  const editViewCharacterSkills = ref<Skill[]>([])
  const newCharacter = reactive<Character>(createNewCharacter())
  const characters = ref<Character[]>([])
  const currentCharacterId = ref(0)
  const currentCharacter = computed(() => {
    console.log(
      characters.value.find((character) => {
        return character.id === currentCharacterId.value
      }),
    )
    console.log(currentCharacterId.value)
    if (currentCharacterId.value === -1) return newCharacter
    return characters.value.find(
      (character: Character) => character.id === currentCharacterId.value,
    )
  })
  const filteredCharacters = computed(() =>
    filterCharacters(characters.value, filters).sort((a, b) => a.id! - b.id!),
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
  function changeCurrentCharacterId(newValue: number | undefined) {
    if (newValue) {
      currentCharacterId.value = newValue
    }
  }

  onMounted(async () => {
    const data = await fetchAllCharacters()
    if (data?.length) {
      const characterIds = data.map((character) => character.id)
      characters.value = data
      currentCharacterId.value = getRandomFromArray(characterIds as number[]) || 3
    }
  })

  return {
    currentCharacterId,
    characters,
    filteredCharacters,
    filters,
    currentCharacter,
    editViewCharacterIconUrl,
    editViewCharacterImageUrl,
    editViewCharacterSkills,
    changeCurrentCharacterId,
    resetFilters,
  }
})
