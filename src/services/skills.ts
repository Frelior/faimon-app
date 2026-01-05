import type { Skill } from '@/interfaces/interfaces'
import { supabase } from '@/lib/supabaseClient.ts'
import { setClientId } from './utility'

export async function getCharacterSkills(characterId?: number): Promise<Skill[] | undefined> {
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
  const preparedSkills: Skill[] = data.map(setClientId) || []
  return preparedSkills
}

export function getSkillsByType(skills: Skill[], type: string | null) {
  const filteredSkills = skills.filter((skill) => skill.type === type)
  const sordedSkills = filteredSkills.sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
  return sordedSkills
}

export function createNewSkill(
  characterId: number,
  type:
    | 'attack'
    | 'technique'
    | 'ultimate'
    | 'counter'
    | 'dodge'
    | 'passive'
    | 'constellation'
    | 'weapon'
    | 'coreStamp'
    | 'description'
    | string,
  orderIndex: number,
): Skill {
  return setClientId({
    name: '',
    description: '',
    image_path: '',
    type: type,
    order_index: orderIndex,
    character_id: characterId,
  } as Skill)
}

export function sortSkillsByOrderIndex(skills: Skill[]): Skill[] {
  return skills.map((skill) => {
    const index = skills.indexOf(skill) + 1
    console.log('index', index)

    return { ...skill, order_index: index }
  })
}
