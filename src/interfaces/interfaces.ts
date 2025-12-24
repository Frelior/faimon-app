export interface Character {
  id: number
  created_at: string

  name: string
  rarity: 'sr' | 'ssr' | string
  role: 'assault' | 'support' | 'tactic' | string
  type: 'slash' | 'strike' | 'thrust' | 'spirit' | string

  icon_url: string | null
  image_full_url: string | null

  attack: number | null
  defence: number | null
  hp: number | null
  crit_damage: number | null
  crit_rate: number | null
}
