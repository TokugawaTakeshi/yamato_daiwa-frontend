import Webpack from "webpack";
import Path from "path";
import { VueLoaderPlugin } from "vue-loader";


const webpackConfig: Webpack.Configuration = {

  context: Path.resolve(process.cwd(), "Tests"),
  entry: {
    "OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel": "./OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel.test.ts"
  },
  output: {
    filename: "[name].build.js",
    path: Path.resolve(process.cwd(), "Tests")
  },
  mode: "development",
  watch: true,

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [ /\.vue$/ ]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.pug$/u,
        oneOf: [
          {
            resourceQuery: /^\?vue/u,
            use: [ "pug-plain-loader" ]
          },
          {
            use: [
              {
                loader: "html-loader",
                options: {
                  minimize: { caseSensitive: true }
                }
              },
              "pug-html-loader"
            ]
          }
        ]
      },
      {
        test: /\.styl(?:us)?$/u,
        oneOf: [
          {
            resourceQuery: /^\?vue/u,
            use: [
              "vue-style-loader",
              "css-loader",
              "stylus-loader"
            ]
          },
          {
            use: [
              "style-loader",
              "css-loader",
              "stylus-loader"
            ]
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [ ".js", ".ts" ],
    alias: {
      "@SVG_Icons": Path.resolve("Source/SVG_Icons")
    }
  },

  plugins: [
    new VueLoaderPlugin()
  ]
};


export default webpackConfig;
