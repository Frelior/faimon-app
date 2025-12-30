import { supabase } from '@/lib/supabaseClient.ts'

export function getImageUrl(path: string | null): string | null {
  if (!path) return null

  return supabase.storage.from('media').getPublicUrl(path).data.publicUrl
}

export function preloadImages(urls: string[]): Promise<void> {
  if (!urls.length) return Promise.resolve()

  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.src = url
          img.onload = () => resolve()
          img.onerror = () => resolve()
        }),
    ),
  ).then(() => {})
}
