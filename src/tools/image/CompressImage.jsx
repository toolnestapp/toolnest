import { useEffect, useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'
import FileDropzone from '../../components/FileDropzone.jsx'
import { loadImage, canvasToBlob, formatBytes, downloadBlob, replaceExtension } from '../../utils/imageUtils.js'

export default function CompressImage() {
  const [file, setFile] = useState(null)
  const [imgData, setImgData] = useState(null)
  const [quality, setQuality] = useState(0.8)
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
    try {
      const f = files[0]
      const { img, url } = await loadImage(f)
      setFile(f)
      setImgData({ img, url })
    } catch (e) {
      setError(e.message)
    }
  }

  async function handleCompress() {
    if (!imgData) return
    setProcessing(true)
    setError('')
    try {
      const blob = await canvasToBlob(imgData.img, {
        width: imgData.img.naturalWidth,
        height: imgData.img.naturalHeight,
        mimeType: 'image/jpeg',
        quality
      })
      setResultBlob(blob)
    } catch (e) {
      setError(e.message || 'Something went wrong while processing the file.')
    } finally {
      setProcessing(false)
    }
  }

  function handleDownload() {
    if (resultBlob && file) {
      downloadBlob(resultBlob, replaceExtension(file.name, 'jpg'))
    }
  }

  function handleReset() {
  if (imgData?.url) URL.revokeObjectURL(imgData.url)
  setFile(null)
  setImgData(null)
  setResultBlob(null)
  setCompressedUrl('')
  setError('')
}

  return (
    <ToolPageShell
      slug="compress-image"
      title="Compress Image Online"
      seoTitle="Compress Image Online Free"
      description="Reduce image file size quickly without uploading your files."
      showPrivacyNote
      howToUseSteps={[
        { title: 'Upload your image', description: 'Drag and drop a JPG, PNG or WebP file, or click to browse.' },
        { title: 'Choose a quality level', description: 'Move the slider to balance file size against image quality.' },
        { title: 'Compress the image', description: 'Click Compress to process the file in your browser.' },
        { title: 'Download the result', description: 'Save the compressed image to your device.' }
      ]}
      faqItems={[
        { question: 'Are my images uploaded anywhere?', answer: 'No. Compression happens entirely in your browser using the Canvas API — your files never leave your device.' },
        { question: 'Which formats are supported?', answer: 'You can upload JPG, JPEG, PNG or WebP images. The compressed output is saved as JPG for the smallest file size.' },
        { question: 'Will compression reduce image quality?', answer: 'Some quality loss is expected with lossy compression. Use the slider to find the right balance for your needs.' }
      ]}
    >
      {!file && <FileDropzone accept="image/jpeg,image/png,image/webp" onFiles={handleFiles} label="Drag and drop an image here" hint="JPG, PNG or WebP — or click to browse" />}

      {error && <p role="alert" className="mt-4 text-red-600 dark:text-red-400">{error}</p>}

      {file && imgData && (
        <div className="mt-2">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium">Preview</p>
              <img src={imgData.url} alt="Selected preview" className="max-h-64 w-full rounded-xl object-contain bg-gray-50 dark:bg-gray-900" />
              <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
  <p>Original size: {formatBytes(file.size)}</p>
  <p>
    Dimensions: {imgData.img.naturalWidth} × {imgData.img.naturalHeight}px
  </p>
</div>
            </div>

            <div>
              <div>
  <div className="flex items-center justify-between">
    <label
      htmlFor="quality"
      className="text-sm font-semibold text-gray-900 dark:text-white"
    >
      Image quality
    </label>

    <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-sm font-semibold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
      {Math.round(quality * 100)}%
    </span>
  </div>

  <input
    id="quality"
    type="range"
    min="0.1"
    max="1"
    step="0.05"
    value={quality}
    onChange={(e) => {
      setQuality(Number(e.target.value))
      setResultBlob(null)
    }}
    className="mt-4 w-full accent-brand-600"
  />

  <div className="mt-2 flex justify-between text-xs text-gray-400 dark:text-gray-500">
    <span>Smaller file</span>
    <span>Better quality</span>
  </div>

  <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
    Higher quality keeps more detail but creates a larger file.
  </p>
</div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="btn-primary" onClick={handleCompress} disabled={processing}>
                  {processing ? 'Compressing…' : 'Compress'}
                </button>
                <button type="button" className="btn-secondary" onClick={handleReset}>
                  Reset
                </button>
              </div>

              {resultBlob && (
  <div
    className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950"
    aria-live="polite"
  >
    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
      Compression complete
    </h3>

    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div>
        <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
          Original image
        </p>

        <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2 dark:bg-gray-900">
          <img
  src={compressedUrl}
  alt="Compressed image"
  className="max-h-full max-w-full object-contain"
/>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
          Compressed image
        </p>

        <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2 dark:bg-gray-900">
          <img
            src={URL.createObjectURL(resultBlob)}
            alt="Compressed image"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    </div>

    <div className="mt-4 grid grid-cols-3 gap-3">
      <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Original
        </p>
        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
          {formatBytes(file.size)}
        </p>
      </div>

      <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Compressed
        </p>
        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
          {formatBytes(resultBlob.size)}
        </p>
      </div>

      <div className="rounded-xl bg-brand-50 p-3 dark:bg-brand-900/20">
        <p className="text-xs text-brand-600 dark:text-brand-400">
          Saved
        </p>
        <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
  {file.size > resultBlob.size
    ? `${Math.round((1 - resultBlob.size / file.size) * 100)}% smaller`
    : 'No reduction'}
</p>
<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
  {file.size > resultBlob.size
    ? `${formatBytes(file.size - resultBlob.size)} saved`
    : 'No space saved'}
</p>
      </div>
    </div>

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
          </div>
        </div>
      )}
    </ToolPageShell>
  )
}
