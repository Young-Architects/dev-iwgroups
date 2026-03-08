'use client'
import { SLUG } from '@/constant/constant';
import { fetchPageBySlug } from '@/lib/wordpress';
import React, { useEffect, useState } from 'react'
import Teams from './teams';
import Videos from './videos';

function About() {
       const slug=SLUG[2]
        const [data, setData] = useState(null);
            useEffect(() => {
                const fetchHomePage = async () => {
                    const result = await fetchPageBySlug(slug);
                    setData(result);
                };
        
                fetchHomePage();
            }, []);
            //@ts-expect-error ignore this message
            const result=data?.acf ??[] 
   
          
  return (
    <>
    <div className="ab_outer">
        <div className="inner_section">
            <div className="section_wrapper">
                <h4 className='top_heading'>{result?.heading}</h4>
                <h3 className='section_m_heading'>About us</h3>
                <p>{result?.paragraph}</p>
            </div>

<div className="ab_">

            <div className="mission about_section">
                  <h3 className='ab_sec_heading'>{result?.mission_heading}</h3>
                <p>{result?.mission_paragraph}</p>
            </div>
             <div className="vision about_section">
                  <h3 className='ab_sec_heading'>{result?.vision_heading}</h3>
                <p>{result?.vision_paragraph}</p>
            </div>
               <div className="values about_section">
                  <h3 className='ab_sec_heading'>{result?.values_heading}</h3>
                <p>{result?.values_paragrapg}</p>
            </div>
</div>

           
        </div>
    </div>

    <div className="ab_outer-teams">
        <div className="inner_section">
             <div className="ab_teams">
                <h4 className="top_heading">our teams</h4>
                 <h3 className='section_m_heading'>{result?.team_heading}</h3>
                <p>{result?.teams_paragraph}</p>

                <Teams/>
            </div>
        </div>
    </div>

      <div className="ab_outer-videos">
        <div className="inner_section">
            
             <h4 className="top_heading">experts videos</h4>
                 <h3 className='section_m_heading'>{result?.videos_heading}</h3>
             <div className="ab_videos">
                <Videos result={result}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default About