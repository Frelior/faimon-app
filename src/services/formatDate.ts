export function formatDate(date: string | undefined): string {
  if (!date) return ''
  const formatted = new Date(date).toLocaleDateString('ru-RU')
  if (formatted === 'Invalid Date') return ''
  return formatted
}
