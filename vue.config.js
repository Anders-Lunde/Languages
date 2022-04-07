//  vue.config.js
module.exports = {
  publicPath: "",

  configureWebpack: {
    module: {
      rules: [
        //This is no longer used. I just put the worklet .js in the public folder,
        //and load it from there instead.
        {
          test: /Worklet.js/, // <---- change this to match your filename conventions
          loader: "worklet-loader",
          options: {
            name: "js/[hash].worklet.js"
          }
        }
      ]
    }
  },

  /*
    module: {
      rules: [
        // ... other rules
        {
          test: /\.m4a$/,
          include: SRC,
          loader: "file-loader",
        }
      ]
    },

*/
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      const tmp = args[0];
      tmp.template = "src/index.html";
      //tmp.favicon = "src/assets/icons/favicon.ico";
      return args;
    });
    // raw-loader is for loading querys in .txt files
    config.module
      .rule("raw")
      .test(/\.m4a$/)
      .use("file-loader")
      .loader("file-loader")
      .end();
  },

  transpileDependencies: ["vuetify"]
};
