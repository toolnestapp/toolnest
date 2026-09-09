import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import CategoryIcon from '../components/CategoryIcon.jsx'
import { CATEGORIES, getToolsByCategory } from '../data/tools.js'

export default function Categories() {
  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
      <SEO title="Tool Categories" description="Browse all ToolNest categories: calculators, image tools, PDF tools and text tools." path="/categories" />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Categories' }]} />
      <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">Browse every ToolNest tool by category.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((cat) => {
          const count = getToolsByCategory(cat.slug).length
          return (
            <Link key={cat.slug} to={`/categories/${cat.slug}`} className="card flex items-start gap-4 p-5 hover:border-brand-400 hover:shadow-md transition">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                <CategoryIcon category={cat.slug} className="h-7 w-7" />
              </div>
              <div>
                <h2 className="font-semibold">{cat.name}</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{cat.description}</p>
                <p className="mt-2 text-sm font-medium text-brand-600">{count} tools</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
