import { useState, useEffect } from 'react'

let cached: boolean | null = null
let promise: Promise<boolean> | null = null

function check(): Promise<boolean> {
  if (promise) return promise
  promise = Promise.all(
    ['ru', 'en', 'kz'].map(l =>
      fetch(`/videos/video-${l}.mp4`, { method: 'HEAD' })
        .then(r => r.ok)
        .catch(() => false)
    )
  ).then(results => {
    cached = results.some(Boolean)
    return cached
  })
  return promise
}

export function useVideosAvailable(): boolean | null {
  const [available, setAvailable] = useState<boolean | null>(cached)

  useEffect(() => {
    if (cached !== null) return
    check().then(setAvailable)
  }, [])

  return available
}
