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

export function generateImagePath(
  folder: 'characterFull' | 'characterIcons' | 'descriptionImages' | 'skillIcons',
  name: string,
) {
  const cleanName = name.replace(/[^a-zA-Z0-9._-]/g, '')
  return `images/${folder}/${crypto.randomUUID()}_${cleanName}`
}

export async function uploadImage(path: string, file: File | null) {
  if (!file || !path) return null

  const { error } = await supabase.storage.from('media').upload(path, file)

  if (error) {
    console.error(error)
    alert('Ошибка загрузки изображения' + error.message + ' путь файла: ' + path)

    return null
  }

  const { data } = supabase.storage.from('media').getPublicUrl(path)

  return data.publicUrl
}

export async function deleteImage(path: string) {
  if (!path) return
  const { error } = await supabase.storage.from('media').remove([path])
  if (error) {
    console.error(error)
    alert('Ошибка удаления изображения' + error.message + ' путь файла: ' + path)
  }
}

export function setPreview(file: File, oldUrl?: string): string {
  if (oldUrl) {
    URL.revokeObjectURL(oldUrl)
  }
  return URL.createObjectURL(file)
}
