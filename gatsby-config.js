// /**
//  * @type {import('gatsby').GatsbyConfig}
//  */
// module.exports = {
//   siteMetadata: {
//     title: `Gulshan Rohra`,
//     description: `Gatsby + WordPress (WPGraphQL) site`,
//     author: `@gulshan-rohra`,
//     siteUrl: `https://darkblue-cat-525235.hostingersite.com`,
//   },
//   plugins: [
//     // Gatsby Image Plugins
//     `gatsby-plugin-image`,
//     `gatsby-plugin-sharp`,
//     `gatsby-transformer-sharp`,
//     `gatsby-plugin-sass`,

//     // WordPress Source
//     {
//       resolve: `gatsby-source-wordpress`,
//       options: {
//         url: `https://darkblue-cat-525235.hostingersite.com/graphql`,
//       },
//     },
//   ],
// }


/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Gulshan Rohra`,
    description: `Gatsby + WordPress (WPGraphQL) site`,
    author: `@gulshan-rohra`,
    siteUrl: process.env.GATSBY_WEBSITE_URL,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,

    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.GATSBY_WPGRAPHQL_URL,
      },
    },
  ],
}


