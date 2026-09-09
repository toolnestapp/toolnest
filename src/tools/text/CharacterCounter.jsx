import { useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'
import { getTextStats } from '../../utils/textUtils.js'

export default function CharacterCounter() {
  const [text, setText] = useState('')
  const stats = getTextStats(text)

  const statCards = [
    ['Characters', stats.characters],
    ['Characters (no spaces)', stats.charactersNoSpaces],
    ['Words', stats.words],
    ['Lines', stats.lines]
  ]

  return (
    <ToolPageShell
      slug="character-counter"
      title="Character Counter"
      seoTitle="Free Character Counter Online"
      description="Count characters, words and lines instantly with a simple live text counter."
      showPrivacyNote={false}
      howToUseSteps={[
        {
          title: 'Paste or type your text',
          description: 'Enter or paste your content into the text box.'
        },
        {
          title: 'View live counts',
          description: 'Character, word and line counts update instantly as you type.'
        },
        {
          title: 'Clear when finished',
          description: 'Use the clear button to start with a fresh text box.'
        }
      ]}
      faqItems={[
        {
          question: 'Does the character count include spaces?',
          answer: 'Yes. The main character count includes spaces. A separate count without spaces is also displayed.'
        },
        {
          question: 'Can I use this for social media limits?',
          answer: 'Yes. It can be useful for checking character limits for social media posts, bios, messages and other short-form content.'
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
            id="char-counter-text"
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
        className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
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