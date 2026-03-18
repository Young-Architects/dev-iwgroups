'use client'
import { fetchPillars } from '@/lib/wordpress'
import React, { useEffect, useState, useRef } from 'react'


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
        <>

            <p className='p_counter'> ( {count}+ {count === 1 ? 'year' : 'years'} of experience ) </p>
        </>

    )
}

function Pillars() {
    const [data, setData] = useState<any>([])
    const [current, setCurrent] = useState(0)
    const [perView, setPerView] = useState(3)
    const [activeCard, setActiveCard] = useState<any>(null)
    const [isPaused, setIsPaused] = useState(false)

    const [startCount, setStartCount] = useState(false)
    const sectionRef = useRef<HTMLDivElement | null>(null)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchPillars()
                setData(result)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

    const result = data?.pillers ?? []


    useEffect(() => {
        const updateView = () => {
            if (window.innerWidth < 600) setPerView(1)
            else if (window.innerWidth < 992) setPerView(2)
            else setPerView(3)
        }

        updateView()
        window.addEventListener('resize', updateView)

        return () => window.removeEventListener('resize', updateView)
    }, [])


    useEffect(() => {
        if (!result.length || isPaused) return

        const interval = setInterval(() => {
            setCurrent((prev) => {
                if (prev >= result.length - perView) return 0
                return prev + 1
            })
        }, 4500)

        return () => clearInterval(interval)
    }, [result.length, perView, isPaused])


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
        if (current >= result.length - perView) {
            setCurrent(0)
        } else {
            setCurrent(current + 1)
        }
    }

    const prevSlide = () => {
        if (current <= 0) {
            setCurrent(result.length - perView)
        } else {
            setCurrent(current - 1)
        }
    }


    
    const cardWidth = `calc((100% - ${(perView - 1)}px) / ${perView})`

    return (
        <>
            <div
                className="slider_wrapper"
                ref={sectionRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >

                <div className='sl_btns' style={{ marginBottom: '12px' }}>
                    <button className="nav_btn left" onClick={prevSlide}>‹</button>
                    <button className="nav_btn right" onClick={nextSlide}>›</button>
                </div>



                <div className="slider_container">
                    <div
                        className="pillar_slider_track"
                        style={{
                            transform: `translateX(-${current * (100 / perView)}%)`,
                            gridTemplateColumns: `repeat(${result.length}, ${cardWidth})`,
                             
                        }}
                    >
                        {result.map((e: any, i: number) => (
                            <div
                                className="pillar_card"
                                key={i}
                                onClick={() => setActiveCard(e)}
                            >
                                <div className="p_img">
                                    <img src={e?.piller_image} alt="" />
                                </div>

                                <div className="pillar_content">
                                    <h3>{e?.piller_name}

                                    </h3>

                                    <p className='p_desig'>{e?.piller_title}</p>


                                    <Counter
                                        end={Number(e?.pillar_year_enperience) || 0}
                                        start={startCount}
                                    />


                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="dots">
                    {Array.from({ length: result.length - perView + 1 }).map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === current ? 'active' : ''}`}
                            onClick={() => setCurrent(i)}
                        />
                    ))}
                </div>
            </div>


            {activeCard && (
                <div className="member_popup">


                    <div
                        className="popup_overlay"
                        onClick={() => setActiveCard(null)}
                    />


                    <div className="popup_content">

                        <div className="p_img">
                            <img src={activeCard?.piller_image} alt="" />

                            <button
                                className="close_btn"
                                onClick={() => setActiveCard(null)}
                            >
                                ✕
                            </button>
                        </div>

                        <h2>{activeCard?.piller_name}</h2>

                        <h4>{activeCard?.piller_title}</h4>



                        <p>{activeCard?.piller_description}</p>

                        <div
                            className="pop_para"
                            dangerouslySetInnerHTML={{
                                __html: activeCard?.about_piller
                            }}
                        />
                    </div>
                </div>
            )}


        </>
    )
}

export default Pillars