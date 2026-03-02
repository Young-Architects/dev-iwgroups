'use client'
import { useEffect, useState } from 'react'

import { fetchPageBySlug } from '@/lib/wordpress';
import HomeSlider from './slider';
import About from './about';
import OurPhilosophy from './innerwork';


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
    
 

    console.log(`data`)
    console.log(data)

 

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
                    <OurPhilosophy our_philosophy={our_philosophy}  />
                </div>
            </div>

        </>
    )
}

export default Homepage