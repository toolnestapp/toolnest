import { Link } from 'react-router-dom'
import { getRelatedTools } from '../data/tools.js'

export default function RelatedTools({ slug }) {
  const related = getRelatedTools(slug)
  if (related.length === 0) return null

  return (
    <section className="mt-8" aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading" className="text-xl font-semibold mb-4">Related tools</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            to={`/${tool.slug}`}
            className="card flex flex-col p-4 hover:border-brand-400 transition"
          >
            <span className="font-medium">{tool.name}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{tool.shortDescription}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
