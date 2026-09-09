// Central registry of every tool in ToolNest.
// Adding a new tool = add an entry here + create the page component + add a route in App.jsx.

export const CATEGORIES = [
  { slug: 'calculators', name: 'Calculators', description: 'Quick everyday math, no spreadsheets needed.' },
  { slug: 'image-tools', name: 'Image Tools', description: 'Compress, resize and convert images in your browser.' },
  { slug: 'pdf-tools', name: 'PDF Tools', description: 'Merge, create and optimize PDF files.' },
  { slug: 'text-tools', name: 'Text Tools', description: 'Count, clean and reformat text instantly.' }
]

export const TOOLS = [
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortDescription: 'Find percentages, increases and decreases instantly.',
    category: 'calculators',
    keywords: ['percentage', 'percent', 'calculate percentage', '%', 'percent of'],
    popular: true
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    shortDescription: 'Calculate your exact age in years, months and days.',
    category: 'calculators',
    keywords: ['age', 'birthday', 'date of birth', 'how old am i'],
    popular: true
  },
  {
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    shortDescription: 'See the final price and how much you save on a sale.',
    category: 'calculators',
    keywords: ['discount', 'sale price', 'off', 'coupon'],
    popular: true
  },
  {
    slug: 'average-calculator',
    name: 'Average Calculator',
    shortDescription: 'Get the average, sum, min and max of a list of numbers.',
    category: 'calculators',
    keywords: ['average', 'mean', 'sum', 'numbers'],
    popular: true
  },
  {
    slug: 'ratio-calculator',
    name: 'Ratio Calculator',
    shortDescription: 'Simplify ratios or find a missing value in A:B.',
    category: 'calculators',
    keywords: ['ratio', 'proportion', 'a:b', 'simplify ratio'],
    popular: true
  },
  {
    slug: 'compress-image',
    name: 'Compress Image',
    shortDescription: 'Reduce image file size with an adjustable quality slider.',
    category: 'image-tools',
    keywords: ['compress image', 'make image smaller', 'reduce image size', 'shrink photo'],
    popular: true
  },
  {
    slug: 'compress-image-to-100kb',
    name: 'Compress Image to 100KB',
    shortDescription: 'Automatically shrink an image to around 100KB.',
    category: 'image-tools',
    keywords: ['compress to 100kb', '100kb image', 'reduce to 100kb'],
    popular: true
  },
  {
    slug: 'resize-image',
    name: 'Resize Image',
    shortDescription: 'Change image dimensions with optional locked aspect ratio.',
    category: 'image-tools',
    keywords: ['resize image', 'change image size', 'scale image'],
    popular: true
  },
    {
    slug: 'image-converter',
    name: 'Image Converter',
    shortDescription: 'Convert images between JPG, PNG and WebP formats.',
    category: 'image-tools',
    keywords: [
      'image converter',
      'jpg to png',
      'png to jpg',
      'jpg to webp',
      'webp to jpg',
      'png to webp',
      'webp to png',
      'convert image'
    ],
    popular: true
  },
  {
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    shortDescription: 'Turn one or more images into a single PDF file.',
    category: 'pdf-tools',
    keywords: ['jpg to pdf', 'image to pdf', 'photo to pdf'],
    popular: true
  },
  {
    slug: 'merge-pdf',
    name: 'Merge PDF',
    shortDescription: 'Combine multiple PDF files into one document.',
    category: 'pdf-tools',
    keywords: ['merge pdf', 'combine pdf', 'join pdf'],
    popular: true
  },
  {
    slug: 'compress-pdf',
    name: 'Compress PDF',
    shortDescription: 'Optimize a PDF to reduce its file size.',
    category: 'pdf-tools',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf'],
    popular: true
  },
  {
    slug: 'word-counter',
    name: 'Word Counter',
    shortDescription: 'Live word, character, sentence and reading time stats.',
    category: 'text-tools',
    keywords: ['word counter', 'count words', 'word count'],
    popular: true
  },
  {
    slug: 'character-counter',
    name: 'Character Counter',
    shortDescription: 'Count characters, words and lines in your text.',
    category: 'text-tools',
    keywords: ['character counter', 'count characters', 'letter count'],
    popular: true
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    shortDescription: 'Switch text between UPPERCASE, lowercase and Title Case.',
    category: 'text-tools',
    keywords: ['case converter', 'uppercase', 'lowercase', 'title case'],
    popular: true
  },
  {
  slug: 'slug-generator',
  name: 'Slug Generator',
  shortDescription: 'Create clean, SEO-friendly URL slugs from any text.',
  category: 'text-tools',
  keywords: [
    'slug generator',
    'url slug',
    'create slug',
    'seo slug',
    'url generator'
  ],
  popular: true
}
]

export function getToolBySlug(slug) {
  return TOOLS.find((t) => t.slug === slug)
}

export function getToolsByCategory(categorySlug) {
  return TOOLS.filter((t) => t.category === categorySlug)
}

export function getRelatedTools(slug, limit = 4) {
  const tool = getToolBySlug(slug)
  if (!tool) return []
  return TOOLS.filter((t) => t.category === tool.category && t.slug !== slug).slice(0, limit)
}

export function getPopularTools(limit = 8) {
  return TOOLS.filter((t) => t.popular).slice(0, limit)
}

export function searchTools(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/)
  return TOOLS
    .map((tool) => {
      const haystack = [
        tool.name,
        tool.shortDescription,
        tool.category,
        ...tool.keywords
      ].join(' ').toLowerCase()
      let score = 0
      terms.forEach((term) => {
        if (haystack.includes(term)) score += 1
        if (tool.name.toLowerCase().includes(term)) score += 2
        if (tool.keywords.some((k) => k.toLowerCase() === q)) score += 5
      })
      return { tool, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.tool)
}
