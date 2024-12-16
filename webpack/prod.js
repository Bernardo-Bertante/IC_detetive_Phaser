const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: false,
  entry: "./src/index.js", // Entrada principal do seu projeto
  output: {
    path: path.resolve(__dirname, "../build"), // Pasta de saída
    filename: "bundle.min.js", // Nome do arquivo gerado
  },
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false, // Remove comentários
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Transpila o JS
        },
      },
      {
        test: [/\.vert$/, /\.frag$/], // Para shaders
        use: "raw-loader",
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i, // Para imagens e XML
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Limpa a pasta build antes de gerar os novos arquivos
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets", to: "assets" }, // Copia os arquivos de assets
      ],
    }),
    new webpack.DefinePlugin({
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true),
      "typeof EXPERIMENTAL": JSON.stringify(false),
      "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
      "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
      "typeof FEATURE_SOUND": JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html", // Certifique-se de que o HTML está na pasta src
      filename: "index.html", // Nome do arquivo gerado na pasta build
      inject: "body", // Garante que o script será injetado corretamente no final do body
    }),
  ],
};
