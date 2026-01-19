import React, { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

const GoogleReviews = () => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <section className="google-reviews pseudo-animate">
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
          speed={800}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }}
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
                  <img src="/img/user.jpg" alt="Dr Bineet Jha" />
                  <div>
                    <h4>Dr Bineet Jha</h4>
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

        {/* Navigation Buttons */}
        <div className="swiper-button-prev google-prev" ref={prevRef}><svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg></div>
        <div className="swiper-button-next google-next" ref={nextRef}><svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg></div>
      </div>
    </section>
  )
}

export default GoogleReviews
