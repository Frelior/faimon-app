export function formatDate(date: string) {
  const formatted = new Date(date).toLocaleDateString('ru-RU')
  if (formatted === 'Invalid Date') return ''
  return formatted
}
