import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const PatientsDiary = () => {
  const data = useStaticQuery(graphql`
    query {
      allWpPage(filter: { databaseId: { eq: 10 } }) {
        nodes {
          homePage {
            patientSDiaryTitle
            patientSDiarySubtitle
            videoSection {
              testimonialTitle
              testimonialSubtitle
              testimonialVideo {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
  `)

  const diary = data?.allWpPage?.nodes?.[0]?.homePage
  if (!diary) return null

  return (
    <section className="patients-diary pseudo-animate">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">
            {diary.patientSDiarySubtitle || "TESTIMONIALS AND REVIEWS"}
          </span>
          <h2 className="title">
            {diary.patientSDiaryTitle || "Patient’s Diary"}
          </h2>
        </div>

        <div className="diary-slider-wrapper">
          <Swiper
            modules={[Navigation]}
            spaceBetween={60}
            slidesPerView={2}
            speed={1000}
            grabCursor
            navigation={{
              nextEl: ".diary-next",
              prevEl: ".diary-prev",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 30 },
              768: { slidesPerView: 2, spaceBetween: 60 },
            }}
            className="diary-swiper"
          >
            {diary.videoSection?.map((testimonial, index) => (
              <>
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

</>
            ))}
          </Swiper>

          <div className="diary-nav">
            <div className="swiper-button-prev diary-prev"></div>
            <div className="swiper-button-next diary-next"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PatientsDiary
