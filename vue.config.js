module.exports = {
  productionSourceMap: true,
  
  publicPath: process.env.NODE_ENV === "production" ? `/${ process.env.REPOSITORY_NAME }` : "/",

  pwa: {
    name: "НГТ",
    themeColor: "white",
    msTileColor: "white",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    manifestOptions: {
      display: undefined
      // display_override: ["fullscreen", "window-controls-overlay"]
    }
  },

  pluginOptions: {
    i18n: {
      enableInSFC: true
    }
  }
};
