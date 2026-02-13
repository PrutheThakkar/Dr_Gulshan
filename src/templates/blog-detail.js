import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/LayoutNew"
import Seo from "../components/seo"
import LatestUpdate from "../components/LatestUpdate";

const BlogDetail = ({ data }) => {
  const post = data?.wpPost

  if (!post) return null

  // Fetch desktop and mobile images for the blog banner
  const desktopImage = getImage(post.blogBanner?.blogImageDesk?.node?.gatsbyImage)
  const mobileImage = getImage(post.blogBanner?.blogImageMob?.node?.gatsbyImage)

  return (
    <Layout>
      <article className="blog-detail">

        {/* ================= HERO SECTION ================= */}
        <section className="inner-hero-sec">
          <div className="container">
            <div className="page-title">
              <h1>{post.title}</h1>
            </div>
          </div>
        </section>

        {/* ================= BLOG CONTENT ================= */}
        <section className="expertise-detail">
          <div className="inner-container">
            <div className="content">
              <div className="left">
                <div className="left-wrap">
                  {/* Desktop Image */}
                  {desktopImage && (
                    <GatsbyImage
                      image={desktopImage}
                      alt={post.blogBanner?.blogImageDesk?.node?.altText || post.title}
                      className="blog-hero-image"
                    />
                  )}
                </div>
              </div>

              <div className="right">
                <div
                  className="container"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Latest Updates Section */}
        <LatestUpdate posts={data.allWpPost.edges} />

      </article>
    </Layout>
  )
}

export default BlogDetail

export const Head = ({ data }) => (
  <Seo
    title={data.wpPost.title}
    description={data.wpPost.excerpt}
  />
)

export const query = graphql`
query BlogDetail($id: String!) {
  wpPost(id: { eq: $id }) {
    title
    excerpt
    content
    featuredImage {
      node {
        gatsbyImage(
          width: 1200
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
    }
      
    blogBanner {
      blogImageDesk {
        node {
          altText
          gatsbyImage(
            width: 1200
            height: 600
            quality: 90
            layout: CONSTRAINED
            placeholder: BLURRED
          )
        }
      }
      blogImageMob {
        node {
          altText
          gatsbyImage(
            width: 600
            height: 400
            quality: 90
            layout: CONSTRAINED
            placeholder: BLURRED
          )
        }
      }
    }
  }

  allWpPost(
    sort: { fields: date, order: DESC }
    limit: 3
    filter: { id: { ne: $id } }
  ) {
    edges {
      node {
        id
        title
        excerpt
        slug
        featuredImage {
          node {
            gatsbyImage(
              width: 600
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
        blogBanner {
          blogImageDesk {
            node {
              altText
              gatsbyImage(
                width: 1200
                height: 600
                quality: 90
                layout: CONSTRAINED
                placeholder: BLURRED
              )
            }
          }
          blogImageMob {
            node {
              altText
              gatsbyImage(
                width: 600
                height: 400
                quality: 90
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

