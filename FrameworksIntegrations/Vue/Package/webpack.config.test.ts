import Webpack from "webpack";
import Path from "path";
import { VueLoaderPlugin } from "vue-loader";


const webpackConfig: Webpack.Configuration = {

  context: Path.resolve(process.cwd(), "Tests"),
  entry: {
    "OverflowSafeSingleLineLabel": "./OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel.test.ts"
  },
  output: {
    filename: "[name].js",
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
    extensions: [ ".js", ".ts" ]
  },

  plugins: [
    new VueLoaderPlugin()
  ]
};


export default webpackConfig;
