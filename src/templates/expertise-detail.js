import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

// ✅ DEFAULT imports (FIXED)
import ExpertiseSection from "../components/ExpertiseSection"
import Layout from "../components/LayoutNew"

const ExpertiseDetailPage = ({ data }) => {
  const expertise = data?.wpExpertise

  if (!expertise) return <p>Loading...</p>

  const image = getImage(expertise.featuredImage?.node?.gatsbyImage)

  return (
    <Layout>
      {/* ================= HERO ================= */}
      <section className="inner-hero-sec">
        <StaticImage
          src="../images/web-banner-inside.png"
          alt={expertise.title}
          className="inner-hero-img"
          placeholder="blurred"
          layout="fullWidth"
        />

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
              {image && (
                <GatsbyImage
                  image={image}
                  alt={
                    expertise.featuredImage?.node?.altText ||
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
    }
  }
`
