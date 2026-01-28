import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/LayoutNew";

const AboutPage = ({ data }) => {
  const pageNode = data?.allWpPage?.nodes?.[0]
  const aboutData = pageNode?.aboutUs
  const heroDesktop =
    pageNode?.insidePageHeroSection?.backgroundImage?.desktop?.node

  const heroImage = getImage(heroDesktop?.gatsbyImage)
  const gulshanImage = getImage(aboutData?.gulshanImage?.node?.gatsbyImage)

  if (!aboutData) {
    return <p>Loading About Page content...</p>
  }

  return (
    <Layout>
      <>
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
              <h1>About Us</h1>
            </div>
          </div>

        </section>


        {/* ================= ABOUT SECTION ================= */}
        <section className="about-section">
          <div className="container hero-inner">

            <div className="left">
              <h2 className="title">{aboutData.aboutUsTitle}</h2>
              <p className="sub-title">{aboutData.aboutUsParagraph}</p>
            </div>

            <div className="right">
              <div className="img-wrap">
                {gulshanImage && (
                  <GatsbyImage
                    image={gulshanImage}
                    alt={
                      aboutData?.gulshanImage?.node?.altText ||
                      "Dr. Gulshan Rohra"
                    }
                    className="about-heart-image"
                  />
                )}
              </div>
            </div>

          </div>
        </section>
      </>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allWpPage(filter: { databaseId: { eq: 234 } }) {
      nodes {
        aboutUs {
          aboutUsTitle
          aboutUsParagraph
          gulshanImage {
            node {
              altText
              gatsbyImage(
                width: 2048
                height: 2048
                quality: 100
                layout: CONSTRAINED
                placeholder: BLURRED
              )
            }
          }
        }
        insidePageHeroSection {
          backgroundImage {
            desktop {
              node {
                altText
                gatsbyImage(
                  width: 1830
                  height: 500
                  quality: 100
                  layout: CONSTRAINED
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
  }
`

export default AboutPage
