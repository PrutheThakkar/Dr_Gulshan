import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

const GoogleReviews = () => {
  return (
    <section className="google-reviews pseudo-animate">
      {/* Animated Background */}
      <div className="scroll-review-shadow"></div>
      <div className="pink-line"></div>

      <div className="inner-container">
        {/* Header */}
        <div className="reviews-header">
          <div className="left">
            <h3>Patients reviews on Google</h3>

            <div className="rating">
              <div className="stars">★★★★★</div>
              <span>4.9 rating of 38 reviews</span>
            </div>
          </div>

          <a
            href="#"
            className="review-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leave a Review
          </a>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={30}
          speed={1000}
          loop
         
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
          className="google-review-swiper"
        >
          <SwiperSlide>
            <div className="review-card">
              <div className="review-top">
                <div className="author">
                  <img src="/img/user.jpg" alt="dr Bineet Jha" />
                  <div>
                    <h4>dr Bineet Jha</h4>
                    <p>Local Guide · 21 reviews · 6 photos</p>
                  </div>
                </div>
                <div className="menu-dots">⋮</div>
              </div>

              <div className="review-rating">
                ★★★★★ <span>10 months ago</span>
              </div>

              <p className="review-text">
                I came across Dr Gulshan Rohra Sir during treatment of my Mother in law.
                She had to undergo Bypass surgery done by Dr Gulshan Sir. Surgery was
                uneventful and post operative care was also amazing..
                <br /><br />
                Thanks a ton to Dr Gulshan Sir and also to Dr Parin Sangoi who had done
                Angiography of my Mother in law and referred her...
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-top">
                <div className="author">
                  <img src="/img/user.jpg" alt="Rahul Mehta" />
                  <div>
                    <h4>Rahul Mehta</h4>
                    <p>Local Guide · 12 reviews</p>
                  </div>
                </div>
                <div className="menu-dots">⋮</div>
              </div>

              <div className="review-rating">
                ★★★★★ <span>8 months ago</span>
              </div>

              <p className="review-text">
                Excellent experience. Doctor and staff were extremely supportive.
                Highly recommended.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Navigation buttons */}
        <div className="swiper-button-prev google-prev"></div>
        <div className="swiper-button-next google-next"></div>
      </div>
    </section>
  )
}

export default GoogleReviews
