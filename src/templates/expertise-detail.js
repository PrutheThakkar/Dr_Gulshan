import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// ✅ DEFAULT imports (FIXED)
import ExpertiseSection from "../components/ExpertiseSection"
import Layout from "../components/LayoutNew"

const ExpertiseDetailPage = ({ data }) => {
  const expertise = data?.wpExpertise

  if (!expertise) return <p>Loading...</p>

  // Fetch desktop and mobile images
  const desktopImage = getImage(expertise.expertiseImage?.expertiseImgDesk?.node?.gatsbyImage)
  const mobileImage = getImage(expertise.expertiseImage?.expertiseImgMob?.node?.gatsbyImage)
  const fallbackImage = getImage(expertise.featuredImage?.node?.gatsbyImage)

  return (
    <Layout>
      {/* ================= HERO ================= */}
      <section className="inner-hero-sec">
        {/* Dynamically load desktop or mobile image based on window size */}
        {desktopImage && (
          <GatsbyImage
            image={desktopImage}
            alt={expertise.expertiseImage?.expertiseImgDesk?.node?.altText || expertise.title}
            className="inner-hero-img"
            placeholder="blurred"
            layout="fullWidth"
          />
        )}
        {/* Mobile image for smaller screen sizes */}
        {mobileImage && (
          <GatsbyImage
            image={mobileImage}
            alt={expertise.expertiseImage?.expertiseImgMob?.node?.altText || expertise.title}
            className="inner-hero-img"
            placeholder="blurred"
            layout="fullWidth"
          />
        )}

        <div className="container">
          <div className="page-title">
            <h1>{expertise.title}</h1>
          </div>
        </div>
      </section>

      {/* ================= DETAIL ================= */}
      <section className="expertise-detail">
        <div className="inner-container">
          <div className="content">

            {/* LEFT */}
            <div className="left">
              {desktopImage && (
                <GatsbyImage
                  image={desktopImage}
                  alt={
                    expertise.expertiseImage?.expertiseImgDesk?.node?.altText ||
                    expertise.title
                  }
                  className="float-image"
                />
              )}
              <div className="heartbeat-divider" />
            </div>

            {/* RIGHT */}
            <div className="right">
              <div
                dangerouslySetInnerHTML={{
                  __html: expertise.content,
                }}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="btn-wrap">
            <a className="btn-primary" href="#contact">
              Consult Dr Rohra today
            </a>
          </div>
        </div>
      </section>

      {/* ================= EXPERTISE SLIDER ================= */}
      <ExpertiseSection prePostOperative={[]} />
    </Layout>
  )
}

export default ExpertiseDetailPage

/* ================= GRAPHQL QUERY ================= */
export const query = graphql`
  query ExpertiseDetailQuery($id: String!) {
    wpExpertise(id: { eq: $id }) {
      title
      content
      featuredImage {
        node {
          altText
          gatsbyImage(width: 487, height: 417, quality: 90)
        }
      }
      expertiseImage {
        expertiseImgDesk {
          node {
            altText
            gatsbyImage(
              width: 901
              quality: 100
              height: 451
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
        }
        expertiseImgMob {
          node {
            altText
            gatsbyImage(
              width: 451
              quality: 100
              height: 451
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`
