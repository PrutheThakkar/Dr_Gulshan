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

        {/* HERO */}
        <section className="blog-hero">
          <div className="container">
            <h1>{post.title}</h1>

            {featuredImage && (
              <GatsbyImage
                image={featuredImage}
                alt={post.title}
                className="blog-hero-image"
              />
            )}
          </div>
        </section>

        {/* CONTENT */}
        <section className="blog-content">
          <div
            className="container"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
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
