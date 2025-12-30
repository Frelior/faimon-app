export function isFirstLoading(): boolean {
  return !localStorage.getItem('loadedBefore')
}

export function markAsLoaded() {
  localStorage.setItem('loadedBefore', 'true')
}
