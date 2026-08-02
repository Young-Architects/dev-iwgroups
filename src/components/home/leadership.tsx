import React, { useState, useEffect } from "react";

interface Leader {
  profile_image: string;
  leader_name: string;
  leader_designation: string;
  short_bio: string;
  leader_email: string;
}

interface LeadershipProps {
  leader_ship_team?: Leader[];
  leader_ship_description?: string;
}

function Leadership({
  leader_ship_team = [],
  leader_ship_description = "",
}: LeadershipProps) {
  const [cardsToShow, setCardsToShow] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCardsToShow(1);
      } else if (window.innerWidth <= 992) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(
    leader_ship_team.length - cardsToShow,
    0
  );

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

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
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [currentIndex, maxIndex]);

  return (
    <div className="lead_section_wrapper">
      <h4 className="top_heading">Our Leadership</h4>
      <h3 className="section_m_heading">Our Leadership</h3>

      <p>{leader_ship_description}</p>

      <div className="leadership_slider">
        <button
          className="slider_btn prev"
          onClick={prevSlide}
        >
          ❮
        </button>

        <div className="slider_container">
          <div
            className="slider_track"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            }}
          >
            {leader_ship_team.map((leader, index) => (
              <div className="l_card" key={index}>
                <img
                  src={leader.profile_image}
                  alt={leader.leader_name}
                />

                <h3>{leader.leader_name}</h3>

                <p className="designation">
                  ({leader.leader_designation})
                </p>

                <p>{leader.short_bio}</p>

                
                  <a href={`mailto:{leader.leader_email}`}>{leader.leader_email}</a>
                  
              </div>
            ))}
          </div>
        </div>

        <button
          className="slider_btn next"
          onClick={nextSlide}
        >
          ❯
        </button>
      </div>

      <div className="slider_dots">
        {Array.from({ length: maxIndex + 1 }).map(
          (_, index) => (
            <span
              key={index}
              className={`dot ${
                currentIndex === index ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Leadership;