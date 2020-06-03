---
title: "Webpack - Make our webpack config production ready | Part 3"
date: "2020-06-21"
description: "Last part of our exploring webpack tutorial, in this tutorial we will make our webpack config config more production ready"
---

This is part 3 of our webpack tutorial, we are exploring building out our own webpack config file to better understand what some tools like create react app are doing under the hood. Today we are going to making our webpack config more production ready. Lets get started.

## Webpack Modes

There are two webpack concepts left to discuss one of them being modes:

> Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.

You may have noticed in our application so far when we ran `npm run build` you would see this warning:

> WARNING in configuration
> The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
> You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

This mode value has a default production but it has two other options development | none, most of the time you will be using 'production' | 'development the differences can be seen [here](https://webpack.js.org/configuration/mode/). The important thing to know is when in development mode, it allows for easier debugging by enabling things like NamedChunksPlugin, avoid minification etc, by setting mode to production webpack does it best opt you into all the optimizations you can do.

During local development we want webpack to stay in development mode, when we build out application we want webpack to use all the optimizations so how can we have best of both worlds...ENV variables. Webpack supports specifying environment variables via flags to the webpack command so lets update our npm scripts to pass the correct flags:

```js{3-4}
// ...
  "scripts": {
    "start": "webpack-dev-server --open --env.development",
    "build": "webpack --env.production",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
// ..
```

- We pass env.development when we run `npm start`
- We pass env.production when we run `npm build`

Now that we passing environment flags to webpack, we need to update our webpack.config.js to read the environment flags:

```js{4-5}
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => ({
  mode: env.development ? "development" : "production"
  entry: "./src/index",
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    filename: "[name].bundle.js",
  },
  devServer: {
    contentBase: "./dist",
    port: "3001",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js"],
  },
  module: {
    rules: [
      // Loader has two "required" properties, test & use/loader, test is used to identifer the files the specific loader should transform, in case below babel-loader should look at jsx files.
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
        // Options for the plugin
        options: {
          presets: [
            require.resolve("@babel/preset-react"),
            require.resolve("@babel/preset-typescript"),
          ],
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
});
```

You can see the `module.exports` has slightly changed to now to a function that accept a parameter which is env / enviroment variables that webpack cli passes to webpack. On the next line we check if the environment is development if it is use development mode else use production. The reason why we did it this way as we don't want to forget to to pass in --env.production flag and have a development build go out to our users so it acts as a nice default.

Since webpack production mode tries it best to optimize the build it automatically includes Minification of the code which is great for smaller bundle sizes. You can customize this behavior if you want to but for us the defaults are fine. More information on alternatives can be found [here](https://webpack.js.org/guides/production/#minification)

Webpack will automatically minify our js and html files, the one file it won't do is the CSS files so lets do that now.

### CSS Minifcation

We are going to need to add another plugin to help webpack minify our CSS files, open your command line and run `npm install optimize-css-assets-webpack-plugin --save-dev`. We then need to update webpack to use the CSS minifier:

```js{18-20}
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = (env) => ({
  mode: env.development ? "development" : "production",
  entry: "./src/index",
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    filename: "[name].bundle.js",
  },
  devServer: {
    contentBase: "./dist",
    port: "3001",
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js"],
  },
  module: {
    rules: [
      // Loader has two "required" properties, test & use/loader, test is used to identifer the files the specific loader should transform, in case below babel-loader should look at jsx files.
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
        // Options for the plugin
        options: {
          presets: [
            require.resolve("@babel/preset-react"),
            require.resolve("@babel/preset-typescript"),
          ],
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
})
```

- `optimization/minimizer` has been updated to include OptimizeCSSAssetsPlugin which will minify the CSS, we also need to make sure TerserJSPlugin is there to make sure we still minify our js and html files.

Run `npm run build`, open up public/main.css bundled file and you should see the css has been minified...awesome!. Lets get onto the next improvement.

## Webpack Source Maps

Awesome, we now have a minified the production bundles of our application however there is one downside to do this minification and that it makes is extremely hard to debug in your browser because everything is minified so it can hard to find and place breakpoints on the lines you need to debug in production well this is where source maps come in.
// source maps

// Switching from public to build like CRA
// Code Splitting, hashing and other techniques
// Clean our build folder
// Challenge Review CRA : https://github.com/facebook/create-react-app/blob/c87ab79559e98a5dae2cd0b02477c38ff6113e6a/packages/react-scripts/config/webpack.config.js
// Alternatives, tools (https://createapp.dev/) and resources
// Conclusion
