import React, { useEffect, useState } from "react";

interface Testimonial {
  client_name: string;
  company_name: string;
  client_designation: string;
  client_image: string;
  client_rating: number;
  client_review: string;
}

interface ClientTestimonialsProps {
  client_testimonials?: Testimonial[];
  testimonials_description?: string;
}

function ClientTestimonials({
  client_testimonials = [],
  testimonials_description = "",
}: ClientTestimonialsProps) {
  const cardsToShow = 3;

  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(
    client_testimonials.length - cardsToShow,
    0
  );

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= maxIndex ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? maxIndex : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4500);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="testimonial_section_wrapper">
      <div className="container">

        

         <h4 className="top_heading">Testimonials</h4>

        <h2 className="testimonial_heading">
          What Our Clients Say
        </h2>

        <p className="testimonial_desc">
          {testimonials_description}
        </p>

        <div className="testimonial_slider">

          <button
            className="testimonial_slider_btn testimonial_prev"
            onClick={prevSlide}
          >
            ❮
          </button>

          <div className="testimonial_slider_container">

            <div
              className="testimonial_slider_track"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / cardsToShow)
                }%)`,
              }}
            >
              {client_testimonials.map((item, index) => (
                <div
                  className="testimonial_card"
                  key={index}
                >
                  <div className="testimonial_card_inner">

                    <img
                      src={item.client_image}
                      alt={item.client_name}
                    />

                    <h3>{item.client_name}</h3>

                    <span className="testimonial_designation">
                      {item.client_designation}
                    </span>

                    <div className="testimonial_rating">
                      {"★".repeat(item.client_rating)}
                    </div>

                    <p>
                      {item.client_review}
                    </p>

                  </div>
                </div>
              ))}
            </div>

          </div>

          <button
            className="testimonial_slider_btn testimonial_next"
            onClick={nextSlide}
          >
            ❯
          </button>

        </div>

        <div className="testimonial_slider_dots">
          {Array.from({
            length: maxIndex + 1,
          }).map((_, index) => (
            <span
              key={index}
              className={`testimonial_dot ${
                currentIndex === index
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentIndex(index)
              }
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default ClientTestimonials;