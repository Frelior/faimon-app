import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Character } from '@/interfaces/interfaces'

export const useCharactersStore = defineStore('charactersStore', () => {
  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const currentCharacterId = ref(randomInt(1, 17))
  function changeCurrentCharacterId(newValue: number) {
    currentCharacterId.value = newValue
  }
  const characters: Character[] = [
    {
      id: 1,
      name: 'Ichigo Kurosaki (Initial)',
      rarity: 'sr',
      role: 'assault',
      type: 'slash',
    },
    {
      id: 2,
      name: 'Ichigo Kurosaki (Shikai)',
      rarity: 'sr',
      role: 'assault',
      type: 'slash',
    },
    {
      id: 3,
      name: 'Ichigo Kurosaki (Bankai)',
      rarity: 'ssr',
      role: 'assault',
      type: 'slash',
    },
    {
      id: 4,
      name: 'Rukia Kuchiki',
      rarity: 'sr',
      role: 'tactic',
      type: 'spirit',
    },
    {
      id: 5,
      name: 'Orihime Inoue',
      rarity: 'sr',
      role: 'support',
      type: 'spirit',
    },
    {
      id: 6,
      name: 'Yasutora Sado (Chad)',
      rarity: 'sr',
      role: 'assault',
      type: 'strike',
    },
    {
      id: 7,
      name: 'Yoruichi Shihoin',
      rarity: 'ssr',
      role: 'assault',
      type: 'strike',
    },
    {
      id: 8,
      name: 'Byakuya Kuchiki',
      rarity: 'ssr',
      role: 'tactic',
      type: 'slash',
    },
    {
      id: 9,
      name: 'Kisuke Urahara',
      rarity: 'ssr',
      role: 'support',
      type: 'slash',
    },
    {
      id: 10,
      name: 'Yachiru Kusajishi',
      rarity: 'sr',
      role: 'support',
      type: 'slash',
    },
    {
      id: 11,
      name: 'Nemu Kurotsuchi',
      rarity: 'sr',
      role: 'support',
      type: 'strike',
    },
    {
      id: 12,
      name: 'Renji Abarai',
      rarity: 'sr',
      role: 'assault',
      type: 'thrust',
    },
    {
      id: 13,
      name: 'Ururu Tsumugiya',
      rarity: 'sr',
      role: 'assault',
      type: 'spirit',
    },
    {
      id: 14,
      name: 'Uryu Ishida',
      rarity: 'sr',
      role: 'tactic',
      type: 'thrust',
    },
    {
      id: 15,
      name: 'Sajin Komamura',
      rarity: 'ssr',
      role: 'tactic',
      type: 'strike',
    },
    {
      id: 16,
      name: 'Ikkaku Madarame',
      rarity: 'ssr',
      role: 'assault',
      type: 'thrust',
    },
    {
      id: 17,
      name: 'Kaname Tosen',
      rarity: 'ssr',
      role: 'tactic',
      type: 'thrust',
    },
  ]

  function findCharacterById(id: number) {
    return characters.find((character) => character.id === id)
  }
  return { currentCharacterId, characters, findCharacterById, changeCurrentCharacterId }
})
