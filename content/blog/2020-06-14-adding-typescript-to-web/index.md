---
title: "Webpack - How to add Typescript and CSS support | Part 2"
date: "2020-06-14"
description: "This is part 2 of exploring the world of webpack, we are going to add typescript and css support, we are also going to learn about webpack plugins"
---

This is part 2 of our webpack tutorial, we are exploring building out our own webpack config file to better understand what some tools like create react app are doing under the hood. Today we are going to be discussing how to add typescript support to our sample application, we are also going to add support for importing css files like CRA does e.g `import './index.css'`

## Adding Typescript support to Webpack

I personally love Typescript, if you don't know what Typescript is your missing out, it is a super-set of JS that adds type safety to your code. If you are not interested in adding Typescript support to your application then you can skip to the next section.

As stated in previous tutorials, webpack only supports js and json files out of the box, in the last tutorial we added support for jsx files in this section of the tutorial we are going to add support for tsx files. Luckily babel-loader can also work with ts / tsx files, so we just need to add a typescript preset to help babel along, we also need to install typescript so open up your command line:

```sh
➜  cd webpack-tut
➜  npm install @babel/preset-typescript typescript --save-dev
```

Open up the webpack.config.js and add support for ts and tsx files:

```js
module.exports = {
  entry: "./src/index",
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js"],
  },
  module: {
    rules: [
      // Loader has two "required" properties, test & use/loader, test is used to identifer the files the specific loader should transform, in case below babel-loader should look at jsx files.
      {
        test: /\.(js|jsx|ts|tsx)$/,
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
    ],
  },
}
```

`extensions` - We have expanded the extensions array to now search for `.ts` and `.tsx` files
`rules/test` - We have updated the test regex to make sure `.ts` and `.tsx` files are picked up by the babel-loader as well as the js and jsx files from last tutorial.
`rules/options/presets` - We have updated the presets to now include the `@babel/preset-typescript`

That should be all that is required to add support for typescript and typescript jsx files, before we try it out we should probably add a tsconfig.json file. When you have a typescript project is is usually a good idea to have a tsconfig.json file. tsconfig.json just tells the typescript compiler what rules / configuration to use when checking the files for type errors. The great thing is, typescript has a cli util to help us with that so open up your command line:

````sh
```sh
➜  cd webpack-tut
➜  npx tsc --init
````

`tsc` - Is the typescript compiler, we are using npx so we don't have to install typescript globally.

Once that command is finished you should have a tsconfig.json file in the root of your repo, I am not going to go through each of the settings in there but just know it is good to have this in a typescript project.

Lets try compile our first typescript files, in the last tutorial we created App.jsx and index.js, lets rename them to App.tsx and index.tsx. Lets add some typescript to App.tsx to make sure it compiles:

```tsx
import React from "react"

const App = () => {
  const welcomeMessage: string = "Hello from React, Webpack and Typescript..."

  return (
    <div>
      <h1>{welcomeMessage}</h1>
    </div>
  )
}
export default App
```

We have added the `: string` type to the welcomeMessage - Note: This is kinda redundant since we assign it directly to a string but I just want to sure this is compiling. Now lets run our build command

```sh
➜  npm run build
```

After it runs successful, we can serve the public folder like we did in the last tutorial `npx serve public`, open http://localhost:5000
![Typescript + Webpack](./images/typeScriptAndWebpack.png)

Excellent we have added support for Typescript, lets move on and add support for css files

## Adding CSS support to Webpack

## Better development workflow

## Conclusion
