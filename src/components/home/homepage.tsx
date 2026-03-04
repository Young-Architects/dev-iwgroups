'use client'
import { useEffect, useState } from 'react'

import { fetchPageBySlug } from '@/lib/wordpress';
import HomeSlider from './slider';
import About from './about';
import GlobalPpresense from './global-presense';
import CommunityEngagement from './community-engagement';
import InnerworkGroups from './innerwork';
import OurPhilosophy from './our-philosophy';


function Homepage() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchHomePage = async () => {
            const result = await fetchPageBySlug('home');
            setData(result);
        };

        fetchHomePage();
    }, []);




    //@ts-expect-error ignore error
    const slider = data?.acf?.slider ?? [];
    //@ts-expect-error ignore error
    const about = data?.acf ?? {};
    //@ts-expect-error ignore error
    const our_philosophy = data?.acf ?? [];
    //@ts-expect-error ignore error
    const global_pres = data?.acf ?? [];
    //@ts-expect-error ignore error
    const com_pres = data?.acf ?? [];
    //@ts-expect-error ignore error
    const philosophy = data?.acf ?? [];


    // console.log(`data`)
    // console.log(data)

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