'use client'

import { ServiceTestimonialsProps } from '@/types/wordpress'
import { useEffect, useState } from 'react'
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"
function Testimonials({ testimonials }: ServiceTestimonialsProps) {

  const [index, setIndex] = useState(0)

  const [isPaused, setIsPaused] = useState(false)


  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }


  useEffect(() => {
    if (!testimonials?.length || isPaused) return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [testimonials, isPaused])

  if (!testimonials?.length) return null
 

  return (
    <>
      <div
        className="ser_test_slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >


        <div className="sl_btns" style={{ marginBottom: '20px' }}>
          <button className="ser_test_prev" onClick={prevSlide}>‹</button>
          <button className="ser_test_next" onClick={nextSlide}>›</button>
        </div>


        <div className="ser_test_wrapper">

          <div
            className="ser_test_track"
            style={{
              transform: `translateX(-${index * 100}%)`,
              display: 'flex',
              transition: 'transform 0.5s ease'
            }}
          >

            {testimonials.map((item, i) => (
              <div
                className="ser_test_card"
                key={i}

                style={{ minWidth: '100%' }}
              >

                <img src={item?.image} alt={item?.name} />

                <h3>{item?.name} <span>({item?.designation})</span></h3>

 
                <p className="ser_test_text">
                  <FaQuoteLeft className="quote_icon left" />
                  {item?.about_member}
                  <FaQuoteRight className="quote_icon right" />
                </p>

              </div>
            ))}

          </div>

        </div>
      </div>


      <div className="ser_test_dots">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={i === index ? 'ser_test_dot active' : 'ser_test_dot'}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>



    </>
  )
}

export default Testimonials