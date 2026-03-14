'use client'

import { SLUG } from '@/constant/constant'
import { fetchPageBySlug } from '@/lib/wordpress'
import React, { useEffect, useState } from 'react'
import Form from './form'
import Phone from './phone'
import Address from './address'
import { PageLoader } from '@/common/loader'
import ErrorState from '@/common/error'

function Contact() {

  const slug = SLUG[0]

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchContactPage = async () => {

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
    fetchContactPage()
  }, [])


 

  if (loading) {
    return <PageLoader />
  }


  

  if (error) {
    return <ErrorState refetch={fetchContactPage} />
  }


  const result = data?.acf ?? {}



  return (
    <>
      <div className="contact_outer">

        <div className="inner_section">

          <div className="section_wrapper">

            <div className="cont_s_first">

              <div className="con_left">
                <img src={result?.image} alt="contact" />
              </div>

              <div className="con_right">
                <Form />
              </div>

            </div>


            <div className="con_s_second">
              <Phone result={result} />
            </div>


            <div className="con_s_third">
              <Address result={result} />
            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default Contact