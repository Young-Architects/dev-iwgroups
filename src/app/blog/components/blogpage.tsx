'use client'
import ErrorState from '@/common/error'
import { PageLoader } from '@/common/loader'
import { LIMIT } from '@/constant/constant'
import { fetchAllBlogs } from '@/lib/wordpress'
import { BlogResponse, BlogItem } from '@/types/wordpress'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Blogpage() {
  const [data, setData] = useState<BlogResponse>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = LIMIT

  const fetchAboutPage = async () => {
    try {
      setLoading(true)
      setError(false)

      const result: BlogResponse = await fetchAllBlogs()
      if (!result) throw new Error('No data')

      setData(result)

     
      setCurrentPage(1)

    } catch (err) {
      console.error(err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAboutPage()
  }, [])

  if (loading) return <PageLoader />
  if (error) return <ErrorState refetch={fetchAboutPage} />

  const totalPages = Math.ceil(data.length / postsPerPage)

  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = data.slice(startIndex, startIndex + postsPerPage)

  
  const shouldShowPagination = totalPages > 1

  const getPagination = () => {
    const showAll = totalPages <= 7

    if (showAll) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        '...',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ]
  }

  return (
    <div className="blog_outer">
      <div className="inner_section">
        <h4 className="top_heading">blogs</h4>
        <h3 className="section_m_heading">Blogs</h3>

        <div className="section_wrapper blog_wrapper">
          {currentPosts.map((e: BlogItem, i: number) => (
            <div className="blog_card" key={i}>

              <div className="blog_img">
                <img src={e.acf.image} alt={e.acf.heading} />
              </div>

              <div className="blog_content">
                <h3>{e.acf.heading}</h3>
                <p>{e.acf.paragraph.slice(0, 150)}...</p>
              </div>

              <div className="blog_action">
                <Link href={`/blog/${e.slug}`}>read more</Link>
              </div>

            </div>
          ))}
        </div>

        
        {shouldShowPagination && (
          <div className="blog_pagination">

           
            <button
              className="prev_next"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Prev
            </button>

           
            {getPagination().map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={index}
                    className="dots"
                    onClick={() => {
                      if (index === 1) {
                        setCurrentPage(prev => Math.max(prev - 3, 1))
                      } else {
                        setCurrentPage(prev => Math.min(prev + 3, totalPages))
                      }
                    }}
                    style={{ cursor: 'pointer', padding: '0 8px' }}
                  >
                    ...
                  </span>
                )
              }

              return (
                <button
                  key={index}
                  className={currentPage === page ? 'active' : ''}
                  onClick={() => setCurrentPage(page as number)}
                >
                  {page}
                </button>
              )
            })}

           
            <button
              className="prev_next"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>

          </div>
        )}

      </div>
    </div>
  )
}

export default Blogpage