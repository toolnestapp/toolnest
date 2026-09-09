import { useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'
import { getTextStats } from '../../utils/textUtils.js'

export default function WordCounter() {
  const [text, setText] = useState('')
  const stats = getTextStats(text)

  const statCards = [
    ['Words', stats.words],
    ['Characters', stats.characters],
    ['Characters (no spaces)', stats.charactersNoSpaces],
    ['Sentences', stats.sentences],
    ['Paragraphs', stats.paragraphs],
    ['Reading time', `${stats.readingTimeMinutes} min`]
  ]

  return (
    <ToolPageShell
      slug="word-counter"
      title="Word Counter"
      seoTitle="Free Word Counter Online"
      description="Count words, characters, sentences and paragraphs instantly with live reading time estimates."
      showPrivacyNote={false}
      howToUseSteps={[
        {
          title: 'Paste or type your text',
          description: 'Enter or paste your content into the text box.'
        },
        {
          title: 'Check your statistics',
          description: 'Your word, character, sentence and paragraph counts update instantly.'
        },
        {
          title: 'Clear when finished',
          description: 'Use the clear button whenever you want to start over.'
        }
      ]}
      faqItems={[
        {
          question: 'How is reading time calculated?',
          answer: 'The estimate uses an average reading speed of about 200 words per minute.'
        },
        {
          question: 'Is my text saved anywhere?',
          answer: 'No. Everything is calculated locally in your browser and your text is not uploaded or stored.'
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
                Start typing or paste your content below
              </p>
            </div>

            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
              Live count
            </span>
          </div>
        </div>

        <div className="p-5">
          <textarea
            id="word-counter-text"
            className="input-field min-h-[260px] resize-y"
            placeholder="Start typing or paste your text here…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Your text"
          />

          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {stats.characters} characters
            </p>

            <button
              type="button"
              onClick={() => setText('')}
              className="btn-secondary"
              disabled={!text}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div
        className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3"
        aria-live="polite"
      >
        {statCards.map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              {label}
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
        ))}
      </div>
    </ToolPageShell>
  )
}