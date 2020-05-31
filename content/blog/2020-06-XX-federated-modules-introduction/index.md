---
title: "Federated Modules Introduction"
date: "2020-06-XX"
description: "Webpack 5 Introduces Module Federation, going to explain the what and why"
---

Module Federation allows a JavaScript application to dynamically load code from another application. This allows the sharing of dependencies, e,g React components, lodash or even helper functions. The cool thing is if an application consuming one of federated modules does not have that dependency webpack will automatically download it. This will come has a feature in Webpack 5.

## Terminology

- Module Federation - ???
- A Host - Webpack build that is initialized during a page load i.e Often consuming other (remote) modules.
- A Remote - Another Webpack build being consumed by a Host. i.e Being consumed by a Host(s)
- Bidirectional-hosts - A webpack build that works as a host and a remote.

## Example

We are going to be using a nice start template from [Jack Herrington](https://github.com/module-federation) available [here](https://github.com/jherr/wp5-intro-video-code). It is a nice simple example that contains:

- Home Page - It will consume from other remotes (nav) and expose functionality to be used by other applications.
- Navigation Bar - It will only exposes code (Navigation Bar) it won't consume other Modules.
- Search Page - It will consume from more than one remote (Nav, Home) and won't expose anything.

### Module Federation Setup

Lets open the webpack.config.js file for nav:

```js
  // Rest of Webpack Config here...
  plugins: [
    new ModuleFederationPlugin({
      // Unique Identifier for the module, will be used for import .... from [name]
      name: "nav",
      // TBA
      library: { type: "var", name: "nav" },
      // Entry point file name when fetching the federated module (This will be usually linked in <script> tag in application consuming this module)
      filename: "remoteEntry.js",
      // Other 'remote' that this module pulls from
      remotes: {},
      // List of files it exposes, i.e Things can be imported and used in other hosts or remotes
      exposes: {
        Header: "./src/Header",
      },
      // Dependencies to be shared to the hosts consuming this.
      shared: ["react", "react-dom", "@material-ui/core", "@material-ui/icons"],
    }),
   // Other webpack plugins
```

I have added a comment to each line to help with the configuration options the most important for this tutorial are:

- `remotes` - List of other Federated Modules this Nav module depends on, if you are importing from any other federated module it will be need to populated here.
- `exposes` - List of components, files or general exports you want to be exposed to other Federated modules.
- `shared` - List of Dependencies that you will share with the Modules consuming this application. Because nav depends on react and material-ui we want to expose that to the other federated modules.

In this Nav example above we do not depend on any other remotes at the moment but we do expose a Header component to be consumed by other Federated Modules.

Now that we have looked at the Navigation example lets look at a an application that consumes the nav remote...e.g the Homepage

```js home/webpack.config.js
    // Rest of Webpack Config here...
    new ModuleFederationPlugin({
      name: 'home',
      library: { type: 'var', name: 'home' },
      filename: 'remoteEntry.js',
      remotes: {
        nav: 'nav'
      },
      exposes: {},
      shared: ['react', 'react-dom', '@material-ui/core', '@material-ui/icons']
    }),
```

The important part is `remotes`, you can see Home is consuming the navigation/nav federated module and anything that is exported from that is available for important. Adding the remote to the webpack config is the first step, next we have to include the url to remoteEntry file so webpack can download that remote:

```html home/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="http://localhost:3003/remoteEntry.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

You can see the script tag in the head, at the moment all these modules are local but they don't have to be (They could be sitting on an AWS or Blob storage). In nav webpack.config.js we specified it to run on port 3003 and we also specified the fileName for ModuleFederationPlugin as remoteEntry so the script src is "http://localhost:3003/remoteEntry.js". Now that webpack can access the remote module the final step is using it:

Consuming the exposed Header component from Nav is as simple as importing it and using it

```jsx App.jsx
// Other imports
import Header from "nav/Header"

function App() {
  return (
    // ....
    <Header />
    // ...
  )
}
```

Reload http://localhost:3001/ and you should now see the new Header component being served from the Navigation federated module. The really cool thing is, if you update the Header component in Nav you should see the changes right away!
[insert image]

Now that we have a good idea of how to use Federated module lets try out exposing a component ourselves.

### DIY Exposing the ProductCarousel component

Earlier I said while home is not exposing anything at the moment we were going to change that. Home has a ProductCarousel component that we would like to use inside our search application so lets do that.

1. Expose the ProductCarousel component inside home/webpack.config.js
   ```js home/webpack.config.js
    // Rest of Webpack Config here...
    new ModuleFederationPlugin({
      name: 'home',
      library: { type: 'var', name: 'home' },
      filename: 'remoteEntry.js',
      remotes: {
        nav: 'nav'
      },
      exposes: {
          ProductCarousel: './src/ProductCarousel'
      },
      shared: ['react', 'react-dom', '@material-ui/core', '@material-ui/icons']
    }),
   ```

Notice the `exposes` object we are now exposing the ProductCarousel component.

2. Update search/webpack.config.js to include the new remote of home
   ```js search/webpack.config.js
    // Rest of Webpack Config here...
    new ModuleFederationPlugin({
      name: "search",
      library: { type: "var", name: "search" },
      filename: "remoteEntry.js",
      remotes: {
        nav: "nav",
        home: "home",
      },
      exposes: {},
      shared: ["react", "react-dom", "@material-ui/core", "@material-ui/icons"],
    }),
   ```

The `remotes` object has been updated to include the home remote module. This will allow us to use anything home exposes i.e the ProductCarousel.

3. Update search/public/index.html to include the script tag to point to remoteEntry of home.

```html search/public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- home Remote -->
    <script src="http://localhost:3001/remoteEntry.js"></script>
    <!-- nav Remote -->
    <script src="http://localhost:3003/remoteEntry.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

4. The home remote runs on port 3001 so we add the correct script tag for that. The last step is using the ProductCarousel component.

```jsx search/App.tsx
// Rest of file here ...
// Import ProductCarousel from the home remote
import ProductCarousel from "home/ProductCarousel"

function App() {
  return (
    <Container fixed>
      <CssBaseline />
      <Header />
      <Typography variant="h3">Search Page</Typography>
      {/* Using the ProductCarousel component from home remote */}
      <ProductCarousel />
    </Container>
  )
}
```

Voila check in our browser:
[insert screenshot]

### TLDR Reminder on How to Consume from a Remote:

1. Add the name of the remote to the remotes array in the ModuleFederationPlugin entry in the webpack.config.js file.
2. Add a remoteEntry in index.html
3. Reboot webpack
4. Import Stuff exposed from Remote.
5. Profit.

## Conclusion

I hope you enjoyed this post on Federated Modules, I am really excited for the future of Webpack and federated modules, I recently got into Monorepos, Micro Front-ends and there doesn't seems to be much in the way of standards, there are lots of tools and solutions out there for kinda doing these things but they are kinda quirky. I loved seeing that this solution will be baked into Webpack 5, I plan on using it in a few future project to experiment more with it! so you may see more posts from me about it!

Until next time
Jason

p.s See FAQ, alternatives and Further reading resources below

## Questions / FAQ

Q. What is the bootstrap.tsx file?
A.

Q. Does this work with server side rendering?
A. Yes it does! which is the cool thing, an example can be found [here](...)

Q. What are the Alternatives to Federated Modules
A. INSERT link to Alternatives to Federated Modules

Q.
A.

## Alternatives to Federated Modules

- Using a Micro FE framework like SingleSpa
- Publishing common code to NPM.
- Using an ESI (Edge side includes) where bundle is hosted on a remote server and fetched before being served to the user.

## Further Reading

[Creator Article](https://medium.com/swlh/webpack-5-module-federation-a-game-changer-to-javascript-architecture-bcdd30e02669)
[Jack Herrington Example](https://www.youtube.com/watch?v=D3XYAx30CNc)
[More Examples](https://github.com/module-federation)
