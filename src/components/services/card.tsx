"use client"

import { ServiceCardProps } from "@/types/wordpress"
import { usePathname } from "next/navigation"
import React, { useState } from "react"

function ServiceCard({ card }: ServiceCardProps) {

  const path = usePathname()

  const url = path.split("/")

  const [expanded, setExpanded] = useState<Record<number, boolean>>({})
  const toggleReadMore = (index: number) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <>
      {card?.map((e, i) => {

        const isExpanded = expanded[i]

        return (

          <div className="s_card" key={i}>

            <div className="s_img">
              <img src={e?.image} alt="service_image" />
            </div>

            <div className="s_content_wrapper">

              <div className="s_card_content">

                <h3>{e?.heading}</h3>

                <p className={`desc ${isExpanded ? "open" : ""}`}>
                  {e?.description}
                </p>

                <button
                  className="read_more_btn"
                  onClick={() => toggleReadMore(i)}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>

              </div>



            </div>

            <div className="s_action">
              <a href={e?.link} target="_blank">
                Visit {url[2]}
              </a>
            </div>

          </div>
        )
      })}
    </>
  )
}

export default ServiceCard