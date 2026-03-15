"use client"

import { useState } from "react"
import type { AboutProps } from "@/types/wordpress"
import Link from "next/link"
import { SERVICES } from "@/constant/constant"


function About({ about }: AboutProps) {

  console.log(about)

  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  const getActiveIndex = () => {
    return clickedIndex !== null ? clickedIndex : hoverIndex
  }

  return (
    <div className="ab_wrapper">

      {/* LEFT TEXT */}
      <div className="ab_left">
        <h4 className="top_heading">about us</h4>
        <h3 className="section_m_heading">{about?.heading}</h3>

        <p
          className="ab_para"
          dangerouslySetInnerHTML={{
            __html: about?.paragraph || "",
          }}
        />
      </div>


      {/* MOBILE VIEW */}
      <div className="inner_responsive">

        <div className="tabs_wrapper">
          {about?.about_group?.map((group, i) => (
            <div
              key={i}
              className={`tabs ${activeTab === i ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              <img src={group?.group_logo} alt="" />
            </div>
          ))}
        </div>

        <div className="tab_content">
          {about?.about_group?.[activeTab]?.group_card?.map((card, i) => (
            <div className="content_wrapper" key={i}>

              <div className="i_c">
                <h3>{card?.service_name}</h3>

              </div>

              <div className="i_c_p">
                {card?.list?.map((item, index) => (

                  <>
                    <Link
                      key={index}
                      href={`/services/${SERVICES[activeTab]}`}
                    >
                      visit service page
                    </Link>

                  </>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>


      <div
        className="ab_right"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setClickedIndex(null)
            setHoverIndex(null)
          }
        }}
      >


        <div className="ab_inner_sec card_l">
          {about?.about_group?.slice(0, 2)?.map((e, i) => {

            const positionClass = i % 2 === 0 ? "card-bottom" : "card-top"
            const dynamicClass = `inner_card_${i + 1}`
            const activeIndex = getActiveIndex()

            return (
              <div
                className="ab_inner"
                key={i}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={(ev) => {
                  ev.stopPropagation()
                  setClickedIndex(i)
                }}
              >

                <div className={`ab_inner_img ab_inner_img_${i + 1}`}>
                  <img src={e?.group_logo} alt="innerwork_logo" />
                </div>

                {activeIndex === i &&
                  e?.group_card?.map((el, index) => (
                    <div
                      className={`innerwork_card ${positionClass} ${dynamicClass}`}
                      key={index}
                      onClick={(ev) => ev.stopPropagation()}
                    >

                      <div className="in_tag">
                        <h3>{el?.service_name}</h3>

                      </div>

                      {el?.list?.map((list, idx) => (
                        <>
                          <p>{list?.service}</p>
                          <Link
                            href={`/services/${SERVICES[i]}`}
                            key={idx}
                            className="in_list"
                          >
                            visit service page
                          </Link>
                        </>
                      ))}

                    </div>
                  ))}

              </div>
            )
          })}
        </div>



        <div className="ab_inner_al">
          <h3>{about?.groudp_heading}</h3>
        </div>



        <div className="ab_inner_sec card_r">
          {about?.about_group?.slice(2, 4)?.map((e, i) => {

            const realIndex = i + 2
            const positionClass = realIndex % 2 === 0 ? "card-bottom" : "card-top"
            const dynamicClass = `inner_card_${realIndex + 1}`
            const activeIndex = getActiveIndex()

            return (
              <div
                className="ab_inner"
                key={realIndex}
                onMouseEnter={() => setHoverIndex(realIndex)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={(ev) => {
                  ev.stopPropagation()
                  setClickedIndex(realIndex)
                }}
              >

                <div className={`ab_inner_img ab_inner_img_${realIndex + 1}`}>
                  <img src={e?.group_logo} alt="innerwork_logo" />
                </div>

                {activeIndex === realIndex &&
                  e?.group_card?.map((el, index) => (
                    <div
                      className={`innerwork_card ${positionClass} ${dynamicClass}`}
                      key={index}
                      onClick={(ev) => ev.stopPropagation()}
                    >

                      <div className="in_tag">
                        <h3>{el?.service_name}</h3>
                      </div>

                      {el?.list?.map((list, idx) => (
                        <div key={idx}>
                          <p>{list?.service}</p>

                          <Link
                            href={`/services/${SERVICES[realIndex]}`}
                            className="in_list"
                          >
                            visit service page
                          </Link>
                        </div>
                      ))}

                    </div>
                  ))}

              </div>
            )
          })}
        </div>

      </div>

    </div>
  )
}

export default About