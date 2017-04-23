var elixir = require("laravel-elixir");
require("laravel-elixir-webpack-official");
// require("laravel-elixir-webpack-advanced");


//
// new webpack.DefinePlugin({
//   "process.env": {s
//     NODE_ENV: JSON.stringify("production")
//   }
// })


elixir.config.css.autoprefix = {
  enabled: true, //default, this is only here so you know how to disable
  options: {
    cascade: true,
    browsers: ['last 15 versions', '> 1%']
  }
};

elixir.config.production = true;

elixir(function (mix) {
  mix.less("app.less");
});

elixir(function (mix) {
  mix.copy("node_modules/bootstrap-sass/assets/fonts/bootstrap", "public/fonts/bootstrap");
  mix.copy("node_modules/bootstrap-sass/assets/fonts/bootstrap", "public/fonts/bootstrap");
  mix.copy("resources/assets/fonts", "public/fonts");
});

Elixir.webpack.mergeConfig({
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: [
            "react",
            "es2015",
            "stage-1",
            "decorators-legacy",
          ]
        }
      },
      {
        include: /\.json$/, loaders: ["json-loader"]
      },
      {
        include: /\.css$/, loaders: ["css-loader"]
      }
    ],
    plugins: []
  }
});

elixir(function (mix) {
  mix.webpack('app.jsx');
}, "public/js/app.js")

elixir(function (mix) {
  mix.version("css/app.css");
});

elixir(function (mix) {
  mix.browserSync({
    proxy: 'metes.app'
  });
});

// var gulp = require('gulp');
// // gutil    = require('gulp-util'),
// // uglify  = require('gulp-uglify'),
// // concat  = require('gulp-concat');
// var webpack = require('webpack');
//
// gulp.task('meh', function () {
//   console.log("meh");
// });

// var config = {
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel', // 'babel-loader' is also a legal name to reference
//         query: {
//           presets: [
//             "react",
//             "es2015",
//             "stage-1",
//             "decorators-legacy",
//           ]
//         }
//       }
//     ]
//   }
// };

// elixir(function (mix) {
//   // mix.version("css/app.css");
//   console.log("meh from elixir");
// });