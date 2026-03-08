'use client'

import { fetchTeamMembers } from '@/lib/wordpress'
import { useEffect, useState } from 'react'

function Teams() {

  const [data, setData] = useState<any[]>([])
  const [index, setIndex] = useState(0)
  const [popup, setPopup] = useState<any | null>(null)

  useEffect(() => {
    const load = async () => {
      const result = await fetchTeamMembers()
      setData(result?.members || [])
    }
    load()
  }, [])


  useEffect(() => {
    if (!data.length) return

    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

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
      <div className="teams_slider">

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

                <h3>{member?.member_name}</h3>

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