export default function HowToUse({ steps }) {
  return (
    <section className="card p-6 mt-8" aria-labelledby="how-to-use-heading">
      <h2 id="how-to-use-heading" className="text-xl font-semibold mb-4">How to use</h2>
      <ol className="grid gap-4 sm:grid-cols-2">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white font-semibold">
              {i + 1}
            </span>
            <div>
              <p className="font-medium">{step.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
