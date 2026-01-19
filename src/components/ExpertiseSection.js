import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Swiper, SwiperSlide } from "swiper/react";
import { graphql, useStaticQuery } from "gatsby";
import "swiper/css";

const ExpertiseSection = ({ prePostOperative = [] }) => {
  // ================= GraphQL Query =================
  const data = useStaticQuery(graphql`
    query ExpertiseSectionQuery {
      allWpExpertise {
        edges {
          node {
            title
            content
            featuredImage {
              node {
                altText
                gatsbyImage(width: 487, height: 417, quality: 90)
              }
            }
          }
        }
      }
    }
  `);

  const expertiseSlider = data?.allWpExpertise?.edges?.map(({ node }) => ({
    title: node.title,
    sliderImage: node.featuredImage?.node
      ? { node: node.featuredImage.node }
      : null,
  }));

  if (!expertiseSlider?.length) return null;

  return (
    <section className="expertise-slider pseudo-animate">
      <div className="container">

        {/* Heading */}
        <div className="section-header">
          <span className="subtitle">Expert Treatments & Care</span>
          <h2 className="title">Our Expertise</h2>
        </div>

        {/* Treatments / Care Grid */}
        {/* {prePostOperative.length > 0 && (
          <div className="treatments-care">
            <div className="care-grid">
              {prePostOperative.map((item, index) => (
                <div className="care-card" key={index}>
                  {item?.title && <h3 className="card-title">{item.title}</h3>}
                  {item?.paragraph && <p className="card-desc">{item.paragraph}</p>}
                  <a href="#" className="learn-more">Learn More</a>
                </div>
              ))}
            </div>
          </div>
        )} */}

    {/* Expertise Slider */}
<Swiper
  className="expertise-Swiper"
  spaceBetween={30}
  loop
  breakpoints={{
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>
  {expertiseSlider.map((item, index) => {
    const image = getImage(item?.sliderImage?.node)

    return (
      <SwiperSlide key={index}>
        <div className="expertise-card">
          <div className="card-image">
            {image && (
              <GatsbyImage
                image={image}
                alt={item?.title || ""}
              />
            )}
          </div>
          {item?.title && (
            <h3 className="card-title">{item.title}</h3>
          )}
        </div>
      </SwiperSlide>
    )
  })}
</Swiper>


      </div>
    </section>
  );
};

export default ExpertiseSection;
