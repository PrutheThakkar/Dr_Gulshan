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

        {heroImage && (
          <GatsbyImage
            image={heroImage}
            alt={heroDesktop?.altText || "Expertise page hero image"}
            className="inner-hero-img"
            loading="eager"
          />
        )}

        <div className="container">
          <div className="page-title">
            <h1>
              {pageNode?.anotherPageTitle?.pegeTitle || pageNode?.title}
            </h1>
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
          title
          slug  
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }

  }
`


export default ExpertisePage
