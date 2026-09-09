import { useEffect, useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'
import FileDropzone from '../../components/FileDropzone.jsx'
import {
  loadImage,
  compressToTargetSize,
  formatBytes,
  downloadBlob,
  replaceExtension
} from '../../utils/imageUtils.js'

const TARGET_BYTES = 100 * 1024

export default function CompressImageTo100KB() {
  const [file, setFile] = useState(null)
  const [imgData, setImgData] = useState(null)
  const [resultBlob, setResultBlob] = useState(null)
  const [compressedUrl, setCompressedUrl] = useState('')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!resultBlob) {
      setCompressedUrl('')
      return
    }

    const url = URL.createObjectURL(resultBlob)
    setCompressedUrl(url)

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
    } catch (e) {
      setError(e.message || 'Could not load the image.')
    }
  }

  async function handleCompress() {
    if (!file) return

    setProcessing(true)
    setError('')

    try {
      const blob = await compressToTargetSize(file, TARGET_BYTES)
      setResultBlob(blob)
    } catch (e) {
      setError(
        e.message || 'Something went wrong while processing the file.'
      )
    } finally {
      setProcessing(false)
    }
  }

  function handleDownload() {
    if (resultBlob && file) {
      downloadBlob(
        resultBlob,
        replaceExtension(file.name, 'jpg')
      )
    }
  }

  function handleReset() {
    if (imgData?.url) {
      URL.revokeObjectURL(imgData.url)
    }

    setFile(null)
    setImgData(null)
    setResultBlob(null)
    setCompressedUrl('')
    setError('')
  }

  const achieved =
    resultBlob && resultBlob.size <= TARGET_BYTES

  const compressionPercent =
    resultBlob && file
      ? Math.round((1 - resultBlob.size / file.size) * 100)
      : null

  return (
    <ToolPageShell
      slug="compress-image-to-100kb"
      title="Compress Image to 100KB Online"
      seoTitle="Compress Image to 100KB Online Free"
      description="Automatically compress an image to around 100KB while keeping it as sharp as possible."
      showPrivacyNote
      howToUseSteps={[
        {
          title: 'Upload your image',
          description:
            'Drag and drop or select a JPG, PNG or WebP image.'
        },
        {
          title: 'Click Compress',
          description:
            'The tool automatically tries multiple quality levels to reach 100KB.'
        },
        {
          title: 'Check the result',
          description:
            'Review the final size and compression percentage.'
        },
        {
          title: 'Download',
          description:
            'Save your compressed image.'
        }
      ]}
      faqItems={[
        {
          question:
            'Will my image always reach exactly 100KB?',
          answer:
            "The tool gets as close as possible while keeping reasonable quality. For some images, especially very detailed ones, the exact target may not be achievable — we never overstate the result."
        },
        {
          question:
            'What format is the output?',
          answer:
            'The compressed file is saved as JPG, which compresses more efficiently than PNG for photos.'
        }
      ]}
    >
      {!file && (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp"
          onFiles={handleFiles}
          label="Drag and drop your image here"
          hint="JPG, PNG or WebP — or click to browse"
        />
      )}

      {error && (
        <p
          role="alert"
          className="mt-4 text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}

      {file && (
        <div className="mt-4">

          {/* Original preview */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
            <img
              src={imgData?.url}
              alt="Selected image preview"
              className="mx-auto max-h-72 w-full rounded-xl object-contain"
            />
          </div>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Selected: {file.name} ({formatBytes(file.size)})
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-primary"
              onClick={handleCompress}
              disabled={processing}
            >
              {processing
                ? 'Compressing…'
                : 'Compress to ~100KB'}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>

          {/* Result */}
          {resultBlob && (
            <div
              className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950"
              aria-live="polite"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Compression complete
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Your image has been compressed toward the 100KB target.
                  </p>
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    achieved
                      ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}
                >
                  {achieved ? 'Under 100KB' : 'Best possible'}
                </div>
              </div>

              {/* Before / After */}
              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                <div>
                  <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                    Original image
                  </p>

                  <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2 dark:bg-gray-900">
                    <img
                      src={imgData?.url}
                      alt="Original image"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {formatBytes(file.size)}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                    Compressed image
                  </p>

                  <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2 dark:bg-gray-900">
                    <img
                      src={compressedUrl}
                      alt="Compressed image"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <p className="mt-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    {formatBytes(resultBlob.size)}
                  </p>
                </div>

              </div>

              {/* Size information */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

                <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Target
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                    100KB
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Final size
                  </p>

                  <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    {formatBytes(resultBlob.size)}
                  </p>
                </div>

                <div className="col-span-2 rounded-xl bg-brand-50 p-3 dark:bg-brand-900/20 sm:col-span-1">
                  <p className="text-xs text-brand-600 dark:text-brand-400">
                    Saved
                  </p>

                  <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    {file.size > resultBlob.size
                      ? formatBytes(file.size - resultBlob.size)
                      : 'No reduction'}
                  </p>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {file.size > resultBlob.size
                      ? `${compressionPercent}% smaller`
                      : 'File size did not decrease'}
                  </p>
                </div>

              </div>

              {/* Target warning */}
              {!achieved && (
                <div className="mt-4 rounded-xl bg-amber-50 p-3 dark:bg-amber-900/20">
                  <p className="text-sm leading-5 text-amber-700 dark:text-amber-400">
                    The image could not be reduced below 100KB
                    while keeping reasonable quality. This is the
                    smallest practical result the tool could achieve.
                  </p>
                </div>
              )}

              {/* Download */}
              <div className="mt-5">
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={handleDownload}
                >
                  Download Compressed Image
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