import type { Character } from '@/interfaces/interfaces'
import { supabase } from '@/lib/supabaseClient'

export async function fetchAllCharacters() {
  const characters = <Character[]>[]
  const { data, error } = await supabase.from('characters').select()
  if (error) {
    console.log(error)
    return
  }
  if (data as Character[]) {
    characters.push(...(data as Character[]))
    return characters
  }
}
