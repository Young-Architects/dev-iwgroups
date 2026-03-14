"use client"

import { FaqsProps } from '@/types/wordpress'
import React, { useState } from 'react'
import { FiChevronDown } from "react-icons/fi"

function Faqs({ faqs }:FaqsProps) {

const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const toggleFaq = (index:number) => {
    setActiveIndex((prev) => (prev === index ? null : index))
  }

  return (
    <>
      {faqs?.map((e, i) => {

        const isActive = activeIndex === i

        return (
          <div className="faq_card" key={i}>

            <div
              className="faq_q_outer"
              onClick={() => toggleFaq(i)}
            >
              <h3>{e?.question}</h3>

              <FiChevronDown
                className={`faq_icon ${isActive ? "rotate" : ""}`}
              />
            </div>

            <div
              className="faq_a_outer"
              style={{
                maxHeight: isActive ? "500px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.4s ease"
              }}
            >
              <div
                className="ans"
                dangerouslySetInnerHTML={{
                  __html: e.answer
                }}
              />
            </div>

          </div>
        )

      })}
    </>
  )
}

export default Faqs