'use client'

import { fetchTeamMembers } from '@/lib/wordpress'
import { useEffect, useState, useRef } from 'react'

 
function Counter({
  end,
  start
}: {
  end: number
  start: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let current = 0
    const duration = 3000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      current += increment

      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, start])

  return (
    <>
      
      <h3>{count}+  <span>{count === 1 ? 'year' : 'years'} of experience</span></h3> 
    </>
  )
}

function Teams() {

  const [data, setData] = useState<any[]>([])
  const [index, setIndex] = useState(0)
  const [popup, setPopup] = useState<any | null>(null)
 
  const [startCount, setStartCount] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const load = async () => {
      const result = await fetchTeamMembers()
      setData(result?.members || [])
    }
    load()
  }, [])

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!data.length) return

    const timer = setInterval(() => {
      nextSlide()
    }, 500000000000)

    return () => clearInterval(timer)

  }, [data, index])

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % data.length)
  }

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + data.length) % data.length)
  }

  const loopData = [...data, ...data]

   

  return (
    <>
     
      <div className="teams_slider" ref={sectionRef}>

        <div className="sl_btns">
          <button className="slider_btn prev" onClick={prevSlide}>
            ‹
          </button>
          <button className="slider_btn next" onClick={nextSlide}>
            ›
          </button>
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

                <img src={member?.member_image} />

                <h3>{member?.member_name} </h3>

                 <div className="y_of_exp">
                  <Counter
                    end={Number(member?.member_year_enperience) || 0}
                    start={startCount}
                  />
                 </div>
               
                 

                <p>({member?.member_designation})</p>

              </div>

            ))}

          </div>

        </div>

      </div>

      <div className="slider_dots">

        {data.map((_, i) => (

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
              <img src={popup.member_image} />
              <button
                className="close_btn"
                onClick={() => setPopup(null)}
              >
                ✕
              </button>
            </div>

            <h2>{popup.member_name}</h2>

            <h4>({popup.member_designation})</h4>

            <p>{popup.member_description}</p>

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

export default Teams