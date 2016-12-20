module.exports = {
    entry: __dirname + "/app.js",
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
          presets: ['react']
        }
      }]
    },
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    },
};
