module.exports = {
  __experimentalThemes: [
    'gatsby-theme-ui',
  ],
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [ '.mdx', '.md' ],
      }
    }
  ],
}
