export interface Character {
  id: number
  created_at: string

  name: string
  rarity: 'sr' | 'ssr' | string
  role: 'assault' | 'support' | 'tactic' | string
  type: 'slash' | 'strike' | 'thrust' | 'spirit' | string
  tier: 's' | 'a' | 'b' | 'c' | 'd' | string

  icon_path: string | null
  image_full_path: string | null

  attack: number | null
  defence: number | null
  hp: number | null
  crit_damage: number | null
  crit_rate: number | null
}
export interface Filters {
  role: 'assault' | 'support' | 'tactic' | null
  type: 'slash' | 'strike' | 'thrust' | 'spirit' | null
  rarity: 'sr' | 'ssr' | null
}
export interface Skill {
  id: number
  created_at: string
  character_id: number | null
  name: string | null
  description: string | null
  image_path: string | null
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
    | null
  order_index: number | null
}
export interface News {
  id: number
  created_at: string
  type: string
  text: string
}
