import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/LayoutNew"
import LatestUpdate from "../components/LatestUpdate"
import FaqSection from "../components/FAQ"

const BlogListingPage = ({ data }) => {
  const page = data?.wpPage

  // Hero image from ACF
  const heroDesktop = page?.insidePageHeroSection?.heroImage?.node
  const heroImage = getImage(heroDesktop?.gatsbyImage)

  return (
    <Layout>
      {/* ================= HERO SECTION ================= */}
      <section className="inner-hero-sec">
        {heroImage && (
          <GatsbyImage
            image={heroImage}
            alt={heroDesktop?.altText || page?.title || "Blog"}
            className="inner-hero-img"
            loading="eager"
          />
        )}

        <div className="container">
          <div className="page-title">
            <h1>Blog & Patient Education</h1>
          </div>
        </div>
      </section>

      {/* ================= BLOG LISTING ================= */}
      <section className="blog-listing-page">
        <LatestUpdate hideKnowMore />
      </section>

        {/* ================= FAQ SECTION ================= */}
      <FaqSection limit={4} />

    </Layout>
  )
}

export default BlogListingPage

/* ================= GRAPHQL QUERY ================= */
export const query = graphql`
  query BlogPageQuery {
    wpPage(databaseId: { eq: 362 }) {
      title
     
    }
  }
`
