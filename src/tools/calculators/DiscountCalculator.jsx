import { useState } from 'react'
import ToolPageShell from '../../components/ToolPageShell.jsx'
import { isValidNumber, formatNumber } from '../../utils/numberUtils.js'

export default function DiscountCalculator() {
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')

  const valid = isValidNumber(price) && isValidNumber(discount)
  const priceNum = Number(price)
  const discountNum = Number(discount)
  const discountAmount = valid ? (priceNum * discountNum) / 100 : null
  const finalPrice = valid ? priceNum - discountAmount : null

  function reset() {
    setPrice('')
    setDiscount('')
  }

  return (
    <ToolPageShell
      slug="discount-calculator"
      title="Discount Calculator"
      seoTitle="Free Discount Calculator Online"
      description="Enter the original price and discount percentage to see the final price and how much you save."
      showPrivacyNote={false}
      howToUseSteps={[
        { title: 'Enter the original price', description: 'Type the price before the discount is applied.' },
        { title: 'Enter the discount percentage', description: 'Type the percentage off, for example 20 for 20%.' },
        { title: 'View your savings', description: 'The final price and amount saved update instantly.' }
      ]}
      faqItems={[
        { question: 'How is the final price calculated?', answer: 'Final price = original price − (original price × discount% / 100).' },
        { question: 'Can I use this for multiple discounts?', answer: 'For a single discount, yes. For stacked discounts, apply this calculator twice using the previous result as the new original price.' }
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="original-price" className="mb-1 block text-sm font-medium">
            Original price
          </label>
          <input
            id="original-price"
            type="number"
            inputMode="decimal"
            className="input-field"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
          />
        </div>
        <div>
          <label htmlFor="discount-percent" className="mb-1 block text-sm font-medium">
            Discount (%)
          </label>
          <input
            id="discount-percent"
            type="number"
            inputMode="decimal"
            className="input-field"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <button type="button" onClick={reset} className="btn-secondary mt-6">
        Clear
      </button>

      <div className="mt-6 grid gap-4 sm:grid-cols-3" aria-live="polite">
        <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">You save</p>
          <p className="mt-1 text-xl font-semibold">{valid ? formatNumber(discountAmount) : '—'}</p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Final price</p>
          <p className="mt-1 text-xl font-semibold text-brand-600">{valid ? formatNumber(finalPrice) : '—'}</p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Discount amount</p>
          <p className="mt-1 text-xl font-semibold">{valid ? formatNumber(discountAmount) : '—'}</p>
        </div>
      </div>
    </ToolPageShell>
  )
}
