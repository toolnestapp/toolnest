import { useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'
import FileDropzone from '../../components/FileDropzone.jsx'
import { compressPdf } from '../../utils/pdfUtils.js'
import {
  downloadBlob,
  formatBytes,
  replaceExtension
} from '../../utils/imageUtils.js'

export default function CompressPdf() {
  const [file, setFile] = useState(null)
  const [resultBlob, setResultBlob] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  function handleFiles(newFiles) {
    setError('')
    setResultBlob(null)

    const pdfFile = newFiles.find(
      (item) => item.type === 'application/pdf'
    )

    if (!pdfFile) {
      setError('Please select a PDF file.')
      return
    }

    setFile(pdfFile)
  }

  async function handleCompress() {
    if (!file) return

    setProcessing(true)
    setError('')
    setResultBlob(null)

    try {
      const blob = await compressPdf(file)
      setResultBlob(blob)
    } catch (e) {
      setError(
        e.message ||
          'Something went wrong while compressing the PDF.'
      )
    } finally {
      setProcessing(false)
    }
  }

  function handleDownload() {
    if (resultBlob && file) {
      downloadBlob(
        resultBlob,
        replaceExtension(file.name, 'pdf')
      )
    }
  }

  function handleReset() {
    setFile(null)
    setResultBlob(null)
    setError('')
  }

  const savedBytes =
    resultBlob && file
      ? Math.max(file.size - resultBlob.size, 0)
      : 0

  const savedPercent =
    file && resultBlob && file.size > 0
      ? Math.max(
          ((file.size - resultBlob.size) / file.size) * 100,
          0
        )
      : 0

  const becameLarger =
    resultBlob && file && resultBlob.size >= file.size

  return (
    <ToolPageShell
      slug="compress-pdf"
      title="Compress PDF Online"
      seoTitle="Compress PDF Online Free"
      description="Reduce PDF file size with browser-based optimization. Your file stays on your device."
      showPrivacyNote
      howToUseSteps={[
        {
          title: 'Upload your PDF',
          description:
            'Select the PDF file you want to optimize.'
        },
        {
          title: 'Compress PDF',
          description:
            'Click Compress PDF to process the file in your browser.'
        },
        {
          title: 'Review the result',
          description:
            'Compare the original and compressed file sizes.'
        },
        {
          title: 'Download',
          description:
            'Save the optimized PDF to your device.'
        }
      ]}
      faqItems={[
        {
          question: 'How much smaller will my PDF get?',
          answer:
            'It depends on the PDF. Files containing redundant internal data may shrink noticeably, while already-optimized or text-only PDFs may change very little.'
        },
        {
          question: 'Does this compress every image inside the PDF?',
          answer:
            'No. Full image recompression is not reliably possible for every PDF in a browser. This tool applies safe browser-side optimization instead.'
        },
        {
          question: 'Are my PDF files uploaded?',
          answer:
            'No. The compression happens directly in your browser, so your PDF stays on your device.'
        }
      ]}
    >
      {!file && (
        <FileDropzone
          accept="application/pdf"
          onFiles={handleFiles}
          label="Drag and drop a PDF here"
          hint="PDF files only"
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

      {file && (
        <div className="space-y-6">

          {/* Selected file */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center gap-4">

              {/* PDF icon */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7 text-red-500"
                >
                  <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
                  <path d="M14 3v5h5" />
                  <path d="M9 14h6M9 17h4" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {file.name}
                </p>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Original size: {formatBytes(file.size)}
                </p>

                <span className="mt-2 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  PDF
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="btn-primary flex-1"
              onClick={handleCompress}
              disabled={processing}
            >
              {processing
                ? 'Compressing PDF…'
                : 'Compress PDF'}
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

          {/* Result */}
          {resultBlob && (
            <div
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950"
              aria-live="polite"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                      ✓
                    </span>

                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      Compression complete
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Your optimized PDF is ready.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {formatBytes(resultBlob.size)}
                </span>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

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

                <div className="col-span-2 rounded-xl bg-brand-50 p-3 dark:bg-brand-900/20 sm:col-span-1">
                  <p className="text-xs text-brand-600 dark:text-brand-400">
                    Result
                  </p>

                  <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    {becameLarger
                      ? 'No reduction'
                      : `${savedPercent.toFixed(1)}% smaller`}
                  </p>
                </div>
              </div>

              {/* Saved message */}
              <div className="mt-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                {becameLarger ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This PDF was already optimized, so the processed
                    version is not smaller than the original.
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You saved{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatBytes(savedBytes)}
                    </span>{' '}
                    from the original file.
                  </p>
                )}
              </div>

              {/* Download */}
              <div className="mt-5">
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={handleDownload}
                >
                  Download Compressed PDF
                </button>

                <p className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
                  Your PDF was processed locally in your browser.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolPageShell>
  )
}