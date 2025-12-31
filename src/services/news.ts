import { supabase } from '@/lib/supabaseClient.ts'
import type { News } from '@/interfaces/interfaces'
import { setClientId } from '@/services/setClientId'
import { sanitizeHtml } from './utility'

export async function getNews(): Promise<{ news: News[]; descriptions: News[] } | undefined> {
  const { data, error } = await supabase.from('news').select('*').order('type')
  if (error) {
    console.error(error)
    return
  }
  console.log('news', data)

  const preparedNews = {
    news: data.filter((news) => news.type === 'news').map(setClientId) || [],
    descriptions: data.filter((news) => news.type === 'description').map(setClientId) || [],
  }

  return preparedNews
}

export function addNewsItem(arrayToMutate: News[], type: 'news' | 'description') {
  const item = setClientId({
    text: '',
    type: type,
  } as News)
  arrayToMutate.push(item)
  console.log(arrayToMutate)
}

export function deleteNewsItem(arrayToMutate: News[], item: News, deletedItems: number[]) {
  if (!item.client_id) {
    console.error('no client id')
    return
  }
  if (item.id) {
    deletedItems.push(item.id)
    console.log(deletedItems)
  }
  arrayToMutate.splice(
    arrayToMutate.findIndex((i) => i.client_id === item.client_id),
    1,
  )
  console.log('items after delete', arrayToMutate)
}

export function sanitizeNewsText(news: News) {
  const { text, ...rest } = news
  return {
    ...rest,
    text: sanitizeHtml(text || ''),
  }
}
