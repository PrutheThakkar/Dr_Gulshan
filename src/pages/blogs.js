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
      
                {/* DESKTOP IMAGE */}
                {heroImage && (
                  <GatsbyImage
                    image={heroImage}
                    alt={heroDesktop?.altText || "About page hero image"}
                    className="inner-hero-img desktop-img"
                    loading="eager"
                  />
                )}
      
                {/* MOBILE IMAGE (STATIC URL) */}
                <img
                  src="https://darkblue-cat-525235.hostingersite.com/wp-content/uploads/2026/01/inside-mobile-image.png"   // 👈 your static mobile image path
                  alt="About page mobile hero image"
                  className="inner-hero-img mobile-img"
                  loading="eager"
                />
      
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
