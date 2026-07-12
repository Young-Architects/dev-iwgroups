'use client'
import ErrorState from '@/common/error'
import { PageLoader } from '@/common/loader'
import { LIMIT } from '@/constant/constant'
import { fetchCaseStudy } from '@/lib/wordpress' // Assuming you have this function
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Define types based on your API response
interface CaseStudyItem {
  id: number
  title: string
  slug: string
  heading: string
  case_study_paragraph: string
  image: string | false
  overview: string
}

interface CaseStudyResponse {
  case_studies: CaseStudyItem[]
}

function CaseStudyPage() {
  const [data, setData] = useState<CaseStudyItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = LIMIT

  const fetchCaseStudyData = async () => {
    try {
      setLoading(true)
      setError(false)

      const result: CaseStudyResponse = await fetchCaseStudy()
      if (!result || !result.case_studies) throw new Error('No data')

      setData(result.case_studies)
      setCurrentPage(1)
    } catch (err) {
      console.error(err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCaseStudyData()
  }, [])

  if (loading) return <PageLoader />
  if (error) return <ErrorState refetch={fetchCaseStudyData} />

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
    <div className="case_study_outer">
      <div className="inner_section">
        <h4 className="top_heading">Case Studies</h4>
        <h3 className="section_m_heading">Our Case Studies</h3>

        <div className="case_study_wrapper">
          {currentPosts.map((e: CaseStudyItem, i: number) => (
            <div className="case_study_card" key={i}>
              <div className="case_study_img">
                <img 
                  src={e.image || '/placeholder-image.jpg'} 
                  alt={e.heading} 
                />
              </div>

              <div className="case_study_content">
                <h3>{e.heading}</h3>
                <p>{e.case_study_paragraph.slice(0, 150)}...</p>
              </div>

              <div className="case_study_action">
                <Link href={`/insights/case-studies/${e.slug}`}>
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {shouldShowPagination && (
          <div className="case_study_pagination">
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

export default CaseStudyPage