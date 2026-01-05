import type { Character } from '@/interfaces/interfaces'
import { supabase } from '@/lib/supabaseClient'
import { setClientId } from '@/services/setClientId'
import { deleteImage } from './images'

export async function fetchAllCharacters() {
  const characters = <Character[]>[]
  const { data, error } = await supabase.from('characters').select()
  if (error) {
    console.log(error)
    return
  }
  if (data as Character[]) {
    data.forEach((char) => characters.push(setClientId(char)))

    return characters
  }
}

export async function updateCharacter(character: Character) {
  if (!character) return
  if (character.client_id) delete character.client_id
  const { error } = await supabase.from('characters').upsert(character).eq('id', character.id)
  if (error) {
    console.log(error)
    return
  }
}

export async function deleteCharacter(character: Character) {
  if (!character) return
  if (!character.id) return
  if (character.icon_path) await deleteImage(character.icon_path)
  if (character.image_full_path) await deleteImage(character.image_full_path)
  const { error } = await supabase.from('characters').delete().eq('id', character.id)
  if (error) {
    console.log(error)
    return
  }
  alert('Персонаж удален')
}

export function createNewCharacter() {
  const character = setClientId({
    name: '',
    rarity: 'sr',
    role: 'assault',
    type: 'slash',
    tier: 's',

    icon_path: null,
    image_full_path: null,

    attack: null,
    defence: null,
    hp: null,
    crit_damage: null,
    crit_rate: null,
  } as Character)
  return character
}
