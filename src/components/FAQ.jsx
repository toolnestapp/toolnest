export default function FAQ({ items }) {
  return (
    <section className="card p-6 mt-8" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-xl font-semibold mb-4">Frequently asked questions</h2>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {items.map((item, i) => (
          <details key={i} className="group py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
              {item.question}
              <span className="ml-2 shrink-0 text-gray-400 group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
            </summary>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
