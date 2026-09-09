import { useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'

function calculateAge(dobStr) {
  const dob = new Date(dobStr)
  if (Number.isNaN(dob.getTime())) return null

  const today = new Date()
  if (dob > today) return { error: 'Date of birth cannot be in the future.' }

  let years = today.getFullYear() - dob.getFullYear()
  let months = today.getMonth() - dob.getMonth()
  let days = today.getDate() - dob.getDate()

  if (days < 0) {
    months -= 1
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const totalDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24))

  let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate())
  if (nextBirthday < today) {
    nextBirthday = new Date(today.getFullYear() + 1, dob.getMonth(), dob.getDate())
  }
  const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24))

  return { years, months, days, totalDays, daysToNextBirthday }
}

export default function AgeCalculator() {
  const [dob, setDob] = useState('')
  const result = dob ? calculateAge(dob) : null

  return (
    <ToolPageShell
      slug="age-calculator"
      title="Age Calculator"
      seoTitle="Free Age Calculator Online"
      description="Find your exact age in years, months and days, plus a countdown to your next birthday."
      showPrivacyNote={false}
      howToUseSteps={[
        { title: 'Enter your date of birth', description: 'Pick the date using the date field.' },
        { title: 'View your exact age', description: 'See your age broken down into years, months and days.' },
        { title: 'Check your next birthday', description: 'See exactly how many days remain until your next birthday.' }
      ]}
      faqItems={[
        { question: 'How is age calculated here?', answer: 'It compares your date of birth to today\u2019s date and breaks the difference into full years, months and days.' },
        { question: 'Is my date of birth stored anywhere?', answer: 'No. The calculation happens instantly in your browser and nothing is saved or sent anywhere.' }
      ]}
    >
      <div className="max-w-sm">
        <label htmlFor="dob" className="mb-1 block text-sm font-medium">
          Date of birth
        </label>
        <input
          id="dob"
          type="date"
          className="input-field"
          value={dob}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>

      <div className="mt-6">
        {!dob && <p className="text-gray-500 dark:text-gray-400">Enter a date of birth to see your age.</p>}
        {result?.error && (
          <p role="alert" className="text-red-600 dark:text-red-400">
            {result.error}
          </p>
        )}
        {result && !result.error && (
          <div className="grid gap-4 sm:grid-cols-2" aria-live="polite">
            <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-5">
              <p className="text-sm text-gray-500 dark:text-gray-400">Your age</p>
              <p className="mt-1 text-2xl font-semibold">
                {result.years}y {result.months}m {result.days}d
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{result.totalDays.toLocaleString()} total days</p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-5">
              <p className="text-sm text-gray-500 dark:text-gray-400">Next birthday</p>
              <p className="mt-1 text-2xl font-semibold text-brand-600">{result.daysToNextBirthday} days away</p>
            </div>
          </div>
        )}
      </div>
    </ToolPageShell>
  )
}
