/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config()
const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = {
  siteMetadata: {
    title: `Gulshan Rohra`,
    description: `Gatsby + WordPress (WPGraphQL) site`,
    author: `@gulshan-rohra`,
    siteUrl: process.env.GATSBY_WEBSITE_URL || "https://darkblue-cat-525235.hostingersite.com",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,

    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.GATSBY_WPGRAPHQL_URL || "https://darkblue-cat-525235.hostingersite.com/graphql",
      },
    },
  ],

  // Proxy configuration to avoid CORS during development
  developMiddleware: app => {
    app.use(
      "/wp-json",
      createProxyMiddleware({
        target: "https://darkblue-cat-525235.hostingersite.com",
        changeOrigin: true,
        secure: false,
      })
    )
  },
}
