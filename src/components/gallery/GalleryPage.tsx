'use client'

import { useEffect, useState } from 'react'
import { fetchPageBySlug } from '@/lib/wordpress'
import { SLUG } from '@/constant/constant'
import { PageLoader } from '@/common/loader'
import ErrorState from '@/common/error'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// Define types
interface GalleryImage {
  g_image: string
}

interface GalleryData {
  gallery_heading: string
  gallery_description: string
  gallery: GalleryImage[]
}

interface PageData {
  acf: GalleryData
}

function GalleryPage() {
  const [data, setData] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const slug = SLUG[9]

  const loadGallery = async () => {
    try {
      setLoading(true)
      setError(false)
      const result = await fetchPageBySlug(slug)
      if (!result) {
        throw new Error('No data')
      }
      setData(result as PageData)
    } catch (err) {
      console.error(err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGallery()
  }, [])

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? (gallery?.gallery?.length || 0) - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev === (gallery?.gallery?.length || 0) - 1 ? 0 : prev + 1
    )
  }

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, currentIndex])

  if (loading) {
    return <PageLoader />
  }

  if (error) {
    return <ErrorState refetch={loadGallery} />
  }

  const gallery = data?.acf

  if (!gallery) {
    return <ErrorState refetch={loadGallery} />
  }

  const images = gallery?.gallery || []

  return (
    <>
      <div className="gallery_outer">
        <div className="inner_section">
          <div className="gallery_wrapper">
            <h4 className="top_heading">Gallery</h4>
            <h3 className="section_m_heading">{gallery?.gallery_heading}</h3>
            <p
              className="ab_para"
              dangerouslySetInnerHTML={{
                __html: gallery?.gallery_description || "",
              }}
            />
            <div className="gall">
              {images.map((e: GalleryImage, i: number) => (
                <div 
                  className="g_wrapper" 
                  key={i}
                  onClick={() => openLightbox(i)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={e?.g_image} alt={`Gallery ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox/Popup */}
      {lightboxOpen && images.length > 0 && (
        <div className="lightbox_overlay" onClick={closeLightbox}>
          <button 
            className="lightbox_close" 
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <FiX size={30} />
          </button>
          
          <button 
            className="lightbox_prev" 
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            aria-label="Previous image"
          >
            <FiChevronLeft size={40} />
          </button>
          
          <div className="lightbox_content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images[currentIndex]?.g_image} 
              alt={`Gallery ${currentIndex + 1}`}
            />
            <div className="lightbox_counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
          
          <button 
            className="lightbox_next" 
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            aria-label="Next image"
          >
            <FiChevronRight size={40} />
          </button>
        </div>
      )}
    </>
  )
}

export default GalleryPage