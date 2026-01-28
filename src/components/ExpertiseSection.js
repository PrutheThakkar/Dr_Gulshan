import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { Link } from "gatsby"
import "swiper/css"

const ExpertiseSection = ({ expertiseData = [] }) => {
  if (!expertiseData.length) return null

  return (
    <section className="expertise-slider pseudo-animate">
      <div className="container">

        <div className="section-header">
          <span className="subtitle">Expert Treatments & Care</span>
          <h2 className="title">Our Expertise</h2>
        </div>

 <Swiper
  className="expertise-Swiper"
  spaceBetween={30}
  loop
  modules={[Autoplay]}
  speed={3000}
  /* ✅ ADD THIS (required to INIT autoplay) */
  autoplay={{
    delay: 2000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}

  breakpoints={{
    0: {
      slidesPerView: 1,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    },
    768: {
      slidesPerView: 2,
      autoplay: false,
    },
    1024: {
      slidesPerView: 3,
      autoplay: false,
    },
  }}
>

          {expertiseData.map(({ node }, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/expertise/${node.slug}`}
                className="expertise-card-link"
              >
                <div className="expertise-card">

                  {node?.featuredImage?.node?.mediaItemUrl && (
                    <div className="card-image">
                      <img
                        src={node.featuredImage.node.mediaItemUrl}
                        alt={node.featuredImage.node.altText || node.title}
                        loading="lazy"
                      />
                    </div>
                  )}

                  <h3 className="card-title">{node.title}</h3>

                </div>
              </Link>
            </SwiperSlide>

          ))}
        </Swiper>

      </div>
    </section>
  )
}

export default ExpertiseSection
