'use client'

import { ServiceTestimonialsProps } from '@/types/wordpress'
import { useEffect, useState } from 'react'

function Testimonials({ testimonials }:ServiceTestimonialsProps) {

  const [index, setIndex] = useState(0)
  const [popup, setPopup] = useState<any | null>(null)

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {

    if (!testimonials?.length) return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)

  }, [index, testimonials])

  if (!testimonials?.length) return null

  const loopData = [...testimonials, ...testimonials]

  return (
    <>
      <div className="teams_slider">

        <div className="sl_btns">
          <button className="slider_btn prev" onClick={prevSlide}>‹</button>
          <button className="slider_btn next" onClick={nextSlide}>›</button>
        </div>

        <div className="teams_wrapper">

          <div
            className="teams_track"
            style={{
              transform: `translateX(-${index * 25}%)`
            }}
          >

            {loopData.map((member, i) => (

              <div
                className="team_card"
                key={i}
                onClick={() => setPopup(member)}
              >

                <img src={member?.image} alt={member?.name} />

                <h3>{member?.name}</h3>

                <p>({member?.designation})</p>

              </div>

            ))}

          </div>

        </div>

      </div>


      <div className="slider_dots">

        {testimonials.map((_, i) => (

          <span
            key={i}
            className={i === index ? 'dot active' : 'dot'}
            onClick={() => setIndex(i)}
          />

        ))}

      </div>


      {popup && (

        <div className="member_popup">

          <div
            className="popup_overlay"
            onClick={() => setPopup(null)}
          />

          <div className="popup_content">

            <div className="p_img">
              <img src={popup.image} alt={popup.name} />

              <button
                className="close_btn"
                onClick={() => setPopup(null)}
              >
                ✕
              </button>
            </div>

            <h2>{popup.name}</h2>

            <h4>({popup.designation})</h4>

            <p>{popup.place}</p>

            <div
              className='pop_para'
              dangerouslySetInnerHTML={{
                __html: popup.about_member
              }}
            />

          </div>

        </div>

      )}

    </>
  )
}

export default Testimonials