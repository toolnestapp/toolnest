import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-4 py-24 text-center sm:px-6">
      <SEO title="Page not found" description="The page you're looking for doesn't exist." path="/404" />
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">We couldn't find the page you were looking for.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">Back to home</Link>
    </div>
  )
}
