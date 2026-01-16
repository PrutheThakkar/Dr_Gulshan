import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/LayoutNew";

const AboutPage = ({ data }) => {
  /* ================= PAGE DATA ================= */
  const pageNode = data?.allWpPage?.edges?.[0]?.node

  if (!pageNode) {
    return <p>Loading About Page content...</p>
  }

  return (
    <Layout>
      {/* ================= HERO SECTION ================= */}
      <section className="inner-hero-sec">
        <div className="container">
          <div className="page-title">
            {/* ✅ PAGE TITLE FROM WORDPRESS */}
            <h1>{pageNode.title}S</h1>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query AboutPageQuery {
    allWpPage(filter: { databaseId: { eq: 294 } }) {
      edges {
        node {
          title
          uri
          slug
        }
      }
    }
  }
`

export default AboutPage
