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
