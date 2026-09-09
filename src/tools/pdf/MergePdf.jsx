import { useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'
import FileDropzone from '../../components/FileDropzone.jsx'
import { mergePdfFiles } from '../../utils/pdfUtils.js'
import { downloadBlob, formatBytes } from '../../utils/imageUtils.js'

export default function MergePdf() {
  const [files, setFiles] = useState([])
  const [resultBlob, setResultBlob] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  function handleFiles(newFiles) {
    setError('')
    setResultBlob(null)

    const validFiles = newFiles.filter(
      (file) => file.type === 'application/pdf'
    )

    if (validFiles.length === 0) {
      setError('Please select PDF files only.')
      return
    }

    setFiles((prev) => [...prev, ...validFiles])
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setResultBlob(null)
  }

  function moveFile(index, direction) {
    setFiles((prev) => {
      const next = [...prev]
      const target = index + direction

      if (target < 0 || target >= next.length) return prev

      ;[next[index], next[target]] = [
        next[target],
        next[index]
      ]

      return next
    })

    setResultBlob(null)
  }

  async function handleMerge() {
    if (files.length < 2) {
      setError('Please add at least two PDF files to merge.')
      return
    }

    setProcessing(true)
    setError('')
    setResultBlob(null)

    try {
      const blob = await mergePdfFiles(files)
      setResultBlob(blob)
    } catch (e) {
      setError(
        e.message ||
          'Something went wrong while merging the PDFs.'
      )
    } finally {
      setProcessing(false)
    }
  }

  function handleDownload() {
    if (resultBlob) {
      downloadBlob(resultBlob, 'toolnest-merged.pdf')
    }
  }

  function handleReset() {
    setFiles([])
    setResultBlob(null)
    setError('')
  }

  const totalSize = files.reduce(
    (total, file) => total + file.size,
    0
  )

  return (
    <ToolPageShell
      slug="merge-pdf"
      title="Merge PDF Files Online"
      seoTitle="Merge PDF Online Free"
      description="Combine multiple PDF files into a single document, processed entirely in your browser."
      showPrivacyNote
      howToUseSteps={[
        {
          title: 'Upload PDF files',
          description:
            'Add two or more PDF files you want to combine.'
        },
        {
          title: 'Arrange files',
          description:
            'Reorder your PDFs to choose the final document order.'
        },
        {
          title: 'Merge PDFs',
          description:
            'Click Merge PDFs to combine everything into one file.'
        },
        {
          title: 'Download',
          description:
            'Save the merged PDF to your device.'
        }
      ]}
      faqItems={[
        {
          question: 'Can I merge more than two PDFs?',
          answer:
            'Yes. You can add as many PDF files as your browser can comfortably process.'
        },
        {
          question: 'Can I change the PDF order?',
          answer:
            'Yes. Use the up and down buttons to arrange the PDFs before merging.'
        },
        {
          question: 'Are my PDFs uploaded to a server?',
          answer:
            'No. The merging happens directly in your browser, so your files stay on your device.'
        }
      ]}
    >
      {/* Upload */}
      <FileDropzone
        accept="application/pdf"
        multiple
        onFiles={handleFiles}
        label="Drag and drop PDF files here"
        hint="PDF files — add two or more to merge"
      />

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
        >
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6 space-y-6">

          {/* Summary */}
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center dark:border-gray-800 dark:bg-gray-950">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                PDFs selected
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Arrange your files in the order you want them merged.
              </p>
            </div>

            <div className="flex gap-2">
              <span className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                {files.length} file{files.length !== 1 ? 's' : ''}
              </span>

              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {formatBytes(totalSize)}
              </span>
            </div>
          </div>

          {/* PDF list */}
          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-brand-800"
              >
                {/* PDF icon */}
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/30">
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

                  <span className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-bold text-white">
                    {index + 1}
                  </span>
                </div>

                {/* File info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formatBytes(file.size)}
                  </p>

                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    PDF {index + 1}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveFile(index, -1)}
                    disabled={index === 0}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-800 dark:text-gray-400 dark:hover:border-brand-700 dark:hover:bg-brand-900/20 dark:hover:text-brand-400"
                    aria-label={`Move ${file.name} up`}
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    onClick={() => moveFile(index, 1)}
                    disabled={index === files.length - 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-800 dark:text-gray-400 dark:hover:border-brand-700 dark:hover:bg-brand-900/20 dark:hover:text-brand-400"
                    aria-label={`Move ${file.name} down`}
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:border-red-900/40 dark:hover:bg-red-950/30"
                    aria-label={`Remove ${file.name}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add more */}
          <FileDropzone
            accept="application/pdf"
            multiple
            onFiles={handleFiles}
            label="Add more PDF files"
            hint="PDF files only"
          />

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="btn-primary flex-1"
              onClick={handleMerge}
              disabled={processing}
            >
              {processing ? 'Merging PDFs…' : 'Merge PDFs'}
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
                      PDFs merged successfully
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {files.length} PDF files combined into one document.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {formatBytes(resultBlob.size)}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Files
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                    {files.length}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF size
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                    {formatBytes(resultBlob.size)}
                  </p>
                </div>

                <div className="col-span-2 rounded-xl bg-brand-50 p-3 dark:bg-brand-900/20 sm:col-span-1">
                  <p className="text-xs text-brand-600 dark:text-brand-400">
                    File
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-brand-600 dark:text-brand-400">
                    toolnest-merged.pdf
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={handleDownload}
                >
                  Download merged PDF
                </button>

                <p className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
                  Your PDF files are processed locally in your browser.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolPageShell>
  )
}