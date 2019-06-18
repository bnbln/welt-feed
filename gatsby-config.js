/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://www.welt.de/feeds/ooh/out-of-home`,
        name: `WELT`,
        // Optional
        // Read parser document: https://github.com/bobby-brennan/rss-parser#readme
        parserOption: {
          customFields: {
            item: ['welt:topic', 'welt:source'],
          }
        }
      }
    }
  ]
}
