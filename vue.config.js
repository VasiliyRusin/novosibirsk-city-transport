module.exports = {
  productionSourceMap: true,
  
  publicPath: process.env.NODE_ENV === "production" ? `/${ process.env.REPOSITORY_NAME }` : "/",

  pluginOptions: {
    i18n: {
      enableInSFC: true
    }
  }
};
