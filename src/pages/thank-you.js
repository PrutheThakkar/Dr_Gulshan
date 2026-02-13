import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/LayoutNew"


const FaqPage = ({ data }) => {
  /* ================= PAGE DATA ================= */
  const pageNode = data?.allWpPage?.edges?.[0]?.node

  if (!pageNode) {
    return <p>Loading FAQ Page content...</p>
  }

  return (
    <Layout>
      {/* ================= HERO SECTION ================= */}
      <section className="inner-hero-sec">
        <div className="container">
          <div className="page-title">
            <h1>{pageNode.title}</h1>

          </div>
        </div>
      </section>

     
    <section className="thank-you-section">
     <h2>Thank You</h2>
     <p>Thank For submiting our form</p>
    </section>
    
    </Layout>
  )
}

export const query = graphql`
  query FaqPageQuery {
   wpPage(databaseId: {eq: 434}) {
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
    allWpPage(filter: { databaseId: { eq: 434 } }) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`

export default FaqPage
