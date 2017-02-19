import path from "path"

const PATHS = {
  src: path.join(__dirname, "./dev/"),
}

export default () => ({
  entry: {
    "dev":  [
			"babel-polyfill",
			"react-hot-loader/patch",
			"webpack-dev-server/client?http://localhost:8080",
			path.join(PATHS.src, "index.js")
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
    alias: {
      src: PATHS.src,
    },
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
        include: PATHS.src,
        options: {
          babelrc: false,
          presets: [
            [
							"env", {  modules: false} ],
							"react"
          ],
          plugins: []
        },
      }
    ],
  },
  node: {
    fs: "empty"
  }
})
