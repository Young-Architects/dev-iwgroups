'use client'
import { SLUG } from '@/constant/constant';
import { fetchPageBySlug } from '@/lib/wordpress';
import React, { useEffect, useState } from 'react'
import Form from './form';
import Phone from './phone';
import Address from './address';

function Contact() {
      const slug=SLUG[0]
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

    <div className="contact_outer">
        <div className="inner_section">
            <div className="section_wrapper">

                <div className="cont_s_first">
                    <div className="con_left">
                        <img src={result?.image} alt="contact" />
                    </div>
                    <div className="con_right">
                        <Form/>
                    </div>

                </div>

                <div className="con_s_second">
                    <Phone result={result}/>
                </div>

                <div className="con_s_third">
                    <Address result={result}/>
                </div>
                
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Contact