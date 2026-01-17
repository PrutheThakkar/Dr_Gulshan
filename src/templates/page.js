import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/LayoutNew";

const PageTemplate = ({ data }) => {
  const page = data.wpPage;

  return (
    <Layout>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </Layout>
  );
};

export default PageTemplate;

export const query = graphql`
  query PageById($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
    }
  }
`;
