import Webpack from "webpack";
import Path from "path";
import { VueLoaderPlugin } from "vue-loader";


const webpackConfig: Webpack.Configuration = {

  context: Path.resolve(process.cwd(), "Source"),
  entry: "./index.ts",
  output: {
    filename: "index.js",
    path: Path.resolve(process.cwd(), "Distributable")
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
      }
    ]
  },

  resolve: {
    extensions: [ ".ts" ]
  },

  plugins: [
    new VueLoaderPlugin()
  ]
};


export default webpackConfig;
