import { useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'
import { isValidNumber, gcd, formatNumber } from '../../utils/numberUtils.js'

export default function RatioCalculator() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [c, setC] = useState('')
  const [d, setD] = useState('')

  const aValid = isValidNumber(a)
  const bValid = isValidNumber(b)
  const cValid = isValidNumber(c)
  const dValid = isValidNumber(d)

  let simplified = null
  if (aValid && bValid) {
    const aNum = Number(a)
    const bNum = Number(b)
    if (aNum !== 0 || bNum !== 0) {
      const divisor = gcd(Math.round(aNum), Math.round(bNum))
      simplified = `${formatNumber(aNum / divisor, 4)} : ${formatNumber(bNum / divisor, 4)}`
    }
  }

  let missingValue = null
  let missingLabel = ''
  if (aValid && bValid && cValid && !dValid && Number(a) !== 0) {
    missingValue = (Number(b) * Number(c)) / Number(a)
    missingLabel = 'D'
  } else if (aValid && bValid && dValid && !cValid && Number(b) !== 0) {
    missingValue = (Number(a) * Number(d)) / Number(b)
    missingLabel = 'C'
  }

  function reset() {
    setA('')
    setB('')
    setC('')
    setD('')
  }

  return (
    <ToolPageShell
      slug="ratio-calculator"
      title="Ratio Calculator"
      seoTitle="Free Ratio Calculator Online"
      description="Simplify a ratio A:B, or fill in A:B = C:D to find the missing value."
      showPrivacyNote={false}
      howToUseSteps={[
        { title: 'Enter A and B', description: 'Enter the first ratio to see it simplified automatically.' },
        { title: 'Optionally add C or D', description: 'Fill in three of the four values in A:B = C:D to solve for the missing one.' },
        { title: 'Read the result', description: 'The simplified ratio and any missing value appear instantly.' }
      ]}
      faqItems={[
        { question: 'How is a ratio simplified?', answer: 'The calculator divides both numbers by their greatest common divisor.' },
        { question: 'How does solving for a missing value work?', answer: 'It uses cross-multiplication: if A:B = C:D, then A×D = B×C.' }
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">Ratio A : B</p>
          <div className="flex items-center gap-2">
            <input type="number" inputMode="decimal" className="input-field" aria-label="A" placeholder="A" value={a} onChange={(e) => setA(e.target.value)} />
            <span aria-hidden="true">:</span>
            <input type="number" inputMode="decimal" className="input-field" aria-label="B" placeholder="B" value={b} onChange={(e) => setB(e.target.value)} />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Optional: solve A:B = C:D</p>
          <div className="flex items-center gap-2">
            <input type="number" inputMode="decimal" className="input-field" aria-label="C" placeholder="C" value={c} onChange={(e) => setC(e.target.value)} />
            <span aria-hidden="true">:</span>
            <input type="number" inputMode="decimal" className="input-field" aria-label="D" placeholder="D" value={d} onChange={(e) => setD(e.target.value)} />
          </div>
        </div>
      </div>

      <button type="button" onClick={reset} className="btn-secondary mt-4">
        Clear
      </button>

      <div className="mt-6 grid gap-4 sm:grid-cols-2" aria-live="polite">
        <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Simplified ratio</p>
          <p className="mt-1 text-xl font-semibold text-brand-600">{simplified || '—'}</p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Missing value ({missingLabel || '—'})</p>
          <p className="mt-1 text-xl font-semibold">{missingValue !== null ? formatNumber(missingValue, 4) : '—'}</p>
        </div>
      </div>
    </ToolPageShell>
  )
}
