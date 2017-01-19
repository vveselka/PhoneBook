module.exports = {
    entry: __dirname + "/src/app.js",
    output: {
      path: __dirname,
      filename: "bundle.js"
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            "add-module-exports"
          ],
        }
      }]
    },
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    },
};
