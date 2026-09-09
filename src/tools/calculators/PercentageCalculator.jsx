import { useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'
import { isValidNumber, formatNumber } from '../../utils/numberUtils.js'

const MODES = [
  { id: 'xPercentOfY', label: 'What is X% of Y?' },
  { id: 'xIsWhatPercentOfY', label: 'X is what percentage of Y?' },
  { id: 'increaseDecrease', label: 'Percentage increase/decrease' }
]

export default function PercentageCalculator() {
  const [mode, setMode] = useState('xPercentOfY')
  const [x, setX] = useState('')
  const [y, setY] = useState('')

  function reset() {
    setX('')
    setY('')
  }

  let result = null
  let resultLabel = ''

  if (isValidNumber(x) && isValidNumber(y)) {
    const xNum = Number(x)
    const yNum = Number(y)

    if (mode === 'xPercentOfY') {
      result = (xNum / 100) * yNum
      resultLabel = `${x}% of ${y} is`
    } else if (mode === 'xIsWhatPercentOfY') {
      if (yNum !== 0) {
        result = (xNum / yNum) * 100
        resultLabel = `${x} is this percentage of ${y}`
      }
    } else if (mode === 'increaseDecrease') {
      if (xNum !== 0) {
        result = ((yNum - xNum) / Math.abs(xNum)) * 100
        resultLabel = result >= 0 ? 'Percentage increase' : 'Percentage decrease'
      }
    }
  }

  return (
    <ToolPageShell
      slug="percentage-calculator"
      title="Percentage Calculator"
      seoTitle="Free Percentage Calculator Online"
      description="Calculate percentages, find what percent one number is of another, or work out a percentage increase or decrease — instantly."
      showPrivacyNote={false}
      howToUseSteps={[
        { title: 'Choose a calculation', description: 'Pick the type of percentage question you want answered.' },
        { title: 'Enter your numbers', description: 'Fill in the two values needed for that calculation.' },
        { title: 'Read the result', description: 'The answer updates instantly as you type.' },
        { title: 'Clear and repeat', description: 'Use the clear button to start a new calculation.' }
      ]}
      faqItems={[
        { question: 'How do I calculate a percentage of a number?', answer: 'Use "What is X% of Y?" — enter the percentage as X and the number as Y.' },
        { question: 'How do I find what percent one number is of another?', answer: 'Use "X is what percentage of Y?" and enter both numbers.' },
        { question: 'Does this calculator save my numbers?', answer: 'No. All calculations happen instantly in your browser and nothing is stored.' }
      ]}
    >
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Calculation type">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => {
              setMode(m.id)
              reset()
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === m.id
                ? 'bg-brand-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="x-value" className="mb-1 block text-sm font-medium">
            {mode === 'increaseDecrease' ? 'Original value' : mode === 'xIsWhatPercentOfY' ? 'Value' : 'Percentage (%)'}
          </label>
          <input
            id="x-value"
            type="number"
            inputMode="decimal"
            className="input-field"
            value={x}
            onChange={(e) => setX(e.target.value)}
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="y-value" className="mb-1 block text-sm font-medium">
            {mode === 'increaseDecrease' ? 'New value' : 'Total value'}
          </label>
          <input
            id="y-value"
            type="number"
            inputMode="decimal"
            className="input-field"
            value={y}
            onChange={(e) => setY(e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="button" onClick={reset} className="btn-secondary">
          Clear
        </button>
      </div>

      <div className="mt-6 rounded-xl bg-gray-50 dark:bg-gray-900 p-5" aria-live="polite">
        {result === null ? (
          <p className="text-gray-500 dark:text-gray-400">Enter values above to see the result.</p>
        ) : (
          <p className="text-2xl font-semibold">
            {resultLabel}: <span className="text-brand-600">{formatNumber(result)}{mode !== 'xPercentOfY' ? '%' : ''}</span>
          </p>
        )}
      </div>
    </ToolPageShell>
  )
}
