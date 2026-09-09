import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CATEGORIES,
  getPopularTools,
  getToolsByCategory
} from '../data/tools.js'
import ToolCard from '../components/ToolCard.jsx'
import CategoryIcon from '../components/CategoryIcon.jsx'
import SEO from '../components/SEO.jsx'

const WHY_POINTS = [
  {
    title: 'Free to use',
    description:
      'Useful tools without unnecessary fees or complicated setup.'
  },
  {
    title: 'Simple interface',
    description:
      'Clean and straightforward tools that are easy to understand.'
  },
  {
    title: 'Fast processing',
    description:
      'Get results quickly without unnecessary waiting.'
  },
  {
    title: 'Privacy focused',
    description:
      'Many file tools process your files directly in your browser.'
  },
  {
    title: 'No signup required',
    description:
      'Start using ToolNest without creating an account.'
  }
]

const FAQ_ITEMS = [
  {
    question: 'What is ToolNest?',
    answer:
      'ToolNest is a collection of free online tools for everyday digital tasks, including calculators, image tools, PDF tools and text tools.'
  },
  {
    question: 'Are ToolNest tools free?',
    answer:
      'Yes. The current tools on ToolNest are free to use.'
  },
  {
    question: 'Can I use ToolNest on my phone?',
    answer:
      'Yes. ToolNest is designed to work on mobile phones, tablets and desktop computers.'
  },
  {
    question: 'Do I need to install anything?',
    answer:
      'No. ToolNest works directly in your web browser.'
  }
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="bg-gray-50/70 dark:bg-gray-900/40">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
            FAQ
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Frequently asked questions
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Everything you need to know about using ToolNest.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 dark:border-gray-800 dark:bg-gray-950"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {item.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-transform duration-200 dark:bg-gray-800 dark:text-gray-400 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 px-5 pb-5 pt-4 dark:border-gray-800">
                    <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const popularTools = getPopularTools(20)

  const [searchQuery, setSearchQuery] = useState('')

  const allTools = Array.from(
    new Map(
      CATEGORIES.flatMap((category) =>
        getToolsByCategory(category.slug)
      ).map((tool) => [tool.slug, tool])
    ).values()
  )

  const searchResults = searchQuery.trim()
    ? allTools
        .filter((tool) => {
          const query = searchQuery.trim().toLowerCase()

          const name = tool.name?.toLowerCase() || ''
          const description =
            tool.shortDescription?.toLowerCase() || ''
          const keywords = tool.keywords || []

          return (
            name.includes(query) ||
            description.includes(query) ||
            keywords.some((keyword) =>
              keyword.toLowerCase().includes(query)
            )
          )
        })
        .sort((a, b) => {
          const query = searchQuery.trim().toLowerCase()

          const aName = a.name.toLowerCase()
          const bName = b.name.toLowerCase()

          const aStarts = aName.startsWith(query)
          const bStarts = bName.startsWith(query)

          if (aStarts && !bStarts) return -1
          if (!aStarts && bStarts) return 1

          return aName.localeCompare(bName)
        })
    : []

  return (
    <div>
      <SEO
  title="Free Online Tools"
  description="ToolNest offers free online tools for image conversion, image compression, PDF tools, text tools and calculators."
  path="/"
/>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white dark:border-gray-900 dark:bg-gray-950">
  {/* Background glow */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute left-1/2 top-[-135px] h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-brand-100/70 blur-3xl dark:bg-brand-900/25" />

    <div className="absolute left-[8%] top-1/2 h-32 w-32 rounded-full bg-gray-100/60 blur-3xl dark:bg-gray-900/40" />

    <div className="absolute right-[8%] top-1/3 h-40 w-40 rounded-full bg-brand-50/50 blur-3xl dark:bg-brand-950/30" />
  </div>

  <div className="relative mx-auto max-w-content px-4 py-20 text-center sm:px-6 sm:py-24 lg:py-28">

    {/* Badge */}
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-600 shadow-sm dark:border-brand-900/50 dark:bg-brand-900/30 dark:text-brand-300">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      Simple tools. Fast results.
    </div>

    {/* Heading */}
    <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
      Free tools for{' '}
      <span className="text-brand-600 dark:text-brand-400">
        everyday tasks.
      </span>
    </h1>

    {/* Description */}
    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400 sm:text-lg sm:leading-8">
      Calculate, convert, compress, resize and work with
      your files — quickly, privately and easily.
    </p>

    {/* SEARCH */}
    <div className="relative mx-auto mt-9 max-w-2xl">

      <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-200/40 transition-all duration-200 focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-100/70 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none dark:focus-within:border-brand-700 dark:focus-within:ring-brand-900/30">

        {/* Search icon */}
        <svg
          className="ml-3 h-5 w-5 shrink-0 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a tool..."
          className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
        />

        <Link
          to="/tools"
          className="shrink-0 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-700 hover:shadow-md"
        >
          Browse
        </Link>
      </div>

      {/* Popular searches */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="mr-1 text-gray-400 dark:text-gray-500">
          Popular:
        </span>

        {[
          'Image Converter',
          'JPG to PDF',
          'Compress Image',
          'Percentage Calculator'
        ].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSearchQuery(item)}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 font-medium text-gray-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-brand-700 dark:hover:bg-brand-900/30 dark:hover:text-brand-400"
          >
            {item}
          </button>
        ))}
      </div>

      {/* SEARCH RESULTS */}
      {searchQuery.trim() && (
        <div className="mt-3 text-left">

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">

            {searchResults.length > 0 ? (
              <>
                {searchResults.slice(0, 6).map((tool) => (
                  <Link
                    key={tool.slug}
                    to={`/${tool.slug}`}
                    className="flex items-center gap-4 border-b border-gray-100 px-4 py-4 transition last:border-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                      <CategoryIcon
                        category={tool.category}
                        className="h-5 w-5"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {tool.name}
                      </h3>

                      <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
                        {tool.shortDescription}
                      </p>
                    </div>

                    <span className="text-gray-400 transition-transform group-hover:translate-x-1">
                      →
                    </span>

                  </Link>
                ))}

                {searchResults.length > 6 && (
                  <Link
                    to="/tools"
                    className="block border-t border-gray-100 px-4 py-3 text-center text-sm font-semibold text-brand-600 transition hover:bg-gray-50 dark:border-gray-800 dark:text-brand-400 dark:hover:bg-gray-900"
                  >
                    View all matching tools →
                  </Link>
                )}
              </>
            ) : (
              <div className="px-5 py-7 text-center">

                <div className="text-2xl">
                  🔎
                </div>

                <p className="mt-2 font-semibold text-gray-900 dark:text-white">
                  No tools found
                </p>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try "image", "PDF", "calculator" or "text".
                </p>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  </div>
</section>
      {/* POPULAR TOOLS */}
<section className="border-y border-gray-100 bg-white dark:border-gray-900 dark:bg-gray-950">
  <div className="mx-auto max-w-content px-4 py-16 sm:px-6">

    {/* SECTION HEADER */}
    <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

      <div>
        <div className="mb-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
          Popular
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Popular tools
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Start with our most useful tools for everyday tasks.
        </p>
      </div>

      <Link
        to="/tools"
        className="w-fit shrink-0 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-brand-700 dark:hover:text-brand-400"
      >
        View all tools →
      </Link>

    </div>

    {/* TOOL GRID */}
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {popularTools.map((tool) => (
        <div
          key={tool.slug}
          className="transition-transform duration-200"
        >
          <ToolCard tool={tool} />
        </div>
      ))}
    </div>

  </div>
</section>

      {/* CATEGORIES */}

<section className="border-y border-gray-100 bg-gray-50/70 dark:border-gray-900 dark:bg-gray-900/40">
  <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
    <div className="mb-8">
      <div className="mb-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
        Explore tools
      </div>

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Browse by category
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            Find the right tool for your everyday digital tasks.
          </p>
        </div>

        <Link
          to="/tools"
          className="w-fit text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400"
        >
          View all tools →
        </Link>
      </div>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      {CATEGORIES.map((category) => {
        const count = getToolsByCategory(category.slug).length

        return (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            className="group flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-brand-700"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-300 dark:group-hover:bg-brand-900/50">
              <CategoryIcon
                category={category.slug}
                className="h-7 w-7"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                  {category.name}
                </h3>

                <span className="text-lg text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-500 dark:text-gray-700 dark:group-hover:text-brand-400">
                  →
                </span>
              </div>

              <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {category.description}
              </p>

              <p className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
                {count} {count === 1 ? 'tool' : 'tools'}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  </div>
</section>

      {/* WHY TOOLNEST */}
      <section className="bg-white dark:bg-gray-950">
  <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
        Why ToolNest?
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
        Simple tools. No unnecessary complexity.
      </h2>

      <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
        Everything you need for everyday tasks, designed to be fast,
        simple and easy to use.
      </p>
    </div>

    <div className="mt-10 grid gap-5 md:grid-cols-3">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>

        <h3 className="mt-5 font-semibold text-gray-900 dark:text-white">
          Fast & Easy
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Get your task done in seconds with simple tools that are easy
          to understand.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 3l7 4v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V7l7-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>

        <h3 className="mt-5 font-semibold text-gray-900 dark:text-white">
          Private & Secure
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Your files stay in your browser whenever possible, without
          unnecessary uploads.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="M8 21h8M12 18v3" />
          </svg>
        </div>

        <h3 className="mt-5 font-semibold text-gray-900 dark:text-white">
          Works in Your Browser
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          No software installation required. Open a tool, complete
          your task and move on.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* FAQ */}
      <section className="bg-gray-50 dark:bg-gray-900/40">

        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <FAQ />
        </div>

      </section>

    </div>
  )
}