'use client'
import ErrorState from '@/common/error'
import { PageLoader } from '@/common/loader'
import { fetchSingleCaseStudy } from '@/lib/wordpress'
 
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface SingleCaseStudy {
  id: number
  title: string
  slug: string
  heading: string
  case_study_paragraph: string
  image: string | false
  overview: string
}

function CaseStudySinglepage() {
  const params = useParams()
  const slug = params?.slug as string

  const [data, setData] = useState<SingleCaseStudy | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchSingleCaseStudyData = async () => {
    if (!slug) return

    try {
      setLoading(true)
      setError(false)

      const result = await fetchSingleCaseStudy(slug)
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
    fetchSingleCaseStudyData()
  }, [slug])

  if (loading) return <PageLoader />
  if (error) return <ErrorState refetch={fetchSingleCaseStudyData} />
  if (!data) return <div>No case study found</div>

   
  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  console.log(data)

  return (
    <div className="case_study_single_outer">
      <div className="inner_section">
        <div className="case_study_header">
          <h1 className="case_study_title">{data.heading}</h1>
          {data.image && (
            <div className="case_study_featured_image">
              <img src={data.image} alt={data.heading} />
            </div>
          )}
        </div>

        <div className="case_study_body">
          <div className="case_study_overview">
            <h2>Overview</h2>
            {/* Using dangerouslySetInnerHTML since overview comes as HTML */}
            <div dangerouslySetInnerHTML={{ __html: data.overview }} />
          </div>

          <div className="case_study_paragraph">
            <h2>Details</h2>
            <p>{data.case_study_paragraph}</p>
          </div>
        </div>

         
      </div>
    </div>
  )
}

export default CaseStudySinglepage