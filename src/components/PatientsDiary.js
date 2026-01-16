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
              <SwiperSlide key={index}>
                <div className="diary-card video-card">
                  <div className="media-wrapper">
                    {testimonial?.testimonialVideo?.node?.mediaItemUrl ? (
                      <iframe
                        src={`${testimonial.testimonialVideo.node.mediaItemUrl}?mute=1&autoplay=1`} // mute + autoplay
                        title={testimonial.testimonialTitle || "Patient Testimonial"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="media-placeholder"></div>
                    )}
                  </div>

                  <div className="card-content">
                    <h3>{testimonial.testimonialTitle || "Patient Name"}</h3>
                    <span>{testimonial.testimonialSubtitle || "City"}</span>
                  </div>
                </div>
              </SwiperSlide>

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
