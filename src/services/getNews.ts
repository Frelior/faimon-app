import { supabase } from '@/lib/supabaseClient.ts'
import type { News } from '@/interfaces/interfaces'

export async function getNews(): Promise<News[] | undefined> {
  const { data, error } = await supabase.from('news').select('*').order('type')
  if (error) {
    console.error(error)
    return
  }
  return data
}
