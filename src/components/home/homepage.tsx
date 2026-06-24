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
import Leadership from './leadership'
import Calltoaction from './calltoaction'
import Firms from './firms'
import Industries from './industries'

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
  const sliderContent = data?.acf ?? []
  const about = data?.acf ?? {}
  const our_philosophy = data?.acf ?? []
  const global_pres = data?.acf ?? []
  const com_pres = data?.acf ?? []
  const philosophy = data?.acf ?? []

  const leader_ship_team = data.acf?.leadership_team
  const leader_ship_description = data.acf?.leadership_description

  const firms = data.acf?.our_firms
  const firms_description = data.acf?.firm_description

  const industry_description = data.acf?.industry_description
  const industry = data.acf?.industries

  const cta = data?.acf



  return (
    <>
      <HomeSlider slider={slider} sliderContent={sliderContent} />

      <div className="about_outer">
        <div className="inner_section">
          <About about={about} />
        </div>
      </div>


      <div className="firms_outer s_outer">
        <div className="inner_section">
          <Firms firms={firms} firms_description={firms_description} />

        </div>
      </div>

      <div className="our_innerwork_outer">
        <div className="inner_section">
          <InnerworkGroups our_philosophy={our_philosophy} />
        </div>
      </div>


      <div className="industry_outer s_outer">
        <div className="inner_section">
          <Industries industry={industry} industry_description={industry_description} />


        </div>
      </div>

      <div className="call_to_action s_outer">
        <div className="inner_section">
          <Calltoaction cta={cta} />
        </div>
      </div>

      <div className="leader_ship_outer s_outer">
        <div className="inner_section">
          <Leadership leader_ship_team={leader_ship_team} leader_ship_description={leader_ship_description} />
        </div>
      </div>


      <div className="our_phil_outer">
        <div className="inner_section">
          <OurPhilosophy philosophy={philosophy} />
        </div>
      </div>










      <div className="commu_eng_outer">
        <div className="inner_section">
          <CommunityEngagement com_pres={com_pres} />
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