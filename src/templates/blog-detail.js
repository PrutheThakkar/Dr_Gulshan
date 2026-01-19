import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/LayoutNew"
import Seo from "../components/seo"

const BlogDetail = ({ data }) => {
  const post = data?.wpPost

  if (!post) return null

  const featuredImage = getImage(post.featuredImage?.node)

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


     <section class="expertise-detail">
        <div class="inner-container">
            <div class="content">
                <div class="left">
                    <div class="left-wrap">
                         {featuredImage && (
                        <GatsbyImage
                          image={featuredImage}
                          alt={post.title}
                          className="blog-hero-image"
                        />
                      )}
                    </div>
                </div>
                <div class="right">
                     <div
            className="container"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
                </div>
            </div>
        </div>
    </section>

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
    }
  }
`
