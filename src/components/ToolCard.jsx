import { Link } from 'react-router-dom'
import CategoryIcon from './CategoryIcon.jsx'
import { CATEGORIES } from '../data/tools.js'

export default function ToolCard({ tool }) {
  const category = CATEGORIES.find(
    (c) => c.slug === tool.category
  )

  return (
    <Link
      to={`/${tool.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-brand-700"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-300 dark:group-hover:bg-brand-900/50">
          <CategoryIcon
            category={tool.category}
            className="h-6 w-6"
          />
        </div>

        <span className="text-lg text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-500 dark:text-gray-700 dark:group-hover:text-brand-400">
          →
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-brand-600 dark:text-gray-100 dark:group-hover:text-brand-400">
          {tool.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          {tool.shortDescription}
        </p>
      </div>

      {category && (
        <div className="mt-auto pt-5">
          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {category.name}
          </span>
        </div>
      )}
    </Link>
  )
}