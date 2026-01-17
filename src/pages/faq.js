import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/LayoutNew"
import FaqSection from "../components/FAQ"

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

      {/* ================= FAQ SECTION ================= */}
      <FaqSection />
    </Layout>
  )
}

export const query = graphql`
  query FaqPageQuery {
    allWpPage(filter: { databaseId: { eq: 294 } }) {
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
