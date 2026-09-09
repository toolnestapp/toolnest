import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import SearchBox from './SearchBox.jsx'

const NAV_LINKS = [
  { to: '/tools', label: 'Tools' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/privacy', label: 'Privacy' }
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/90">
      <div className="mx-auto flex h-16 max-w-content items-center gap-4 px-4 sm:px-6">

        {/* LOGO */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="ToolNest home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            T
          </span>

          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            ToolNest
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          className="ml-6 hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP SEARCH */}
        <div className="ml-auto hidden w-56 lg:block xl:w-64">
          <SearchBox placeholder="Search tools..." />
        </div>

        {/* ACTIONS */}
        <div className="ml-auto flex items-center gap-2 lg:ml-3">

          {/* MOBILE SEARCH */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 md:hidden"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Toggle search"
            aria-expanded={searchOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4.5 w-4.5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </button>

          <ThemeToggle />

          {/* MOBILE MENU */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {searchOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 dark:border-gray-900 dark:bg-gray-950 md:hidden">
          <SearchBox
            placeholder="Search tools..."
            autoFocus
          />
        </div>
      )}

      {/* MOBILE MENU */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-gray-100 bg-white dark:border-gray-900 dark:bg-gray-950 md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="px-4 py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}