import { supabase } from '@/lib/supabaseClient.ts'

export async function getCharacterSkills(characterId: number) {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('character_id', characterId)
    .order('type')
    .order('order_index')
  if (error) {
    console.log(error)
    return
  }
  return data
}
