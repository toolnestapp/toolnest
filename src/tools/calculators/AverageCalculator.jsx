import { useMemo, useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'
import { formatNumber } from '../../utils/numberUtils.js'

function parseNumbers(input) {
  return input
    .split(/[,\s\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map(Number)
    .filter((n) => !Number.isNaN(n))
}

export default function AverageCalculator() {
  const [input, setInput] = useState('')
  const numbers = useMemo(() => parseNumbers(input), [input])

  const stats = useMemo(() => {
    if (numbers.length === 0) return null
    const sum = numbers.reduce((a, b) => a + b, 0)
    return {
      count: numbers.length,
      sum,
      average: sum / numbers.length,
      min: Math.min(...numbers),
      max: Math.max(...numbers)
    }
  }, [numbers])

  return (
    <ToolPageShell
      slug="average-calculator"
      title="Average Calculator"
      seoTitle="Free Average Calculator Online"
      description="Enter a list of numbers to instantly get the average, sum, count, minimum and maximum."
      showPrivacyNote={false}
      howToUseSteps={[
        { title: 'Enter your numbers', description: 'Separate numbers with commas, spaces or new lines.' },
        { title: 'View the results', description: 'The average, sum, count, minimum and maximum update instantly.' },
        { title: 'Clear and reuse', description: 'Clear the box to calculate a new set of numbers.' }
      ]}
      faqItems={[
        { question: 'How should I separate the numbers?', answer: 'Use commas, spaces or line breaks — any combination works.' },
        { question: 'What happens if I enter invalid text?', answer: 'Non-numeric entries are ignored automatically; only valid numbers are used in the calculation.' }
      ]}
    >
      <label htmlFor="numbers-input" className="mb-1 block text-sm font-medium">
        Numbers
      </label>
      <textarea
        id="numbers-input"
        className="input-field min-h-[140px]"
        placeholder="e.g. 10, 20, 30, 40"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="button" onClick={() => setInput('')} className="btn-secondary mt-4">
        Clear
      </button>

      <div className="mt-6 grid gap-4 sm:grid-cols-3" aria-live="polite">
        {[
          ['Average', stats ? formatNumber(stats.average) : '—'],
          ['Sum', stats ? formatNumber(stats.sum) : '—'],
          ['Count', stats ? stats.count : '—'],
          ['Minimum', stats ? formatNumber(stats.min) : '—'],
          ['Maximum', stats ? formatNumber(stats.max) : '—']
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-gray-50 dark:bg-gray-900 p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="mt-1 text-xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </ToolPageShell>
  )
}
