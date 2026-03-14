'use client'

import { useEffect, useState } from 'react'
import { fetchPageBySlug } from '@/lib/wordpress'

import ServiceCard from './card'
import Testimonials from './testimonials'
import Faqs from './faqs'

import { PageLoader } from '@/common/loader'
import ErrorState from '@/common/error'

function Services({ slug }: { slug: string }) {

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchService = async () => {

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
    fetchService()
  }, [slug])


 

  if (loading) {
    return <PageLoader />
  }

 

  if (error) {
    return <ErrorState refetch={fetchService} />
  }


  const card = data?.acf?.services_card ?? []
  const faqs = data?.acf?.faqs ?? []
  const testimonials = data?.acf?.testimonials ?? []

  const description = data?.acf ?? {}
  const t_description = data?.acf ?? {}
  const f_description = data?.acf ?? {}



  return (
    <>
      <div className="services_outer">
        <div className="inner_section">
          <div className="section_wrapper">

            <h4 className="top_heading">services</h4>
            <h3 className="section_m_heading">Our Services</h3>

            <div
              className="serv_desc"
              dangerouslySetInnerHTML={{
                __html: description?.about_service
              }}
            />

            <div className="service_card">
              <ServiceCard card={card} />
            </div>

          </div>
        </div>
      </div>



      <div className="services_outer s_testi_outer">
        <div className="inner_section">
          <div className="section_wrapper">

            <h4 className="top_heading">What they Say</h4>
            <h3 className="section_m_heading">Testimonials</h3>

            <p
              className="serv_desc"
              dangerouslySetInnerHTML={{
                __html: t_description?.testimonials_description
              }}
            />

            <div className="service_testimonials">
              <Testimonials testimonials={testimonials} />
            </div>

          </div>
        </div>
      </div>



      <div className="services_outer">
        <div className="inner_section">
          <div className="section_wrapper">

            <h4 className="top_heading">Faqs</h4>
            <h3 className="section_m_heading">Faqs</h3>

            <p
              className="serv_desc"
              dangerouslySetInnerHTML={{
                __html: f_description?.faqs_description
              }}
            />

            <div className="service_testimonials">
              <div className="services_faqs">
                <Faqs faqs={faqs} />
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Services