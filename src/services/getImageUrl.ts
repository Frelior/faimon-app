import { supabase } from '@/lib/supabaseClient.ts'

export function getImageUrl(path: string | null): string | null {
  if (!path) return null

  return supabase.storage.from('media').getPublicUrl(path).data.publicUrl
}
