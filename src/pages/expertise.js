import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/LayoutNew";
import { Link } from "gatsby";

const ExpertisePage = ({ data }) => {
  /* ================= PAGE DATA ================= */
  const pageNode = data?.allWpPage?.edges?.[0]?.node
  const expertiseList = data?.allWpExpertise?.edges || []

  /* ================= HERO IMAGE ================= */
  const heroDesktop =
    pageNode?.insidePageHeroSection?.backgroundImage?.desktop?.node

  const heroImage = getImage(heroDesktop?.gatsbyImage)

  if (!pageNode) {
    return <p>Loading Expertise Page...</p>
  }

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
                  src="https://app.drgulshanrohra.com/wp-content/uploads/2026/01/inside-mobile-image.png"   // 👈 your static mobile image path
                  alt="About page mobile hero image"
                  className="inner-hero-img mobile-img"
                  loading="eager"
                />
      
                <div className="container">
                  <div className="page-title">
                     <h1>{pageNode?.anotherPageTitle?.pegeTitle || pageNode?.title}</h1>
                  </div>
                </div>
      
              </section>

      {/* ================= EXPERTISE SECTION ================= */}
      <section className="expertise-main-page">
        <div className="inner-container">

          {/* Section Header */}
          <div className="section-header">
            <span className="subtitle">TREATMENT & CARE</span>
            <h2 className="title">Areas of Expertise</h2>
          </div>

          <ul className="expertise-grid">
            {expertiseList.map(({ node }) => (
              <li key={node.id}>
                <Link to={`/expertise/${node.slug}`}>
                  <div className="img-wrap">
                    {node?.featuredImage?.node?.mediaItemUrl && (
                      <img
                        src={node.featuredImage.node.mediaItemUrl}
                        alt={node.featuredImage.node.altText || node.title}
                      />
                    )}
                  </div>
                  <h3>{node.title}</h3>
                </Link>
              </li>
            ))}
          </ul>



       

        </div>
      </section>

    </Layout>
  )
}

export const query = graphql`
  query ExpertisePageQuery {
 wpPage(databaseId: {eq: 237}) {
    id
    title
    slug
    seo {
      canonical
      opengraphDescription
      opengraphImage {
        altText
         mediaItemUrl
        height
        width
        mediaType
      }
      opengraphSiteName
      opengraphTitle
      opengraphUrl
      opengraphType
      opengraphModifiedTime
    }
  }
    allWpPage(filter: { databaseId: { eq: 237 } }) {
      edges {
        node {
          id
          title
          anotherPageTitle {
            pegeTitle
          }
          insidePageHeroSection {
            backgroundImage {
              desktop {
                node {
                  altText
                  gatsbyImage(width: 1920, quality: 90)
                }
              }
            }
          }
        }
      }
    }

   allWpExpertise {
    edges {
      node {
        id
         title
          slug  
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
        expertiseImage {
          expertiseImgDesk {
            node {
              altText
              gatsbyImage(
                width: 10
                sizes: ""
                quality: 100
                height: 10
                layout: CONSTRAINED
                placeholder: BLURRED
              )
            }
          }
          expertiseImgMob{
            node {
              altText
              gatsbyImage(
                width: 10
                sizes: ""
                quality: 100
                height: 10
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


export default ExpertisePage
