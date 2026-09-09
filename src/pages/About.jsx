import SEO from '../components/SEO.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

export default function About() {
  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
      <SEO title="About" description="Learn about ToolNest, a collection of simple online utilities for everyday digital tasks." path="/about" />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
      <h1 className="text-3xl font-bold tracking-tight">About ToolNest</h1>
      <div className="card mt-6 p-6 space-y-4 text-gray-700 dark:text-gray-300">
        <p>
          ToolNest is a collection of simple online utilities designed to make everyday digital tasks faster.
        </p>
        <p>
          The goal is straightforward: give people fast, no-fuss calculators, image tools, PDF tools and text tools
          that work directly in the browser, without requiring an account or a paywall to get started.
        </p>
        <p>
          ToolNest is a work in progress, and new tools are added over time based on what people find useful.
        </p>
      </div>
    </div>
  )
}
