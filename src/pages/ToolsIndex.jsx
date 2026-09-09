import SEO from '../components/SEO.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import ToolCard from '../components/ToolCard.jsx'
import { TOOLS } from '../data/tools.js'

export default function ToolsIndex() {
  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
      <SEO title="All Tools" description="Browse the full list of free ToolNest calculators, image tools, PDF tools and text tools." path="/tools" />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Tools' }]} />
      <h1 className="text-3xl font-bold tracking-tight">All tools</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">{TOOLS.length} free tools, and growing.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  )
}
