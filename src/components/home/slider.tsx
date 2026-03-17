'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SliderItem {
  image?: string;
}

interface SliderContent {
  slider_heading?: string;
  slider_paragraph?: string;
}
function HomeSlider({
  slider,
  sliderContent
}: {
  slider: SliderItem[];
  sliderContent?: SliderContent;
}) {

    console.log(sliderContent)
    const [current, setCurrent] = useState(0);

    const length = slider?.length || 0;


    useEffect(() => {
        if (!length) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % length);
        }, 4500);

        return () => clearInterval(interval);
    }, [length]);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + length) % length);
    };

    if (!length) return null;

    return (

        <div className="slider_container">

<div className="s_c_outer">

                <div className="slider_content">
                            <div className="slider_heading">
                                <h3>{sliderContent?.slider_heading}</h3>
                            </div>
                            <div className="slider_para">

                                <div
                                    className="slider_para"
                                    dangerouslySetInnerHTML={{
                                        __html: sliderContent?.slider_paragraph || '',
                                    }}
                                />

                                <div className="global_button">
                                     
                                    <button className='m_button'>
                                         <Link href='/contact-us'>Contact Innerwork Group</Link>
                                        </button>

                                </div>

                                <div className="dots">
                                    {slider.map((_, index) => (
                                        <span
                                            key={index}
                                            className={current === index ? 'dot active' : 'dot'}
                                            onClick={() => setCurrent(index)}
                                        />
                                    ))}
                                </div>



                            </div>
                        </div>
</div>



            <div
                className="slider_track"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {slider.map((e, index) => (
                    <div className="slide" key={index}>
                        <img src={e?.image} alt="slider-image" />

                    


                    </div>
                ))}
            </div>


            <button className="prev_btn" onClick={prevSlide}>
                ❮
            </button>
            <button className="next_btn" onClick={nextSlide}>
                ❯
            </button>



        </div>
    );
}

export default HomeSlider;