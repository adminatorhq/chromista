const url = require("@rollup/plugin-url");
const svgr = require("@svgr/rollup").default;
const postcss = require("rollup-plugin-postcss");

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        inject: false,
        extract: !!options.writeMeta,
      })
    );

    // config.plugins = [
    //   url(),
    //   svgr({
    //     // configure however you like, this is just an example
    //     ref: true,
    //     memo: true,
    //     svgoConfig: {
    //       plugins: [
    //         { removeViewBox: false },
    //         { removeAttrs: { attrs: 'g:(stroke|fill):((?!^none$).)*' } }
    //       ],
    //     },
    //   }),
    //   ...config.plugins,
    // ];

    return config;
  },
};
