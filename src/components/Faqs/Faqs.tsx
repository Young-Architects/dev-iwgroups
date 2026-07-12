'use client'

import { SLUG } from '@/constant/constant'
import { fetchPageBySlug } from '@/lib/wordpress'
import React, { useEffect, useState } from 'react'
import { PageLoader } from '@/common/loader'
import ErrorState from '@/common/error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Spacer from '@/common/IconBrand'

// Define types
interface FAQItem {
  question: string
  answer: string
}

interface FAQData {
  faqs_heading: string
  faqs_description: string
  faqs: FAQItem[]
}

function FaqsPage() {
  const slug = SLUG[8]
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const fetchAboutPage = async () => {
    try {
      setLoading(true)
      setError(false)
      const result = await fetchPageBySlug(slug)
      if (!result) {
        throw new Error('No data')
      }
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
  }, [])

  // Toggle accordion
  const toggleAccordion = (index: number) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index)
  }

  if (loading) {
    return <PageLoader />
  }

  if (error) {
    return <ErrorState refetch={fetchAboutPage} />
  }

  const result = data?.acf ?? {}
  const faqs = result?.faqs || []

  return (
    <>
      <div className="faqs_outer">
        <div className="inner_section">
          <div className="section_wrapper">
            <h4 className="top_heading">FAQs</h4>
            <h3 className="section_m_heading">{result?.faqs_heading}</h3>
            <p>{result?.faqs_description}</p>
          </div>

          <div className="faqs">
            {faqs.map((e: FAQItem, i: number) => {
              const isOpen = openIndex === i
              
              return (
                <div className="faqs_w" key={i}>
                  <div 
                    className="questions_header"
                    onClick={() => toggleAccordion(i)}
                  >
                    <h3>{e?.question}</h3>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`accordion_arrow ${isOpen ? 'rotate' : ''}`}
                    />
                  </div>

                  <div 
                    className={`questions_answer ${isOpen ? 'open' : ''}`}
                  >
                    <p>{e?.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default FaqsPage