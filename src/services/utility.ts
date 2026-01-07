import DOMPurify from 'dompurify'

export function formatDate(date: string | undefined): string {
  if (!date) return ''
  const formatted = new Date(date).toLocaleDateString('ru-RU')
  if (formatted === 'Invalid Date') return ''
  return formatted
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function setClientId<T extends { client_id?: string | null }>(obj: T): T {
  return {
    ...obj,
    client_id: obj.client_id ?? generateUUID(),
  }
}

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function removeClientId<T extends { client_id?: string | null }>(
  obj: T,
): Omit<T, 'client_id'> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { client_id, ...rest } = obj
  return rest
}

export function sanitizeHtml(html: string) {
  if (!html) return ''
  return DOMPurify.sanitize(html)
}
