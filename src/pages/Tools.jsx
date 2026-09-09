import { Link } from 'react-router-dom'
import { CATEGORIES, getToolsByCategory } from '../data/tools.js'
import ToolCard from '../components/ToolCard.jsx'
import SEO from '../components/SEO.jsx'

export default function Tools() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SEO
  title="All Tools"
  description="Explore all of ToolNest's free online tools for image, PDF, text and calculator tasks."
  path="/tools"
/>
        <div className="mb-10">
          <Link
            to="/"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            ← Back to Home
          </Link>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            All Tools
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
            Explore all of ToolNest's free online tools.
          </p>
        </div>

        <div className="space-y-12">
          {CATEGORIES.map((category) => {
            const tools = getToolsByCategory(category.slug)

            return (
              <section key={category.slug}>
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {tools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}