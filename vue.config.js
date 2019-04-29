module.exports = {
  lintOnSave: false,
  publicPath:'/jsdayexc-mng/dist/',
  devServer: {
    proxy:{
      '/jsdayexc-mng/dist/api': {
        target: 'http://118.190.154.11:3000/mock/62',
        changeOrigin: true,
        pathRewrite: { '^/jsdayexc-mng/dist/api': '' },
      },
    }
    // proxy: 'http://118.190.154.11:3000/mock/62',
    // proxy: {
    //   "/": {
    //     target: "http://58.38.154.96:8088/jsdayexc-api",
    //     onProxyRes: function(proxyRes, req, res) {
    //       var cookies = proxyRes.headers["set-cookie"];
    //       var cookieRegex = /Path=\/jsdayexc-api/i;
    //       //修改cookie Path
    //       if (cookies) {
    //         var newCookie = cookies.map(function(cookie) {
    //           if (cookieRegex.test(cookie)) {
    //             return cookie.replace(cookieRegex, "Path=/");
    //           }
    //           return cookie;
    //         });
    //         //修改cookie path
    //         delete proxyRes.headers["set-cookie"];
    //         proxyRes.headers["set-cookie"] = newCookie;
    //       }
    //     }
    //   }
    // }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          green: "#1ABC9C"
        }
      }
    }
  }
};
