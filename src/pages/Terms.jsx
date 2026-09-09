import SEO from '../components/SEO.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

export default function Terms() {
  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
      <SEO
        title="Terms of Use"
        description="Terms of use for ToolNest free online tools."
        path="/terms"
      />

      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Terms of Use' }
        ]}
      />

      <h1 className="text-3xl font-bold tracking-tight">
        Terms of Use
      </h1>

      <div className="card mt-6 space-y-4 p-6 text-gray-700 dark:text-gray-300">
        <p>
          ToolNest provides free online tools for general personal and
          informational use. By using this website, you agree to use the
          tools responsibly and in accordance with applicable laws.
        </p>

        <p>
          ToolNest tools are provided on an "as is" and "as available"
          basis. While we aim to make our tools accurate and reliable,
          we cannot guarantee that every result will always be complete,
          accurate, or suitable for a particular purpose.
        </p>

        <p>
          You are responsible for checking important results before
          relying on them. ToolNest should not be considered a substitute
          for professional advice where professional advice is required.
        </p>

        <p>
          Most ToolNest tools process your files or information directly
          in your browser. You are responsible for ensuring that you
          have the right to use any files or content you process through
          the website.
        </p>

        <p>
          We may improve, modify, add, or remove tools and website
          features at any time without prior notice.
        </p>

        <p>
          By continuing to use ToolNest, you acknowledge these terms.
        </p>
      </div>
    </div>
  )
}