import ToolPageShell from '../../components/ToolPageShell.jsx'
import ImageFormatConverter from './ImageFormatConverter.jsx'

export default function JpgToWebp() {
  return (
    <ToolPageShell
      slug="jpg-to-webp"
      title="JPG to WebP Converter"
      seoTitle="JPG to WebP Converter Online"
      description="Convert JPG or JPEG images to the modern WebP format directly in your browser."
      showPrivacyNote
      howToUseSteps={[
        { title: 'Upload a JPG image', description: 'Drag and drop or select a JPG/JPEG file.' },
        { title: 'Convert', description: 'Click Convert to WebP to process the file.' },
        { title: 'Download', description: 'Save the converted WebP file to your device.' }
      ]}
      faqItems={[
        { question: 'Why use WebP?', answer: 'WebP typically produces smaller file sizes than JPG at similar visual quality, which helps web pages load faster.' },
        { question: 'Is WebP supported everywhere?', answer: 'Nearly all modern browsers support WebP. Very old browsers or software may not, so keep a JPG copy if you need broad compatibility.' }
      ]}
    >
      <ImageFormatConverter targetMime="image/webp" targetExt="webp" />
    </ToolPageShell>
  )
}
