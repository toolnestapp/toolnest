import { useEffect } from 'react'

function setMetaTag(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLinkTag(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Lightweight, dependency-free SEO manager for a static SPA.
// Sets title, meta description, canonical URL and basic Open Graph tags per page.
export default function SEO({ title, description, path = '' }) {
  useEffect(() => {
    const siteName = 'ToolNest'
    const fullTitle = title ? `${title} | ${siteName}` : siteName
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const canonical = `${origin}${path}`

    document.title = fullTitle
    if (description) {
      setMetaTag('name', 'description', description)
      setMetaTag('property', 'og:description', description)
    }
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:site_name', siteName)
    if (path) {
      setMetaTag('property', 'og:url', canonical)
      setLinkTag('canonical', canonical)
    }
  }, [title, description, path])

  return null
}
