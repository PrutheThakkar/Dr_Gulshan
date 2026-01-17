const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  /* ================================
     1️⃣ CREATE WORDPRESS PAGES
     ================================ */

  const pagesResult = await graphql(`
    query {
      allWpPage {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (pagesResult.errors) {
    throw pagesResult.errors;
  }

  const pageTemplate = path.resolve("./src/templates/page.js");

  pagesResult.data.allWpPage.nodes.forEach(page => {
    // Home page
    if (page.slug === "home") {
      createPage({
        path: "/",
        component: pageTemplate,
        context: {
          id: page.id,
        },
      });
    } else {
      createPage({
        path: `/${page.slug}`,
        component: pageTemplate,
        context: {
          id: page.id,
        },
      });
    }
  });

  /* ================================
     2️⃣ CREATE EXPERTISE DETAIL PAGES
     ================================ */

  const expertiseResult = await graphql(`
    query {
      allWpExpertise {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (expertiseResult.errors) {
    throw expertiseResult.errors;
  }

  const expertiseTemplate = path.resolve(
    "./src/templates/expertise-detail.js"
  );

  expertiseResult.data.allWpExpertise.nodes.forEach(expertise => {
    createPage({
      path: `/expertise/${expertise.slug}`,
      component: expertiseTemplate,
      context: {
        id: expertise.id,
      },
    });
  });

  /* ================================
     3️⃣ CREATE BLOG DETAIL PAGES
     ================================ */

  const blogResult = await graphql(`
    query {
      allWpPost {
        nodes {
          id
          uri
        }
      }
    }
  `);

  if (blogResult.errors) {
    throw blogResult.errors;
  }

  const blogTemplate = path.resolve(
    "./src/templates/blog-detail.js"
  );

  blogResult.data.allWpPost.nodes.forEach(post => {
    createPage({
      path: post.uri,
      component: blogTemplate,
      context: {
        id: post.id,
      },
    });
  });
};
