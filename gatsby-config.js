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
    siteUrl: process.env.GATSBY_WEBSITE_URL || "https://drgulshanrohra.com/",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,

    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.GATSBY_WPGRAPHQL_URL || "https://app.drgulshanrohra.com/graphql",
        schema: {
          timeout: 60000,
          perPage: 20,
          requestConcurrency: 5,
        },
        type: {
          MediaItem: {
            localFile: {
              requestConcurrency: 5,
              maxFileSizeBytes: 52428800, // 50MB limit
              excludeByMimeTypes: ["image/avif", "video/mp4", "video/webm"],
            },
          },
        },
        develop: {
          hardCacheMediaFiles: true,
        },
      },
    },
  ],

  // Proxy configuration to avoid CORS during development
  developMiddleware: app => {
    app.use(
      "/wp-json",
      createProxyMiddleware({
        target: "https://drgulshanrohra.com",
        changeOrigin: true,
        secure: false,
      })
    )
  },
}