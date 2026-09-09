import { useEffect, useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'
import FileDropzone from '../../components/FileDropzone.jsx'
import {
  loadImage,
  canvasToBlob,
  formatBytes,
  downloadBlob,
  replaceExtension
} from '../../utils/imageUtils.js'

const PRESETS = [
  { label: 'HD · 1280×720', width: 1280, height: 720 },
  { label: 'Instagram · 1080×1080', width: 1080, height: 1080 },
  { label: 'Passport · 413×531', width: 413, height: 531 }
]

export default function ResizeImage() {
  const [file, setFile] = useState(null)
  const [imgData, setImgData] = useState(null)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [lockAspect, setLockAspect] = useState(true)
  const [resultBlob, setResultBlob] = useState(null)
  const [resultUrl, setResultUrl] = useState('')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!resultBlob) {
      setResultUrl('')
      return
    }

    const url = URL.createObjectURL(resultBlob)
    setResultUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [resultBlob])

  async function handleFiles(files) {
    setError('')
    setResultBlob(null)

    const selectedFile = files?.[0]
    if (!selectedFile) return

    try {
      const { img, url } = await loadImage(selectedFile)

      setFile(selectedFile)
      setImgData({ img, url })
      setWidth(String(img.naturalWidth))
      setHeight(String(img.naturalHeight))
    } catch (e) {
      setError(e.message || 'Could not load the image.')
    }
  }

  function handleWidthChange(value) {
    setWidth(value)

    if (lockAspect && imgData) {
      const ratio =
        imgData.img.naturalHeight / imgData.img.naturalWidth

      const w = Number(value)

      if (!Number.isNaN(w) && w > 0) {
        setHeight(String(Math.round(w * ratio)))
      }
    }

    setResultBlob(null)
  }

  function handleHeightChange(value) {
    setHeight(value)

    if (lockAspect && imgData) {
      const ratio =
        imgData.img.naturalWidth / imgData.img.naturalHeight

      const h = Number(value)

      if (!Number.isNaN(h) && h > 0) {
        setWidth(String(Math.round(h * ratio)))
      }
    }

    setResultBlob(null)
  }

  function applyPreset(preset) {
    setWidth(String(preset.width))
    setHeight(String(preset.height))
    setResultBlob(null)
  }

  async function handleResize() {
    if (!imgData || !file) return

    const w = Number(width)
    const h = Number(height)

    if (!Number.isInteger(w) || !Number.isInteger(h) || w <= 0 || h <= 0) {
      setError('Please enter valid width and height values.')
      return
    }

    if (w > 10000 || h > 10000) {
      setError('Please keep the image dimensions below 10,000 × 10,000 pixels.')
      return
    }

    setProcessing(true)
    setError('')
    setResultBlob(null)

    try {
      let mimeType = 'image/jpeg'

      if (file.type === 'image/png') {
        mimeType = 'image/png'
      } else if (file.type === 'image/webp') {
        mimeType = 'image/webp'
      }

      const blob = await canvasToBlob(imgData.img, {
        width: w,
        height: h,
        mimeType,
        quality: 0.92
      })

      setResultBlob(blob)
    } catch (e) {
      setError(
        e.message || 'Something went wrong while resizing the image.'
      )
    } finally {
      setProcessing(false)
    }
  }

  function handleDownload() {
    if (!resultBlob || !file) return

    const ext =
      file.type === 'image/png'
        ? 'png'
        : file.type === 'image/webp'
          ? 'webp'
          : 'jpg'

    downloadBlob(
      resultBlob,
      replaceExtension(file.name, ext)
    )
  }

  function handleReset() {
    if (imgData?.url) {
      URL.revokeObjectURL(imgData.url)
    }

    setFile(null)
    setImgData(null)
    setWidth('')
    setHeight('')
    setResultBlob(null)
    setResultUrl('')
    setError('')
  }

  const originalWidth = imgData?.img?.naturalWidth || 0
  const originalHeight = imgData?.img?.naturalHeight || 0
  const newWidth = Number(width) || 0
  const newHeight = Number(height) || 0

  const dimensionChanged =
    originalWidth !== newWidth ||
    originalHeight !== newHeight

  const sizeDifference =
    resultBlob && file
      ? resultBlob.size - file.size
      : 0

  const sizeChangePercent =
    resultBlob && file
      ? Math.round(
          Math.abs(sizeDifference) / file.size * 100
        )
      : 0

  return (
    <ToolPageShell
      slug="resize-image"
      title="Resize Image Online"
      seoTitle="Resize Image Online Free"
      description="Resize JPG, PNG and WebP images to exact dimensions without installing any software."
      showPrivacyNote
      howToUseSteps={[
        {
          title: 'Upload your image',
          description:
            'Drag and drop or select a JPG, PNG or WebP image.'
        },
        {
          title: 'Set dimensions',
          description:
            'Enter your desired width and height or choose a preset.'
        },
        {
          title: 'Resize',
          description:
            'Click Resize to process the image directly in your browser.'
        },
        {
          title: 'Download',
          description:
            'Preview the result and save your resized image.'
        }
      ]}
      faqItems={[
        {
          question: 'What does locking the aspect ratio do?',
          answer:
            'When enabled, changing the width automatically adjusts the height proportionally, helping prevent the image from looking stretched or squashed.'
        },
        {
          question: 'Can I resize an image to an exact size?',
          answer:
            'Yes. Enter the exact width and height in pixels. You can also turn off the aspect ratio lock when you need completely custom dimensions.'
        },
        {
          question: 'Does resizing reduce image quality?',
          answer:
            'Making an image smaller usually maintains good quality. Enlarging an image significantly can make it appear softer or less detailed.'
        }
      ]}
    >
      {!file && (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp"
          onFiles={handleFiles}
          label="Drag and drop an image here"
          hint="JPG, PNG or WebP — or click to browse"
        />
      )}

      {error && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
        >
          {error}
        </div>
      )}

      {file && imgData && (
        <div className="space-y-6">

          {/* Main resize workspace */}
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Original preview */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Original image
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {originalWidth} × {originalHeight}px
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {formatBytes(file.size)}
                </span>
              </div>

              <div className="flex h-72 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                <img
                  src={imgData.url}
                  alt="Original image preview"
                  className="max-h-full max-w-full rounded-xl object-contain"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Resize dimensions
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Choose the exact dimensions for your image.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="width"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Width
                  </label>

                  <div className="relative">
                    <input
                      id="width"
                      type="number"
                      min="1"
                      max="10000"
                      value={width}
                      onChange={(e) =>
                        handleWidthChange(e.target.value)
                      }
                      className="input-field pr-12"
                    />

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      px
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="height"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Height
                  </label>

                  <div className="relative">
                    <input
                      id="height"
                      type="number"
                      min="1"
                      max="10000"
                      value={height}
                      onChange={(e) =>
                        handleHeightChange(e.target.value)
                      }
                      className="input-field pr-12"
                    />

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      px
                    </span>
                  </div>
                </div>
              </div>

              <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-900">
                <input
                  type="checkbox"
                  checked={lockAspect}
                  onChange={(e) => {
                    setLockAspect(e.target.checked)
                    setResultBlob(null)
                  }}
                  className="h-4 w-4 accent-brand-600"
                />

                <span>
                  <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                    Lock aspect ratio
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    Keep the original proportions
                  </span>
                </span>
              </label>

              <div className="mt-5">
                <p className="mb-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                  Quick presets
                </p>

                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-brand-700 dark:hover:bg-brand-900/20 dark:hover:text-brand-400"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  className="btn-primary flex-1"
                  onClick={handleResize}
                  disabled={processing}
                >
                  {processing ? 'Resizing…' : 'Resize Image'}
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleReset}
                  disabled={processing}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Result */}
          {resultBlob && (
            <div
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950"
              aria-live="polite"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Resize complete
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Your image has been resized successfully.
                  </p>
                </div>

                <span className="inline-flex w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  {newWidth} × {newHeight}px
                </span>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                <div>
                  <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                    Original
                  </p>

                  <div className="flex h-52 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                    <img
                      src={imgData.url}
                      alt="Original image"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {originalWidth} × {originalHeight}px
                    </span>

                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {formatBytes(file.size)}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                    Resized
                  </p>

                  <div className="flex h-52 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                    <img
                      src={resultUrl}
                      alt="Resized image"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {newWidth} × {newHeight}px
                    </span>

                    <span className="font-semibold text-brand-600 dark:text-brand-400">
                      {formatBytes(resultBlob.size)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

                <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Original size
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                    {formatBytes(file.size)}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    New size
                  </p>

                  <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    {formatBytes(resultBlob.size)}
                  </p>
                </div>

                <div className="col-span-2 rounded-xl bg-brand-50 p-3 dark:bg-brand-900/20 sm:col-span-1">
                  <p className="text-xs text-brand-600 dark:text-brand-400">
                    Size change
                  </p>

                  <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    {!dimensionChanged
                      ? 'Same dimensions'
                      : sizeDifference < 0
                        ? `${sizeChangePercent}% smaller`
                        : sizeDifference > 0
                          ? `${sizeChangePercent}% larger`
                          : 'Same size'}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={handleDownload}
                >
                  Download Resized Image
                </button>

                <p className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
                  Your image is processed locally in your browser.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolPageShell>
  )
}