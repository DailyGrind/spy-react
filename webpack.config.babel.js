import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
const FlowWebpackPlugin = require('flow-webpack-plugin')

const paths = {
  dev: path.join(__dirname, "/dev"),
}

export default () => ({
  entry: {
    "dev":  [
			"babel-polyfill",
			"react-hot-loader/patch",
			"webpack-dev-server/client?http://localhost:8080",
			paths.dev + "/index.js"
		],
		"vendor": [ "react", "react-dom" ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [
      "*",
      ".js"
    ],
    alias: {
      lib: "./lib/"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: paths.dev,
        options: {
          babelrc: false,
          presets: [
            [ "env", { "targets": { "safari": 10 },
                       "modules": false } ],
							"react"
            ],
            plugins: [
                "transform-decorators-legacy",
                "transform-class-properties",
                "transform-runtime"
              ]
          },
      }
    ]
  },
	plugins: [
		new HtmlWebpackPlugin({
			template: paths.dev + "/template.ejs"
		}),
    new FlowWebpackPlugin()
	],
  devServer: {
    headers:{
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    }
  },
  node: {
    fs: "empty"
  }
})
