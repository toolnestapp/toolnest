import { PDFDocument } from 'pdf-lib'

// All PDF operations run fully client-side using pdf-lib (open-source, MIT licensed).
// No file is ever sent to a server.

export async function mergePdfFiles(files) {
  const mergedPdf = await PDFDocument.create()

  for (const file of files) {
    const bytes = await file.arrayBuffer()
    let sourcePdf
    try {
      sourcePdf = await PDFDocument.load(bytes)
    } catch {
      throw new Error(`"${file.name}" could not be read. It may be corrupted or password protected.`)
    }
    const pageIndices = sourcePdf.getPageIndices()
    const copiedPages = await mergedPdf.copyPages(sourcePdf, pageIndices)
    copiedPages.forEach((page) => mergedPdf.addPage(page))
  }

  const mergedBytes = await mergedPdf.save()
  return new Blob([mergedBytes], { type: 'application/pdf' })
}

/**
 * Converts a list of images into a single PDF, one image per page.
 * Images are placed to fit the page while preserving aspect ratio.
 */
export async function imagesToPdf(files) {
  const pdfDoc = await PDFDocument.create()

  for (const file of files) {
    const bytes = await file.arrayBuffer()
    let image
    if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(bytes)
    } else {
      // Treat everything else (jpg/jpeg) as JPEG; browsers already decoded/validated it on selection.
      image = await pdfDoc.embedJpg(bytes)
    }

    const page = pdfDoc.addPage([image.width, image.height])
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height })
  }

  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}

/**
 * Practical, honest client-side "compression" for PDFs.
 * True raster re-compression of embedded images isn't reliably possible
 * fully in-browser for all PDFs, so this re-saves the document with
 * pdf-lib's object-stream optimization, which removes redundant data
 * and can reduce size for many files — but not all.
 */
export async function compressPdf(file) {
  const bytes = await file.arrayBuffer()
  let pdfDoc
  try {
    pdfDoc = await PDFDocument.load(bytes)
  } catch {
    throw new Error('This PDF could not be read. It may be corrupted or password protected.')
  }
  const optimizedBytes = await pdfDoc.save({ useObjectStreams: true })
  return new Blob([optimizedBytes], { type: 'application/pdf' })
}
