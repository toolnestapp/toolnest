import { useEffect, useRef, useState } from 'react'

// Creates an object URL for a File/Blob and safely revokes the previous one
// whenever the source changes or the component unmounts.
export function useObjectUrl(file) {
  const [url, setUrl] = useState(null)
  const prevUrl = useRef(null)

  useEffect(() => {
    if (!file) {
      setUrl(null)
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    prevUrl.current = objectUrl

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  return url
}
