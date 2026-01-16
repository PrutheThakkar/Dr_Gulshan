import React from "react"
import Layout from "../components/LayoutNew"
import LatestUpdate from "../components/LatestUpdate"

const BlogListingPage = () => {
  return (
    <Layout>
      <section className="blog-listing-page">
        <LatestUpdate />
      </section>
    </Layout>
  )
}

export default BlogListingPage
