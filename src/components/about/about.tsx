'use client'

import { SLUG } from '@/constant/constant'
import { fetchPageBySlug } from '@/lib/wordpress'
import React, { useEffect, useState } from 'react'
import Teams from './teams'
import Videos from './videos'
import { PageLoader } from '@/common/loader'
import ErrorState from '@/common/error'
import Pillars from './pillars'

function About() {

  const slug = SLUG[2]

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)


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
 

  if (loading) {
    return <PageLoader />
  }

 

  if (error) {
    return <ErrorState refetch={fetchAboutPage} />
  }


  const result = data?.acf ?? {}

  console.log(result)



  return (
    <>
      <div className="ab_outer">
        <div className="inner_section">

          <div className="section_wrapper">
            <h4 className="top_heading">{result?.heading}</h4>
            <h3 className="section_m_heading">About us</h3>
            <p>{result?.paragraph}</p>
          </div>

          <div className="ab_">

            <div className="mission about_section">
              <h3 className="ab_sec_heading">{result?.mission_heading}</h3>
              <p>{result?.mission_paragraph}</p>
            </div>

            <div className="vision about_section">
              <h3 className="ab_sec_heading">{result?.vision_heading}</h3>
              <p>{result?.vision_paragraph}</p>
            </div>

            <div className="values about_section">
              <h3 className="ab_sec_heading">{result?.values_heading}</h3>
              <p>{result?.values_paragrapg}</p>
            </div>

          </div>

        </div>
      </div>


   <div className="ab_outer-pillars">
        <div className="inner_section">

          <div className="ab_pillars">

            <h4 className="top_heading">our pillars</h4>
            <h3 className="section_m_heading">{result?.pillar_heading}</h3>
            <p>{result?.pillar_paragraph}</p>

            <Pillars />

          </div>

        </div>
      </div>


      <div className="ab_outer-teams">
        <div className="inner_section">

          <div className="ab_teams">

            <h4 className="top_heading">our teams</h4>
            <h3 className="section_m_heading">{result?.team_heading}</h3>
            <p>{result?.teams_paragraph}</p>

            <Teams />

          </div>

        </div>
      </div>



      <div className="ab_outer-videos">
        <div className="inner_section">

          <h4 className="top_heading">experts videos</h4>
          <h3 className="section_m_heading">{result?.videos_heading}</h3>

          <div className="ab_videos">
            <Videos result={result} />
          </div>

        </div>
      </div>

    </>
  )
}

export default About