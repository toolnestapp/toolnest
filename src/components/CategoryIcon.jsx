// Simple inline icon set — no external icon library needed.
const ICONS = {
  calculators: (
    <path d="M6 3h12a1 1 0 011 1v16a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1zM8 7h8M8 11h1M11.5 11h1M15 11h1M8 14h1M11.5 14h1M15 14h1M8 17h1M11.5 17h1M15 17h1" />
  ),
  'image-tools': (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M21 16l-5.5-5.5a2 2 0 00-2.8 0L3 20" />
    </>
  ),
  'pdf-tools': (
    <>
      <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M14 3v5h5" />
      <path d="M9 14h6M9 17h4" />
    </>
  ),
  'text-tools': (
    <path d="M5 4h14M12 4v16M8 20h8" />
  )
}

export default function CategoryIcon({ category, className = 'h-6 w-6' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[category] || <circle cx="12" cy="12" r="9" />}
    </svg>
  )
}
