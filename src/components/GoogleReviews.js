import React, { useRef, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"

const GoogleReviews = () => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  // Mock reviews data (replace with actual data from GraphQL or API)
  const reviews = [
    {
      name: "Sandeep Menon",
      time: "30 Days ago",
      text: "Best doctor. Very skilled and he brings in positive vibe not only across his patients but to their close ones as well.",
    },
    {
      name: "Rya Naik",
      time: "2 months ago",
      text: "On 6th November, my mother underwent triple bypass surgery at Wockhardt Hospital under the care of Dr. Gulshan Rohra. The surgery, which lasted approximately eight and a half hours, went smoothly and was uneventful. Dr. Gulshan is an exceptionally skilled and dedicated surgeon, and thanks to his expertise and the support of his wonderful team, my mother is recovering well and steadily getting back to her normal routine. The hospital itself was immaculate, highly organized, and maintained the highest standards of care, which made the entire experience reassuring and comfortable for our family. The aftercare, including guidance on diet and lifestyle, has been very helpful in her recovery. We wholeheartedly recommend Dr. Gulshan Rohra and his team to anyone seeking expert cardiac care.",
    },
    {
      name: "Shashi Khatwani",
      time: "2 months ago",
      text: "Excellent doctor, Saved my life.",
    },
  ]

  useEffect(() => {
    // Ensuring that the swiper navigation buttons are working after the component is mounted
    if (prevRef.current && nextRef.current) {
      // Manually connect the navigation
      prevRef.current.addEventListener("click", () => {
        document.querySelector(".google-review-swiper").swiper.slidePrev()
      })
      nextRef.current.addEventListener("click", () => {
        document.querySelector(".google-review-swiper").swiper.slideNext()
      })
    }
  }, [])

  return (
    <section className="google-reviews">
      {/* Scroll Review Shadow */}
      <div className="scroll-review-shadow"></div>

      {/* Pink Line */}
      <div className="pink-line"></div>

      <div className="inner-container">
        {/* Header */}
        <div className="reviews-header">
          <h3>Patients reviews on Google</h3>
          <div className="rating">
            <div className="stars">★★★★★</div>
            <span>4.9 rating of 38 reviews</span>
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
        <div className="diary-slider-wrapper">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            speed={1000}
            grabCursor
            autoplay={{
              delay: 3000, // Auto-scroll every 3 seconds
              disableOnInteraction: false, // Keep autoplay running even if user interacts
            }}
            // pagination={{ clickable: true }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 1 }, // Adjust the number of slides per view on desktop
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
              swiper.navigation.init()
              swiper.navigation.update()
            }}
            className="google-review-swiper"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="review-card">
                  <div className="review-top">
                    <div className="author">
                      <div>
                        <h4>{review.name}</h4>
                        <p>{review.meta}</p>
                      </div>
                    </div>
                    <div className="menu-dots">⋮</div>
                  </div>

                  <div className="review-rating">
                    {"★★★★★"} <span>{review.time}</span>
                  </div>

                  <p className="review-text">{review.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="diary-nav">
            <div className="swiper-button-prev google-prev" ref={prevRef}>
              <svg
                className="swiper-navigation-icon"
                width="11"
                height="20"
                viewBox="0 0 11 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="swiper-button-next google-next" ref={nextRef}>
              <svg
                className="swiper-navigation-icon"
                width="11"
                height="20"
                viewBox="0 0 11 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoogleReviews
