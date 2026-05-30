/** Extract a YouTube/Vimeo embed URL from a share link, if possible. */
export function getEmbedUrl(url?: string): string | null {
  if (!url) return null

  const youtube =
    url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)?.[1]
  if (youtube) return `https://www.youtube.com/embed/${youtube}`

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1]
  if (vimeo) return `https://player.vimeo.com/video/${vimeo}`

  return null
}
