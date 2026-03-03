import React from 'react'
import dynamic from 'next/dynamic'
import { GlobalPresenceProps } from '@/types/wordpress'

const GlobalMap = dynamic(() => import('../map/GlobalMap'), {
    ssr: false
})

function GlobalPpresense({ global_pres }: GlobalPresenceProps) {




    return (
        <>

            <div className="global_pres_wrapper">

                <h4 className='top_heading'>our global</h4>
                <h3 className='section_m_heading'>
                    {global_pres?.global_heading}
                </h3>
                <p>{global_pres?.global_paragraph}</p>

                <div className="global_outer">



                    <div className="g_left_section">
                        <h3 className='global_pres_heading'>{global_pres?.uk_country_name}</h3>
                        <div className="global_c_outer">
                            {global_pres?.about_united_kingdom?.map((e, i) => {
                                return <div className="g_list" key={i}>

                                    <li> <img src="/images/check.png" alt="mark" />{e?.list}</li>
                                </div>
                            })}
                        </div>

                    </div>

                    <GlobalMap
                        indiaLat={Number(global_pres?.india_lat)}
                        indiaLng={Number(global_pres?.india_long)}
                        ukLat={Number(global_pres?.uk_lat)}
                        ukLng={Number(global_pres?.uk_long)}
                    />

                    <div className="g_right_section">


                        <h3 className='global_pres_heading'>{global_pres?.in_country_name}</h3>
                        <div className="global_c_outer">
                            {global_pres?.about_india?.map((e, i) => {
                                return <div className="g_list" key={i}>

                                    <li> <img src="/images/check.png" alt="mark" />{e?.list}</li>
                                </div>
                            })}
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default GlobalPpresense