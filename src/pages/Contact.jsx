import SEO from '../components/SEO.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

const CONTACT_EMAIL = 'thumbscoreai@gmail.com'

export default function Contact() {
  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
      <SEO
        title="Contact"
        description="Get in touch with the ToolNest team."
        path="/contact"
      />

      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Contact' }
        ]}
      />

      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Contact
        </h1>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Have a question, suggestion, or found something that needs fixing?
          We'd love to hear from you.
        </p>

        <div className="card mt-8 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Get in touch
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Send us an email and we'll get back to you as soon as possible.
          </p>

          <div className="mt-6 rounded-xl bg-brand-50 p-5 dark:bg-brand-900/20">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Email
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-1 block text-lg font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="btn-primary mt-6"
          >
            Send Email
          </a>
        </div>
      </div>
    </div>
  )
}