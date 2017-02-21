import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"

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
  plugins: [],
  resolve: {
    extensions: [
      "*",
      ".js"
    ],
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
            [ "env", {  modules: false } ],
							"react"
          ],
					plugins: [ "transform-decorators-legacy", "transform-decorators" ]
        },
      }
    ]
  },
	plugins: [
		new HtmlWebpackPlugin({
			template: paths.dev + "/template.ejs"
		})
	],
  node: {
    fs: "empty"
  }
})
