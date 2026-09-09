import SEO from '../components/SEO.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

export default function Privacy() {
  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
      <SEO title="Privacy" description="How ToolNest handles your files and data." path="/privacy" />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Privacy' }]} />
      <h1 className="text-3xl font-bold tracking-tight">Privacy</h1>
      <div className="card mt-6 p-6 space-y-4 text-gray-700 dark:text-gray-300">
        <p>
          ToolNest's image tools (compress, resize and convert) and PDF tools (merge, JPG to PDF, compress) are
          designed to process your files locally in your browser using standard web technologies such as the
          Canvas API. In normal operation, these files are not uploaded to a server.
        </p>
        <p>
          Because ToolNest is a web application, we can't make absolute guarantees about every possible browser,
          extension or network configuration. If you're working with highly sensitive files, please use your own
          judgment about which tools and environments to trust.
        </p>
        <p>
          Calculators and text tools (such as the word counter and case converter) also run entirely in your
          browser — the text or numbers you enter are not sent anywhere.
        </p>
        <p>
          ToolNest does not currently use a paid analytics or advertising service. If this changes in the future,
          this page will be updated to reflect it.
        </p>
      </div>
    </div>
  )
}
