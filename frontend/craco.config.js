const TerserPlugin = require('terser-webpack-plugin')

// https://tailwindcss.com/docs/guides/create-react-app
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },

  webpack: {
    configure: {
      optimization: {
        minimizer: [
          new TerserPlugin({
            parallel: 2,
          }),
        ],
      },
    },
  },
}
