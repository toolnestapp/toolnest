import { useState } from 'react'
import FileDropzone from '../../components/FileDropzone.jsx'
import SEO from '../../components/SEO.jsx'
import {
  loadImage,
  canvasToBlob,
  formatBytes,
  downloadBlob,
  replaceExtension
} from '../../utils/imageUtils.js'

const FORMATS = [
  {
    value: 'image/jpeg',
    label: 'JPG',
    extension: 'jpg'
  },
  {
    value: 'image/png',
    label: 'PNG',
    extension: 'png'
  },
  {
    value: 'image/webp',
    label: 'WebP',
    extension: 'webp'
  }
]

export default function ImageFormatConverter() {
  const [file, setFile] = useState(null)
  const [imgData, setImgData] = useState(null)
  const [resultBlob, setResultBlob] = useState(null)

  const [fromFormat, setFromFormat] = useState('')
  const [toFormat, setToFormat] = useState('image/png')

  const [quality, setQuality] = useState(92)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  async function handleFiles(files) {
    setError('')
    setResultBlob(null)

    const selectedFile = files?.[0]

    if (!selectedFile) return

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    try {
      if (imgData?.url) {
        URL.revokeObjectURL(imgData.url)
      }

      const { img, url } = await loadImage(selectedFile)

      setFile(selectedFile)
      setImgData({ img, url })

      const detectedFormat = FORMATS.find(
        (format) => format.value === selectedFile.type
      )

      setFromFormat(detectedFormat?.value || '')
    } catch (e) {
      setError(e.message || 'Could not load the image.')
    }
  }

  async function handleConvert() {
    if (!file || !imgData) return

    setProcessing(true)
    setError('')
    setResultBlob(null)

    try {
      const blob = await canvasToBlob(imgData.img, {
        width: imgData.img.naturalWidth,
        height: imgData.img.naturalHeight,
        mimeType: toFormat,
        quality: quality / 100
      })

      setResultBlob(blob)
    } catch (e) {
      setError(
        e.message || 'Something went wrong while converting the image.'
      )
    } finally {
      setProcessing(false)
    }
  }

  function handleDownload() {
    if (!resultBlob || !file) return

    const selectedFormat = FORMATS.find(
      (format) => format.value === toFormat
    )

    if (!selectedFormat) return

    const filename = replaceExtension(
      file.name,
      selectedFormat.extension
    )

    downloadBlob(resultBlob, filename)
  }

  function handleReset() {
    if (imgData?.url) {
      URL.revokeObjectURL(imgData.url)
    }

    setFile(null)
    setImgData(null)
    setResultBlob(null)
    setFromFormat('')
    setToFormat('image/png')
    setQuality(92)
    setError('')
  }

  const currentFormat = FORMATS.find(
    (format) => format.value === fromFormat
  )

  const outputFormat = FORMATS.find(
    (format) => format.value === toFormat
  )

  return (
  <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">

    <SEO
      title="Image Format Converter"
      description="Convert images between JPG, PNG and WebP formats online for free with ToolNest."
      path="/image-converter"
    />

    {/* INTRO */}
      {!file && (
        <div className="mb-7 text-center">
          <div className="mb-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
            Image Converter
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Convert images instantly
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
            Convert JPG, PNG and WebP images directly in your browser.
            Your files stay on your device.
          </p>
        </div>
      )}

      {/* UPLOAD */}
      {!file && (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp"
          onFiles={handleFiles}
          label="Drag and drop your image here"
          hint="JPG, PNG or WebP • or click to browse"
        />
      )}

      {/* ERROR */}
      {error && (
        <div
          role="alert"
          className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
        >
          {error}
        </div>
      )}

      {/* MAIN */}
      {file && imgData && (
        <div className="space-y-6">

          {/* PREVIEW */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">

            <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Image preview
              </h2>
            </div>

            <div className="bg-gray-50 p-4 dark:bg-gray-900">
              <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
                <img
                  src={imgData.url}
                  alt="Selected image preview"
                  className="max-h-[420px] max-w-full rounded-lg object-contain"
                />
              </div>
            </div>

            {/* FILE INFO */}
            <div className="grid gap-4 border-t border-gray-100 px-5 py-4 sm:grid-cols-3 dark:border-gray-800">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  File
                </p>

                <p className="mt-1 truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                  {file.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Size
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {formatBytes(file.size)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Dimensions
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {imgData.img.naturalWidth} × {imgData.img.naturalHeight}px
                </p>
              </div>

            </div>
          </div>

          {/* CONTROLS */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">

            <div className="grid gap-5 sm:grid-cols-2">

              {/* FROM */}
              <div>
                <label
                  htmlFor="from-format"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Convert from
                </label>

                <select
                  id="from-format"
                  value={fromFormat}
                  disabled
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400"
                >
                  <option value={fromFormat}>
                    {currentFormat?.label || 'Image'}
                  </option>
                </select>
              </div>

              {/* TO */}
              <div>
                <label
                  htmlFor="to-format"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Convert to
                </label>

                <select
                  id="to-format"
                  value={toFormat}
                  onChange={(e) => {
                    setToFormat(e.target.value)
                    setResultBlob(null)
                  }}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-600 dark:focus:ring-brand-900/30"
                >
                  {FORMATS.map((format) => (
                    <option
                      key={format.value}
                      value={format.value}
                    >
                      {format.label}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* QUALITY */}
            {(toFormat === 'image/jpeg' || toFormat === 'image/webp') && (
              <div className="mt-6">

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="quality"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Quality
                  </label>

                  <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                    {quality}%
                  </span>
                </div>

                <input
                  id="quality"
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => {
                    setQuality(Number(e.target.value))
                    setResultBlob(null)
                  }}
                  className="mt-4 w-full accent-brand-600"
                />

                <div className="mt-2 flex justify-between text-xs text-gray-400">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>

              </div>
            )}

            {/* BUTTONS */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                className="btn-primary flex-1"
                onClick={handleConvert}
                disabled={processing}
              >
                {processing
                  ? 'Converting…'
                  : `Convert to ${outputFormat?.label || 'Image'}`}
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleReset}
                disabled={processing}
              >
                Choose Another
              </button>

            </div>

          </div>

          {/* RESULT */}
          {resultBlob && (
            <div
              className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5 dark:border-brand-900/50 dark:bg-brand-900/10"
              aria-live="polite"
            >

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                      ✓
                    </span>

                    <p className="font-semibold text-gray-900 dark:text-white">
                      Conversion complete
                    </p>
                  </div>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {outputFormat?.label} • {formatBytes(resultBlob.size)}
                  </p>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleDownload}
                >
                  Download Image
                </button>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  )
}