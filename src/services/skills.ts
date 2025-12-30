import type { Skill } from '@/interfaces/interfaces'
import { supabase } from '@/lib/supabaseClient.ts'

export async function getCharacterSkills(characterId: number): Promise<Skill[] | undefined> {
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

export function getSkillsByType(skills: Skill[], type: string | null) {
  const filteredSkills = skills.filter((skill) => skill.type === type)
  const sordedSkills = filteredSkills.sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
  return sordedSkills
}
