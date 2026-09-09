import { useCallback, useId, useRef, useState } from 'react'

/**
 * Reusable drag-and-drop / click-to-browse file input.
 *
 * Props:
 * - accept: string, e.g. "image/jpeg,image/png"
 * - multiple: boolean
 * - maxSizeMB: number, per-file size limit
 * - onFiles: (files: File[]) => void — called with validated files
 * - label / hint: strings shown in the dropzone
 */
export default function FileDropzone({
  accept,
  multiple = false,
  maxSizeMB = 25,
  onFiles,
  label = 'Drag and drop your file here',
  hint = 'or click to browse'
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const inputId = useId()

  const acceptedTypes = accept ? accept.split(',').map((s) => s.trim()) : null

  const validate = useCallback(
    (fileList) => {
      const files = Array.from(fileList)
      if (files.length === 0) return []

      if (!multiple && files.length > 1) {
        setError('Please select only one file.')
        return []
      }

      for (const file of files) {
        if (acceptedTypes && acceptedTypes.length > 0) {
          const matches = acceptedTypes.some((type) => {
            if (type.endsWith('/*')) {
              return file.type.startsWith(type.replace('/*', '/'))
            }
            return file.type === type
          })
          if (!matches) {
            setError('Unsupported file type.')
            return []
          }
        }
        if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
          setError(`File is too large. Maximum size is ${maxSizeMB}MB.`)
          return []
        }
      }

      setError('')
      return files
    },
    [acceptedTypes, maxSizeMB, multiple]
  )

  function handleFiles(fileList) {
    const valid = validate(fileList)
    if (valid.length > 0) {
      onFiles(valid)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer?.files?.length) {
      handleFiles(e.dataTransfer.files)
    }
  }

  function handleInputChange(e) {
    if (e.target.files?.length) {
      handleFiles(e.target.files)
    }
    // allow re-selecting the same file
    e.target.value = ''
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      inputRef.current?.click()
    }
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        aria-label={label}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition ${
          isDragging
            ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
            : 'border-gray-300 dark:border-gray-700 hover:border-brand-400'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10 text-brand-500" aria-hidden="true">
          <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
          <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
        </svg>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{hint}</p>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="sr-only"
        />
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
