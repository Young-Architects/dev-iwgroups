'use client'

import { useEffect, useState } from 'react'

import { fetchPageBySlug } from '@/lib/wordpress'
import HomeSlider from './slider'
import About from './about'
import GlobalPpresense from './global-presense'
import CommunityEngagement from './community-engagement'
import InnerworkGroups from './innerwork'
import OurPhilosophy from './our-philosophy'
import { PageLoader } from '@/common/loader'
import ErrorState from '@/common/error'
import { SLUG } from '@/constant/constant'

function Homepage() {

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
    const slug = SLUG[1]

  const loadHomePage = async () => {

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
    loadHomePage()
  }, [])



 

  if (loading) {
    return <PageLoader />
  }

 

if (error) {
  return <ErrorState refetch={loadHomePage} />
}



  const slider = data?.acf?.slider ?? []
  const about = data?.acf ?? {}
  const our_philosophy = data?.acf ?? []
  const global_pres = data?.acf ?? []
  const com_pres = data?.acf ?? []
  const philosophy = data?.acf ?? []


  return (
    <>
      <HomeSlider slider={slider} />

      <div className="about_outer">
        <div className="inner_section">
          <About about={about} />
        </div>
      </div>

      <div className="our_phil_outer">
        <div className="inner_section">
          <InnerworkGroups our_philosophy={our_philosophy} />
        </div>
      </div>

      <div className="commu_eng_outer">
        <div className="inner_section">
          <CommunityEngagement com_pres={com_pres} />
        </div>
      </div>

      <div className="our_phil_outer">
        <div className="inner_section">
          <OurPhilosophy philosophy={philosophy} />
        </div>
      </div>

      <div className="our_global_outer">
        <div className="inner_section">
          <GlobalPpresense global_pres={global_pres} />
        </div>
      </div>
    </>
  )
}

export default Homepage