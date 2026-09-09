import { useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'
import {
  toTitleCase,
  toSentenceCase,
  toggleCase
} from '../../utils/textUtils.js'

export default function CaseConverter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  function applyCase(fn) {
    setText((t) => fn(t))
    setCopied(false)
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
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

  const caseOptions = [
    {
      label: 'UPPERCASE',
      description: 'MAKE EVERYTHING CAPITAL',
      action: () => applyCase((t) => t.toUpperCase())
    },
    {
      label: 'lowercase',
      description: 'make everything small',
      action: () => applyCase((t) => t.toLowerCase())
    },
    {
      label: 'Title Case',
      description: 'Capitalize Important Words',
      action: () => applyCase(toTitleCase)
    },
    {
      label: 'Sentence case',
      description: 'Capitalize sentences normally',
      action: () => applyCase(toSentenceCase)
    },
    {
      label: 'tOGGLE cASE',
      description: 'Flip every letter',
      action: () => applyCase(toggleCase)
    }
  ]

  return (
    <ToolPageShell
      slug="case-converter"
      title="Case Converter"
      seoTitle="Free Case Converter Online"
      description="Convert text between uppercase, lowercase, title case, sentence case and toggle case instantly."
      showPrivacyNote={false}
      howToUseSteps={[
        {
          title: 'Paste or type your text',
          description: 'Enter the text you want to convert into the editor.'
        },
        {
          title: 'Choose a case style',
          description: 'Select the case format you want to apply to your text.'
        },
        {
          title: 'Copy the result',
          description: 'Use the Copy button to quickly copy your converted text.'
        }
      ]}
      faqItems={[
        {
          question: 'What does Toggle Case do?',
          answer: 'It flips the case of every letter. Uppercase letters become lowercase and lowercase letters become uppercase.'
        },
        {
          question: 'Does Title Case capitalize every word?',
          answer: 'It capitalizes most important words while keeping common small words such as "and", "of" and "the" lowercase unless they begin the text.'
        }
      ]}
    >
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Your text
              </h2>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter text and choose a conversion style
              </p>
            </div>

            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
              Instant
            </span>
          </div>
        </div>

        <div className="p-5">
          <textarea
            id="case-converter-text"
            className="input-field min-h-[260px] resize-y"
            placeholder="Start typing or paste your text here…"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setCopied(false)
            }}
            aria-label="Your text"
          />

          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {text.length} characters
            </p>

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

      <div className="mt-6">
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Convert text
          </h2>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Choose how you want your text formatted.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {caseOptions.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={option.action}
              disabled={!text}
              className="group rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-brand-700"
            >
              <span className="block text-sm font-semibold text-gray-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                {option.label}
              </span>

              <span className="mt-1 block text-xs text-gray-400 dark:text-gray-500">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn-primary"
          onClick={handleCopy}
          disabled={!text}
        >
          {copied ? 'Copied!' : 'Copy result'}
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
    </ToolPageShell>
  )
}