import type { Skill } from '@/interfaces/interfaces'

export function getSkillsByType(skills: Skill[], type: string | null) {
  const filteredSkills = skills.filter((skill) => skill.type === type)
  const sordedSkills = filteredSkills.sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
  return sordedSkills
}
