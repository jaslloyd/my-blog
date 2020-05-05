---
title: "Monorepo: Yarn Workspaces"
date: "2020-05-XX"
description: "Monorepo what the hell are they?"
---

Monorepos are becoming more and more popular, if you do not know what a monorepo is...I think of it as simply have all your code for a particular project in the same repository, this includes backend, frontend and even infra code if needed. The term monorepo means different things to different people and you will find many definitions around the web but in the simplest terms if is having the code in one place. They are used in some very popular projects such as:

[create-react-app](https://github.com/facebook/create-react-app)

[reach-ui](https://github.com/reach/reach-ui)

Companies such as Facebook and google have also been [very public](https://medium.com/@maoberlehner/monorepos-in-the-wild-33c6eb246cb9) about using monorepos. Facebook practically take this to the extremely approach of having one repo for the entire company, this means all developers check in their code to the same repo, they then heavily use tooling to automate a lot of CICD workflows.

What are the advantages of monorepos?

- All the code is together, meaning if your working on FE you can easily see the backend code you may be calling.
- If you make a change to the backend service that requires a FE change you can open a PR that does both. This gives reviewers a clear view of what is getting updated
- Library changes / updates can be rolled out to entire repo at once. Imagine you have a common library that is used in all your applications, when these applications are in separate repos managed by separate teams it can be hard to find all the coe that is calling it but when they are in the same monorepo you can see exactly who is using your library. You can also update all the code at once if you really wanted to.


Disadvantages

- Monorepo really complicated the deployment process, when you have separate repos you can easily control / tune them but when you are in a monorepo that is not always entirely possible. This is why any huge monorepos usually heavily use automation or scripts to handle this process.
- Onboarding developers to a monorepo can be overwhelming if they have not used it before. There is a lot of code, a lot of processes and a lot of automation around a big monorepo that leads to a difficult learning curve when onboarding.

These are only a few advantages and disadvantages, today I want to focus on getting started with a javascript based monorepo with the help of yarn workspaces.

## Monorepos in practice

There are many tools to help you manage your monorepo, two of the most popular (at the time of writing this) are: [yarn workspaces]() and [lerna](), they both do very similar things. lerna came before yarn workspaces, they both provide the same basic functionality which is manage dependencies between multiple packages / projects. lerna can use yarn workspaces under the hood to manage to dependencies but what lerna provides that workspaces doesn't is much more power of managing publishing packages to npm and automating update of them packages within your monorepo.

When to use workspaces and when to use lerna?

My suggestion is, start off with yarn workspaces and only when you need to worry about publishing to npm start looking at lerna. The great thing with this approach is, you won't need to make any changes to make lerna work with yarn workspaces you just need to add a simple property to the learn config file.

In this post I am going to focus on yarn workspaces, I will write another post on expanding this with lerna.

### Yarn workspaces

All the code for this post will be available [here](https://github.com/jaslloyd/monorepo). Lets get started:

1. Create a package.json file in the root of your directory
```json
{
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

- `private: true` is required for yarn workspaces, this setting will avoid us accidentally publishing the root repository, since we want each package/project to handle their own publishing this is required.
- `workspaces: [ "packages/*" ]` - This is telling yarn you want to use workspaces and pointing out which projects / folders should be considered a workspace. In this package.json I have said everything in the packages folder should be considered workspace. The way I have specified it here is not required but it seems to have emerged as a standard and most projects that use yarn workspaces have this.

2. Create a FE application using create-react-app inside the packages folder.
```sh
cd packages/
npx create-react-app fe1 --template typescript
```

3. Create a component library for our packages to use
Imagine this as being a common component library that may be used in multiple frontends in your monorepo.
We are going to use a boiler-plate generator to create a library template (Save us time).
```sh
cd packages/
npx create-react-library react-lib
```

4. Edit package.json in react-lib
```sh
{
    "name": "@monorepo/react-lib",
    "version": "1.0.0",
    ....
}
```

A common approach is to add a package identifier in front of your packages e.g in this case it is @monorepo. This means when using something from our react-lib we can do something like this:
`ìmport { ... } from '@monorepo/react-lib-v2'` which is really cool.

Inside `src/index.tsx` you will see an ExampleComponent we are going to import this inside our fe1 application we built earlier but before we do that we need to compile the library to JS. This is not strictly required but it is good practice and it means projects in your monorepo do not have to use typescript to consume your library. 

5. Run `yarn build` inside the `packages/react-lib` folder.

This will compile and generate a dist folder, there are then entires in package.json (main, module) which will look for files in that folder and fetch the necessary packages.

6. Inside `packages/fe1/src/App.tsx` import the ExampleComponent.
```jsx
import { ExampleComponent } from '@monorepo/react-lib';
```

7. Run `yarn build` inside packages/fe1 to generate your production build.

This is where the power of yarn comes in, yarn will see all the imports and dependencies you are using and neatly bundle them all up for you as you generate your production build.

8. Deploy or serve your production build wherever you want

You can now take that production build and deploy or host it wherever you want :).


### Using yarn workspaces commands to make things easier.



## Resources


## Conclusion
