const Encore = require('@symfony/webpack-encore')
webpack = require('webpack')
HtmlWebpackPlugin = require('html-webpack-plugin')
CopyWebpackPlugin = require('copy-webpack-plugin')
UglifyJsPlugin = require('uglifyjs-webpack-plugin')
RobotstxtPlugin = require('robotstxt-webpack-plugin').default
Dotenv = require('dotenv-webpack')

const routes = [
  '/docs',
  '/docs/deployment',
  '/docs/plugins',
  '/'
];

Encore
  .setOutputPath('dist/')
  .setPublicPath('/')
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  //.enableVersioning(Encore.isProduction()) // pas compatible github.io
  .enableVueLoader()
  .enableSassLoader()
  .addEntry('app', './src/main.js')
  .configureBabel(function(babelConfig) {
    babelConfig.presets.push('es2017','stage-2');
  })

  .addLoader(
    {
      test: /\.md$/,
      use: 'raw-loader'
    }
  )
  .addLoader(
    {
      test: /\.yaml$/,
      use: 'raw-loader'
    }
  )
  .addPlugin(new webpack.ProvidePlugin({
    "React": "react",
  }))

  .addPlugin(new CopyWebpackPlugin([
    'static/demo.cast',
    'src/assets/favicon.ico',
  ]))
  .addPlugin(new RobotstxtPlugin({
    policy: [
    {
      userAgent: '*',
      disallow: '/',
    }]
  }))
  .addPlugin(new Dotenv({path: '.env'}))
;

routes.forEach((r) => {
  Encore.addPlugin(new HtmlWebpackPlugin({
      filename: r+'/index.html',
      template: 'src/index.html'
    }
  ));
});



const webpackConfig = Encore.getWebpackConfig();


if (Encore.isProduction()) {
  // Remove the old version first
  webpackConfig.plugins = webpackConfig.plugins.filter(
    plugin => !(plugin instanceof webpack.optimize.UglifyJsPlugin)
  );

  // Add the new one
  webpackConfig.plugins.push(new UglifyJsPlugin());
}

// export the final configuration
module.exports = webpackConfig;
