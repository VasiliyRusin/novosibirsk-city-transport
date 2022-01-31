module.exports = {
  productionSourceMap: true,

  css: {
    sourceMap: true,
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        prependData: `
          @charset "utf-8";
          
          @use "sass:map";
          @use "sass:list";
          @use "sass:math";
          @use "sass:meta";
          @use "sass:color";
          @use "sass:string";
          @use "sass:selector";
          
          @use "~@/scss/_variables.scss" as *;
        `
      }
    },
    
    // https://github.com/vuejs/vue-cli/issues/3771
    // Предупреждение о порядке файлов не существенно для vue. Из-за способа "контейнеризации" css в vue.
    extract: process.env.NODE_ENV === "production" ? {
      ignoreOrder: true
    } : false
  },

  pluginOptions: {
    i18n: {
      enableInSFC: true
    }
  },

  pwa: {
    themeColor: "#ffba41",
    msTileColor: "#ffffff"
  }
};
