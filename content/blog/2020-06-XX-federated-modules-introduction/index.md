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

## Alternatives

- Using a Micro FE framework like SingleSpa
- Publishing common code to NPM.
- Using an ESI (Edge side includes) where bundle is hosted on a remote server and fetched before being served to the user.

## Further Reading

[Creator Article](https://medium.com/swlh/webpack-5-module-federation-a-game-changer-to-javascript-architecture-bcdd30e02669)
[Jack Herrington Example](https://www.youtube.com/watch?v=D3XYAx30CNc)
