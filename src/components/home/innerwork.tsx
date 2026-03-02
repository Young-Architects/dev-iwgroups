'use client'

import type { OurPhilosophyProps } from '@/types/wordpress';

function OurPhilosophy({ our_philosophy }: OurPhilosophyProps) {

  return (
    <div className="philos_wrapper">

      <div className="inn_left">
        <div className="section_top">
          <h4 className='top_heading'>Innerwork Groups</h4>
          <h3 className='section_m_heading'>
            {our_philosophy.inner_work_heading}
          </h3>
        </div>

        <div className="left_sec">
          {our_philosophy?.inner_work_images?.map((e, i) => (
            <div className="img_wrap" key={i}>
              <img src={e.image} alt="inner work" />
            </div>
          ))}
        </div>
      </div>

      <div className="inn_right">
        {our_philosophy?.our_philosophy?.map((e, index) => (
          <div className="in_card" key={index}>
            <div className="in_content">
              <div className="heading">
                <h3>{e.heading}</h3>
              </div>

              <div
                className="slider_para"
                dangerouslySetInnerHTML={{
                  __html: e.paragraph,
                }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default OurPhilosophy;