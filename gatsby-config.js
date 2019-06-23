module.exports = {
  __experimentalThemes: [
    'gatsby-theme-ui',
  ],
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [ '.mdx', '.md' ],
      }
    }
  ],
}
