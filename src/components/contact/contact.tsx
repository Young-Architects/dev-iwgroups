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

      <div className="c_outer contact_bg"
        style={{ backgroundImage: `url(${result?.image})` }}>
        <div className="inner_section">
          <div className="cont_s_first">

            <div className="con_left">
              <h4>Don't Hesitate To Ask</h4>
              <h3>{result?.contact_heading}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#caa46b">
  <path d="M12 2L2 7v2h20V7L12 2zm-7 9v7h2v-7H5zm4 0v7h2v-7H9zm4 0v7h2v-7h-2zm4 0v7h2v-7h-2zM2 20h20v2H2v-2z"/>
</svg>
              <p>{result?.contact_para}</p>
            </div>

            <div className="con_right">
              <Form />
            </div>

          </div>
        </div>
      </div>



      <div className="contact_outer">

        <div className="inner_section">

          <div className="section_wrapper">






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