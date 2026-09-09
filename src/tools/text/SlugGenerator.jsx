import { useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function SlugGenerator() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const slug = generateSlug(text)

  async function handleCopy() {
    if (!slug) return

    try {
      await navigator.clipboard.writeText(slug)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  function handleClear() {
    setText('')
    setCopied(false)
  }

  return (
    <ToolPageShell
      slug="slug-generator"
      title="Slug Generator"
      seoTitle="Free Slug Generator Online"
      description="Create clean, SEO-friendly URL slugs from any text instantly."
      showPrivacyNote={false}
      howToUseSteps={[
        {
          title: 'Enter your text',
          description: 'Type or paste a title, heading or phrase into the text box.'
        },
        {
          title: 'Generate your slug',
          description: 'Your clean URL slug is generated automatically as you type.'
        },
        {
          title: 'Copy the slug',
          description: 'Copy the generated slug and use it in your website or URL.'
        }
      ]}
      faqItems={[
        {
          question: 'What is a URL slug?',
          answer: 'A URL slug is the readable part of a web address that usually identifies a page. For example, "My Awesome Article" becomes "my-awesome-article".'
        },
        {
          question: 'Is this slug generator SEO-friendly?',
          answer: 'Yes. It converts text to lowercase, removes unnecessary characters and separates words with hyphens.'
        }
      ]}
    >
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Generate your slug
              </h2>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter text and get a clean URL-friendly version
              </p>
            </div>

            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
              Live generator
            </span>
          </div>
        </div>

        <div className="p-5">
          <label
            htmlFor="slug-generator-text"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Your text
          </label>

          <textarea
            id="slug-generator-text"
            className="input-field min-h-[180px] resize-y"
            placeholder="Example: My Awesome Blog Post Title!"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setCopied(false)
            }}
          />

          <div className="mt-5">
            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Generated slug
            </p>

            <div className="min-h-[56px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
              <p className="break-all font-mono text-sm text-gray-800 dark:text-gray-200">
                {slug || 'Your slug will appear here…'}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-primary"
              onClick={handleCopy}
              disabled={!slug}
            >
              {copied ? 'Copied!' : 'Copy slug'}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={handleClear}
              disabled={!text}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </ToolPageShell>
  )
}