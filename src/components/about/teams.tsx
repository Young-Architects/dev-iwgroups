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
    const duration = 2000
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
    <h3>
      {count}+ <span>{count === 1 ? 'year' : 'years'} of experience</span>
    </h3>
  )
}

 
function Teams() {
  const [data, setData] = useState<any[]>([])
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(4)
  const [popup, setPopup] = useState<any | null>(null)
  const [isPaused, setIsPaused] = useState(false)

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
    const updateView = () => {
      if (window.innerWidth < 600) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else setPerView(4)
    }

    updateView()
    window.addEventListener('resize', updateView)

    return () => window.removeEventListener('resize', updateView)
  }, [])

 
  useEffect(() => {
    if (!data.length || isPaused) return

    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (prev >= data.length - perView) return 0
        return prev + 1
      })
    }, 4500)

    return () => clearInterval(interval)
  }, [data.length, perView, isPaused])

 
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

  
  const nextSlide = () => {
    if (current >= data.length - perView) {
      setCurrent(0)
    } else {
      setCurrent(current + 1)
    }
  }

  const prevSlide = () => {
    if (current <= 0) {
      setCurrent(data.length - perView)
    } else {
      setCurrent(current - 1)
    }
  }

 
  
  const cardWidth = `calc((100% - ${(perView - 1)}px) / ${perView})`

  return (
    <>
      <div
        className="teams_slider"
        ref={sectionRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
         
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
              transform: `translateX(-${current * (100 / perView)}%)`,
              display: 'grid',
              gridTemplateColumns: `repeat(${data.length}, ${cardWidth})`,
             
              transition: 'transform 0.5s ease'
            }}
          >
            {data.map((member, i) => (
              <div
                className="team_card"
                key={i}
                onClick={() => setPopup(member)}
              >
                <img src={member?.member_image} />

                <h3>{member?.member_name}</h3>

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
        {Array.from({ length: data.length - perView + 1 }).map((_, i) => (
          <span
            key={i}
            className={i === current ? 'dot active' : 'dot'}
            onClick={() => setCurrent(i)}
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
              className="pop_para"
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