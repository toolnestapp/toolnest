import ToolPageShell from '../../components/ToolPageShell.jsx'
import ImageFormatConverter from './ImageFormatConverter.jsx'

export default function JpgToPng() {
  return (
    <ToolPageShell
      slug="jpg-to-png"
      title="JPG to PNG Converter"
      seoTitle="JPG to PNG Converter Online"
      description="Convert JPG or JPEG images to PNG format directly in your browser."
      showPrivacyNote
      howToUseSteps={[
        { title: 'Upload a JPG image', description: 'Drag and drop or select a JPG/JPEG file.' },
        { title: 'Convert', description: 'Click Convert to PNG to process the file.' },
        { title: 'Download', description: 'Save the converted PNG file to your device.' }
      ]}
      faqItems={[
        { question: 'Why convert JPG to PNG?', answer: 'PNG supports transparency and lossless quality, which is useful for logos, graphics and images that need editing later.' },
        { question: 'Will the PNG file be larger than the JPG?', answer: 'Usually yes — PNG is a lossless format, so file sizes are typically larger than compressed JPGs.' }
      ]}
    >
      <ImageFormatConverter targetMime="image/png" targetExt="png" />
    </ToolPageShell>
  )
}
