module.exports = {
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
  env: {
      siteTitle: 'Next.js | ISR Sample',
  },
  trailingSlash: true,
  exportPathMap: async function() {
    return {
      '/': { page: '/' }
    };
  }
}