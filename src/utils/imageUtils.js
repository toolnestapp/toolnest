// Client-side image helpers.
// Everything here runs in the browser using Canvas.
// No image is uploaded to a server.

export function formatBytes(bytes) {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const value = bytes / Math.pow(1024, i)

  return `${value.toFixed(i === 0 ? 0 : 2)} ${units[i]}`
}

export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      resolve({ img, url })
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)

      reject(
        new Error(
          'Could not read this image. It may be corrupted or unsupported.'
        )
      )
    }

    img.src = url
  })
}

export function canvasToBlob(
  img,
  { width, height, mimeType, quality }
) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(
        new Error(
          'Your browser does not support image processing.'
        )
      )
      return
    }

    // JPG does not support transparency,
    // so use a white background.
    if (mimeType === 'image/jpeg') {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
    }

    ctx.drawImage(img, 0, 0, width, height)

    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(
            new Error(
              'Something went wrong while processing the image.'
            )
          )
        }
      },
      mimeType,
      quality
    )
  })
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename

  document.body.appendChild(a)
  a.click()
  a.remove()

  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}

export function replaceExtension(filename, newExt) {
  const dotIndex = filename.lastIndexOf('.')

  const base =
    dotIndex === -1
      ? filename
      : filename.slice(0, dotIndex)

  return `${base}.${newExt}`
}

export async function compressToTargetSize(
  file,
  targetBytes,
  {
    minQuality = 0.35,
    maxAttempts = 8
  } = {}
) {
  const { img, url } = await loadImage(file)

  try {
    let quality = 0.85
    let bestBlob = null

    // First reduce JPEG quality.
    for (let i = 0; i < maxAttempts; i++) {
      const blob = await canvasToBlob(img, {
        width: img.naturalWidth,
        height: img.naturalHeight,
        mimeType: 'image/jpeg',
        quality
      })

      if (!bestBlob || blob.size < bestBlob.size) {
        bestBlob = blob
      }

      if (blob.size <= targetBytes) {
        return blob
      }

      quality -= 0.1

      if (quality < minQuality) {
        break
      }
    }

    // If still too large, reduce dimensions.
    let scale = 0.9

    let width = img.naturalWidth
    let height = img.naturalHeight

    for (
      let i = 0;
      i < 6 && bestBlob && bestBlob.size > targetBytes;
      i++
    ) {
      width = Math.round(img.naturalWidth * scale)
      height = Math.round(img.naturalHeight * scale)

      const blob = await canvasToBlob(img, {
        width,
        height,
        mimeType: 'image/jpeg',
        quality: minQuality
      })

      if (blob.size < bestBlob.size) {
        bestBlob = blob
      }

      scale -= 0.15
    }

    return bestBlob
  } finally {
    URL.revokeObjectURL(url)
  }
}