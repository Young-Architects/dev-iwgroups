'use client'
import { useState } from 'react';
import type { AboutProps } from '@/types/wordpress'; 


function About({ about }:AboutProps) {
  console.log(about);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="ab_wrapper">
        <div className="ab_left">

          <h4 className='top_heading'>about us</h4>
          <h3 className='section_m_heading'>{about?.heading}</h3>

          <div
            className="slider_para"
            dangerouslySetInnerHTML={{
              __html: about?.paragraph || '',
            }}
          />

        </div>

        <div className="ab_right">

          <div className="ab_inner-sec">
            {about?.about_group?.slice(0, 2)?.map((e, i) => {
              return (
                <div
                  className="ab_inner"
                  key={i}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div className="ab_inner_img">
                    <img src={e?.group_logo} alt="innerwork_logo" />
                  </div>

               
                  {activeIndex === i &&
                    e?.group_card?.map((el, index) => {
                      return (
                        <div className="in_card" key={index}>
                          <div className="in_tag">
                            <h3>{el?.service_name}</h3>
                          </div>

                          {el?.list?.map((list, idx) => {
                            return (
                              <div className="in_list" key={idx}>
                                <li>{list?.service}</li>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>

          <div className="ab_inner">
            <h3>{about?.groudp_heading}</h3>
          </div>

          <div className="ab_inner_sec">
            {about?.about_group?.slice(2, 4)?.map((e, i) => {
              const realIndex = i + 2;  

              return (
                <div
                  className="ab_inner"
                  key={realIndex}
                  onMouseEnter={() => setActiveIndex(realIndex)}
                >
                  <div className="ab_inner_img">
                    <img src={e?.group_logo} alt="innerwork_logo" />
                  </div>

                 
                  {activeIndex === realIndex &&
                    e?.group_card?.map((el, index) => {
                      return (
                        <div className="in_card" key={index}>
                          <div className="in_tag">
                            <h3>{el?.service_name}</h3>
                          </div>

                          {el?.list?.map((list, idx) => {
                            return (
                              <div className="in_list" key={idx}>
                                <li>{list?.service}</li>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}

export default About;