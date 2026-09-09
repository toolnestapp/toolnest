import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchTools } from '../data/tools.js'

export default function SearchBox({ large = false, placeholder = 'What do you need to do?', autoFocus = false }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const results = useMemo(() => searchTools(query).slice(0, 6), [query])

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function goToTool(slug) {
    setOpen(false)
    setQuery('')
    navigate(`/${slug}`)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (results.length > 0) {
      goToTool(results[0].slug)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} role="search">
        <label htmlFor="tool-search" className="sr-only">
          Search tools
        </label>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            id="tool-search"
            type="search"
            autoFocus={autoFocus}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className={`input-field pl-11 ${large ? 'py-4 text-lg' : ''}`}
            aria-describedby="search-help"
            aria-expanded={open && query.trim().length > 0}
            aria-controls="search-results"
          />
        </div>
      </form>
      <span id="search-help" className="sr-only">
        Type what you want to do, like "compress image" or "calculate percentage".
      </span>

      {open && query.trim().length > 0 && (
        <ul
          id="search-results"
          role="listbox"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">No tools found.</li>
          ) : (
            results.map((tool) => (
              <li key={tool.slug} role="option" aria-selected="false">
                <button
                  type="button"
                  onClick={() => goToTool(tool.slug)}
                  className="flex w-full flex-col items-start px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <span className="font-medium">{tool.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{tool.shortDescription}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
