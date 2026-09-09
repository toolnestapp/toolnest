import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import ToolCard from '../components/ToolCard.jsx'
import { CATEGORIES, getToolsByCategory } from '../data/tools.js'

export default function CategoryPage() {
  const { categorySlug } = useParams()
  const category = CATEGORIES.find((c) => c.slug === categorySlug)
  const tools = getToolsByCategory(categorySlug)

  if (!category) {
    return (
      <div className="mx-auto max-w-content px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">We couldn't find that category.</p>
        <Link to="/categories" className="btn-primary mt-6 inline-flex">Browse categories</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
      <SEO title={category.name} description={category.description} path={`/categories/${category.slug}`} />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Categories', to: '/categories' }, { label: category.name }]} />
      <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">{category.description}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  )
}
