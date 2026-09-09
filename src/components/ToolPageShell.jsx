import Breadcrumb from './Breadcrumb.jsx'
import HowToUse from './HowToUse.jsx'
import FAQ from './FAQ.jsx'
import RelatedTools from './RelatedTools.jsx'
import SEO from './SEO.jsx'
import AdPlaceholder from './AdPlaceholder.jsx'

/**
 * Standard layout every tool page shares:
 * Breadcrumb -> Title -> Description -> Tool card (children) ->
 * How to use -> FAQ -> Related tools -> optional privacy note.
 */
export default function ToolPageShell({
  slug,
  title,
  seoTitle,
  description,
  howToUseSteps,
  faqItems,
  showPrivacyNote = false,
  children
}) {
  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
      <SEO title={seoTitle || title} description={description} path={`/${slug}`} />
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Tools', to: '/tools' },
          { label: title }
        ]}
      />

      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-2xl text-gray-500 dark:text-gray-400">{description}</p>

      {showPrivacyNote && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-50 px-4 py-2 text-sm text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
          </svg>
          Your files are processed locally in your browser and are not uploaded.
        </p>
      )}

      <div className="card mt-6 p-6">{children}</div>

      <AdPlaceholder slot={`tool-${slug}-inline`} className="mt-6" />

      {howToUseSteps?.length > 0 && <HowToUse steps={howToUseSteps} />}
      {faqItems?.length > 0 && <FAQ items={faqItems} />}
      <RelatedTools slug={slug} />
    </div>
  )
}
