---
title: "Federated Modules"
date: "2020-06-XX"
description: "Webpack 5 Introduces Module Federation, going to explain the what and why"
---

Module Federation allows a JavaScript application to dynamically load code from another application. This allows the sharing of dependencies, e,g React versions, lodash or even helper functions. The cool thing is if an application consuming one of federated modules does not have that dependency webpack will automatically download it. This will come has a feature in Webpack 5.

## Terminology

- Module Federation - ???
- A Host - Webpack build that is initialized during a page load i.e Often consuming other (remote) modules.
- A Remote - Another Webpack build being consumed by a Host. i.e Being consumed by a Host(s)
- Bidirectional-hosts - A webpack build that works as a host and a remote.

## Example

We are going to be using a nice start template from [Jack Herrington](https://github.com/module-federation) available [here](https://github.com/jherr/wp5-intro-video-code). It is a nice simple example that contains:

- Home Page - It will consume from other remotes (nav) and expose Modules to be used by other.
- Navigation Bar - It will only exposes components (Navigation Bar) it doesn't consume other Modules
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
      // Modules to be shared to the hosts consuming this.
      shared: ["react", "react-dom", "@material-ui/core", "@material-ui/icons"],
    }),
   // Other webpack plugins
```

I have added a comment to each line to help with the configuration options the most important for this tutorial are:

- `remotes` - List of other Federated Module this Nav module depends on, if you are importing from any other federated module it will be need to populated here.
- `exposes` - List of components, files or general exports you want to be exposed to other Federated modules
- `shared` - List of Dependencies that you will share with the Modules consuming this application. Because the nav depends on react and material we want to expose that to the other federated modules being used so they don't need their own copy otherwise the consuming module would need to have that dependency already.

In this Nav example we do not depend on any other remotes at the moment but we do expose a Header component to be consumed by other Federated Modules. We also shares the dependencies we use.

Now that we have looked at the Navigation example lets look at a an application that consumes that...e.g the Homepage

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

The important part is `remotes`, you can see Home is consuming the navigation/nav federated module and anything that is exported from that is available. It will also expose a component later on...

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

You can see the script tag in the head, at the moment all these modules are local but they don't have to be. In nav webpack.config.js we specified it to run on port 3003 and we also specified the fileName for ModuleFederationPlugin as remoteEntry so the script src is"http://localhost:3003/remoteEntry.js"

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

Now that we have a good idea of how to use Federated module lets expose

### TLDR; How to Consume from a Remote:

1. Add a remoteEntry in index.html
2. Add the name of the remote to the remotes array in the ModuleFederationPlugin entry in the webpack.config.js file.
3. Reboot webpack
4. Import Stuff exposed from Remote.
5. Profit.

## Alternatives

- Using a Micro FE framework like SingleSpa
- Publishing common code to NPM.
- Using an ESI (Edge side includes) where bundle is hosted on a remote server and fetched before being served to the user.

## Further Reading

[Creator Article](https://medium.com/swlh/webpack-5-module-federation-a-game-changer-to-javascript-architecture-bcdd30e02669)
[Jack Herrington Example](https://www.youtube.com/watch?v=D3XYAx30CNc)
[More Examples](https://github.com/module-federation)
