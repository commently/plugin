module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: {
      global: 'Commently',
    }
  },
  webpack: {
    extractCSS: {
      filename: '[name].css',
    },
    styles: {
      css: [
        {
          css: {
            modules: {
              localIdentName: "[name]-[local]-[hash:base64:5]",
            },
          },
        },
      ],
    },
  },
}
