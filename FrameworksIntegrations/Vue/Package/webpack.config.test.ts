import Webpack from "webpack";
import Path from "path";
import { VueLoaderPlugin } from "vue-loader";


const webpackConfig: Webpack.Configuration = {

  context: Path.resolve(process.cwd(), "Tests"),
  entry: {
    "Components/Controls/Buttons/Simple/Button": "./Components/Controls/Buttons/Simple/Button.test.ts",
    "Components/Controls/TextBox/TextBox": "./Components/Controls/TextBox/TextBox.test.ts",
    "Components/Controls/DropDownList/DropDownList": "./Components/Controls/DropDownList/DropDownList.test.ts",
    "Components/OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel":
        "./Components/OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel.test.ts"
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
      vue: "vue/dist/vue.esm-bundler.js",
      "@SVG_Icons": Path.resolve("Source/SVG_Icons")
    }
  },

  plugins: [
    new VueLoaderPlugin(),
    new Webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })
  ]
};


export default webpackConfig;
