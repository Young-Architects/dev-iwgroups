'use client'

import React, { useState } from 'react'

function Videos({ result }) {

    const [activeVideo, setActiveVideo] = useState(null)

    return (
        <>

            <div className="videos_wrapper">

                {result?.team_members_videos?.map((e, i) => {

                    const youtubeId = e?.video_link?.split('/').pop()

                    return (
                        <div
                            className="video_card"
                            key={i}
                            onClick={() => setActiveVideo(e)}
                        >



                            {e?.video ? (

                                <video muted>
                                    <source src={e.video} type="video/mp4" />
                                </video>

                            ) : e?.video_link ? (

                                <img
                                    src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                                    alt="video thumbnail"
                                />

                            ) : null}

                        </div>
                    )
                })}

            </div>




            {activeVideo && (

                <div className="video-popup">

                    <div
                        className="video-overlay"
                        onClick={() => setActiveVideo(null)}
                    />

                    <div className="video-popup-content">

                        <button
                            className="video-close"
                            onClick={() => setActiveVideo(null)}
                        >
                            ✕
                        </button>

                        {activeVideo?.video ? (

                            <video controls autoPlay>
                                <source src={activeVideo.video} type="video/mp4" />
                            </video>

                        ) : activeVideo?.video_link ? (

                            <iframe
                                width="100%"
                                height="450"
                                src={`https://www.youtube.com/embed/${activeVideo.video_link.split('/').pop()}`}
                                frameBorder="0"
                                allowFullScreen
                            />

                        ) : null}

                    </div>

                </div>

            )}

        </>
    )
}

export default Videos