'use client'
import ErrorState from '@/common/error'
import { PageLoader } from '@/common/loader'
import { fetchSingleBlog } from '@/lib/wordpress'
import { BlogSingle } from '@/types/wordpress'
import React, { useEffect, useState } from 'react'

function Blogsingle({ slug }: { slug: string }) {
  const [data, setData] = useState<BlogSingle>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

 
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [images, setImages] = useState<string[]>([])

  const fetchAboutPage = async () => {
    try {
      setLoading(true)
      setError(false)

      const result = await fetchSingleBlog(slug)

      if (!result) throw new Error('No data')

      setData(result)
    } catch (err) {
      console.error(err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAboutPage()
  }, [slug])

  if (loading) return <PageLoader />
  if (error) return <ErrorState refetch={fetchAboutPage} />

  const result = data ?? []
  const cleanSlug = slug.replace(/-/g, '')

  return (
    <>
       
      {cleanSlug !== 'demohtml' && (
        <div className="blog_top_bar">
          <div className="inner_section">
            <h2>{cleanSlug || 'blog single page'}</h2>
          </div>
        </div>
      )}

      <div className="b_outer">
        <div className="inner_section">

          {result?.map((e, i: number) => {
            return (
              <div className="b_inner_wrapper" key={i}>
 
                <div className="overview">
                  <div
                    className="conent"
                    dangerouslySetInnerHTML={{ __html: e?.acf?.overview }}
                  />
                </div>

             
                <div className="b_images">
                  {e?.acf?.gallries?.map((img: any, index: number) => {
                    return (
                      <div className="b_gallery" key={index}>
                        <img
                          src={img?.image}
                          alt="blog_image"
                          onClick={() => {
                            setImages(
                              e?.acf?.gallries.map((g: any) => g.image)
                            )
                            setCurrentIndex(index)
                            setIsOpen(true)
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    )
                  })}
                </div>

              </div>
            )
          })}

        </div>
      </div>

       
      {isOpen && (
        <div className="blog_popup_overlay">

     
          <button
            className="blog_close_btn"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

        
          <button
            className="blog_prev_btn"
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
          >
            ◀
          </button>

        
          <img
            src={images[currentIndex]}
            className="blog_popup_image"
            alt="popup"
          />

        
          <button
            className="blog_next_btn"
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }
          >
            ▶
          </button>

          
          <div className="blog_counter">
            {currentIndex + 1} / {images.length}
          </div>

        </div>
      )}
    </>
  )
}

export default Blogsingle