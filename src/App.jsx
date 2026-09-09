import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ImageFormatConverter from './tools/image/ImageFormatConverter.jsx'
import CompressImage from './tools/image/CompressImage.jsx'
import CompressImageTo100KB from './tools/image/CompressImageTo100KB.jsx'
import ResizeImage from './tools/image/ResizeImage.jsx'
import JpgToPdf from './tools/pdf/JpgToPdf.jsx'
import CompressPdf from './tools/pdf/CompressPdf.jsx'
import MergePdf from './tools/pdf/MergePdf.jsx'
import WordCounter from './tools/text/WordCounter.jsx'
import CharacterCounter from './tools/text/CharacterCounter.jsx'
import CaseConverter from './tools/text/CaseConverter.jsx'
import SlugGenerator from './tools/text/SlugGenerator.jsx'
import Tools from './pages/Tools.jsx'
import PercentageCalculator from './tools/calculators/PercentageCalculator.jsx'
import AgeCalculator from './tools/calculators/AgeCalculator.jsx'
import DiscountCalculator from './tools/calculators/DiscountCalculator.jsx'
import AverageCalculator from './tools/calculators/AverageCalculator.jsx'
import RatioCalculator from './tools/calculators/RatioCalculator.jsx'
import Categories from './pages/Categories.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import Footer from './components/Footer.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Contact from './pages/Contact.jsx'



function Header() {
  return (
    <header
  style={{
    padding: '24px 20px',
    borderBottom: '1px solid #e5e7eb',
    fontFamily: 'Arial'
  }}
>

      <strong className="text-brand-600">ToolNest</strong>
    </header>
  )
}

export default function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/image-converter"
          element={<ImageFormatConverter />}
        />
        <Route path="/tools" element={<Tools />} />
        <Route
  path="/compress-image"
  element={<CompressImage />}
/>
<Route
  path="/compress-image-to-100kb"
  element={<CompressImageTo100KB />}
/>
<Route
  path="/resize-image"
  element={<ResizeImage />}
/>
<Route
  path="/jpg-to-pdf"
  element={<JpgToPdf />}
/>
<Route
  path="/merge-pdf"
  element={<MergePdf />}
/>
<Route
  path="/compress-pdf"
  element={<CompressPdf />}
/>
<Route
  path="/word-counter"
  element={<WordCounter />}
/>
<Route
  path="/character-counter"
  element={<CharacterCounter />}
/>
 <Route
  path="/case-converter"
  element={<CaseConverter />}
/>
<Route
  path="/slug-generator"
  element={<SlugGenerator />}
/>
<Route
  path="/percentage-calculator"
  element={<PercentageCalculator />}
/>

<Route
  path="/age-calculator"
  element={<AgeCalculator />}
/>

<Route
  path="/discount-calculator"
  element={<DiscountCalculator />}
/>

<Route
  path="/average-calculator"
  element={<AverageCalculator />}
/>

<Route
  path="/ratio-calculator"
  element={<RatioCalculator />}
/>
<Route path="/categories" element={<Categories />} />

<Route
  path="/categories/:categorySlug"
  element={<CategoryPage />}
/>
<Route path="/privacy" element={<Privacy />} />
<Route path="/terms" element={<Terms />} />
<Route path="/contact" element={<Contact />} />
           </Routes>

      <Footer />
    </div>
  )
}