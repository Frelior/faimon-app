export interface Character {
  id: number
  name: string
  rarity: 'sr' | 'ssr'
  role: 'assault' | 'support' | 'tactic'
  type: 'slash' | 'strike' | 'thrust' | 'spirit'
}
