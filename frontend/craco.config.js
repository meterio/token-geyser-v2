const TerserPlugin = require('terser-webpack-plugin')
// import or custom memory modification plugin
const CracoForkTSCheckerPlugin = require('./craco-fork-ts-checker-plugin')

module.exports = {}
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

  plugins: [
    {
      plugin: CracoForkTSCheckerPlugin,
      options: {
        memoryLimit: 6144, // set memory usage in MB, in this example 6GB
      },
    },
  ],
}
