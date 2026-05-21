"use client"

import { ServiceCardProps } from "@/types/wordpress"
import { usePathname } from "next/navigation"
import React, { useState } from "react"

function ServiceCard({ card }: ServiceCardProps) {

  const path = usePathname()

  

  const [expanded, setExpanded] = useState<Record<number, boolean>>({})
 

  return (
    <>
      {card?.map((e, i) => {

        const isExpanded = expanded[i]

        return (

            <a href={e?.link} target="_blank" key={i}>
          <div className="s_card" >

            <div className="s_img">
              <img src={e?.image} alt="service_image" />
            </div>

            

             
            <div className="s_content_wrapper">
                <div className="s_card_content">

                  <h3>{e?.heading}</h3>

                  <p className={`desc`}>
                    {e?.description.slice(0,80)+'...'}
                  </p>


                   
                </div>




            </div>




          </div>
           </a>
        )
      })}
    </>
  )
}

export default ServiceCard