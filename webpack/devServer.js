module.exports = function () {
  return {
    devServer: {
      static: './dist',
      port: 8081,
      open: '/index.html',
      hot: false,
    },
  };
};
