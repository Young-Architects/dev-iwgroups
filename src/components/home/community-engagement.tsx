'use client'

import { CommunityEngagementProps } from '@/types/wordpress'
import React, { useState } from 'react'

function CommunityEngagement({ com_pres }: CommunityEngagementProps) {

    const [currentSlide, setCurrentSlide] = useState(0)
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    if (!com_pres?.galleries) return null

   
    const galleries = com_pres?.galleries

    const chunked = []
    for (let i = 0; i < galleries.length; i += 4) {
        chunked.push(galleries.slice(i, i + 4))
    }

    return (
        <div className="com_sec_wrapper">
            <div className="com_grid">

                <div className="com_left">
                    <h4 className='top_heading'>
                        Community Engagement
                    </h4>
                    <h3 className='section_m_heading'>
                        {com_pres?.com_heading}
                    </h3>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: com_pres?.com_paragraph || '',
                        }}
                    />
                </div>

                <div className="com_slider_wrapper">

                    <div
                        className="com_slider_track"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`
                        }}
                    >
                        {chunked.map((group, slideIndex) => (
                            <div className="com_slide" key={slideIndex}>
                                <div className="com_right">
                                    {group.map((e, i) => {
                                        const realIndex = slideIndex * 4 + i
                                        return (
                                            <div
                                                className="com_gal"
                                                key={i}
                                                onClick={() => setOpenIndex(realIndex)}
                                            >
                                                <img src={e?.image} alt="" />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="dots">
                        {chunked.map((_, i) => (
                            <span
                                key={i}
                                className={i === currentSlide ? 'dot active' : 'dot'}
                                onClick={() => setCurrentSlide(i)}
                            />
                        ))}
                    </div>

                </div>
            </div>

            {openIndex !== null && (
                <div className="gallery_modal">
                    <div
                        className="modal_overlay"
                        onClick={() => setOpenIndex(null)}
                    />

                    <div className="modal_content">
                        <img
                            src={galleries[openIndex]?.image}
                            alt=""
                            className="modal_img"
                        />

                        <button
                            className="close_btn"
                            onClick={() => setOpenIndex(null)}
                        >
                            ✕
                        </button>

                        <button
                            className="modal_prev"
                            onClick={() =>
                                setOpenIndex(
                                    openIndex === 0
                                        ? galleries.length - 1
                                        : openIndex - 1
                                )
                            }
                        >
                            ‹
                        </button>

                        <button
                            className="modal_next"
                            onClick={() =>
                                setOpenIndex(
                                    openIndex === galleries.length - 1
                                        ? 0
                                        : openIndex + 1
                                )
                            }
                        >
                            ›
                        </button>

                    </div>
                </div>
            )}
        </div>
    )
}

export default CommunityEngagement