import Webpack from "webpack";
import Path from "path";


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
        test: /\.(html|svelte)$/,
        use: 'svelte-loader'
      },
      {
        /* [ Theory ] Required to prevent errors from Svelte on Webpack 5+ */
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
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
    extensions: [ ".mjs", ".js", ".ts" ],
    alias: {
      svelte: Path.resolve("node_modules", "svelte")
    }
  },
};


export default webpackConfig;
