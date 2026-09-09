import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/tools.js'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          <div>
            <Link to="/" className="text-xl font-bold text-brand-600">
  ToolNest
</Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500 dark:text-gray-400">
              Simple, fast and free online tools for everyday tasks.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <div className="mt-4 space-y-3">
              <Link to="/" className="block text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400">
                Home
              </Link>
              <Link to="/tools" className="block text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400">
                All Tools
              </Link>
              <Link to="/categories" className="block text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400">
                Categories
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Categories
            </h3>
            <div className="mt-4 space-y-3">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  to={`/categories/${category.slug}`}
                  className="block text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Information
            </h3>
            <div className="mt-4 space-y-3">
              <Link to="/privacy" className="block text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400">
                Terms of Use
              </Link>
              <Link to="/contact" className="block text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400">
                Contact
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} ToolNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}