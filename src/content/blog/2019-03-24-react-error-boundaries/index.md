---
title: "React Error Boundaries: Creating a Simple App Crash screen"
date: "2019-03-24"
---

![Cover Image](./cover_image.jpg)

Welcome, today I am going to be discussing React Error Boundaries and how you can use them to create a very simple App Crash screen.

## What are Error Boundaries?

"React 16 introduces a new concept of an “error boundary”. Error boundaries are React components that **catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI** instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them." - React Docs

If you have ever used a try catch block for async code in Javascript then you can think of Error boundaries/a try-catch for components.

## Creating an Error Boundary

Now that we know what an error boundary is, let create one. The first thing to note is "Only class components can be error boundaries" even though there is excitement around Hooks (i.e classless stateful components) if you need an error boundary in your application it will need to be a Class component. (This example is taken mostly from the React Blog post but I added a few comments).

<iframe style="width: 100%; height: 500px; border: 0; border-radius: 4px; overflow: hidden;" src="https://codesandbox.io/embed/4zrjzw47nw?fontsize=14&amp;module=%2Fsrc%2FErrorBoundary.tsx&amp;view=editor" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Creating an Error Boundary component gives us the ability to use it anywhere in our application. You use an Error Boundary by wrapping it around a component:

<iframe style="width: 100%; height: 500px; border: 0; border-radius: 4px; overflow: hidden;" src="https://codesandbox.io/embed/4zrjzw47nw?fontsize=14&amp;view=editor" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

One thing to note: "Error boundaries only catch errors in the components below them in the tree." meaning if you have bad js in the error boundary itself it won't catch it but it will catch anything in the child component tree. So for our example above this will catch any errors that application with our entire Application (As is the entry point).

As stated above you can wrap it around any component, most people will have an Error Boundary wrapping their component that way if any error happens anywhere in your app it can be captured and logged. While this will be primarily the main way people will use an ErrorBoundary it not limited to this, you could also just wrap an experimental component providing some extra safety.

## Creating a Simple App Crash screen

Now we know what an Error Boundary is and how to create and use one let's make a Simple App Crash Screen that can be used/reused across many of your apps. (This is the power of component-based frameworks like React).

<iframe style="width: 100%; height: 500px; border: 0; border-radius: 4px; overflow: hidden;" src="https://codesandbox.io/embed/4zrjzw47nw?fontsize=14&amp;module=%2Fsrc%2FErrorBoundary.tsx" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

In ErrorBoundary.tsx and styles.css, I have code to produce the modal that is showing above. I have also added some code in index.tsx to make the app crash and show the ErrorBoundary screen. This is a very simple example but it is much cleaner than showing your users the default React Crash screen. You could also add a link to this page so they can reload the application. Take the example I have here and go play with it to create your own crash screen.

I hope you enjoyed learning about Error Boundaries and building this simple App crash screen, While the example I have built is very simple, you can easily expand on it and create a much more feature rich crash screen and as stated above the great thing is you can import it and use it in any of your projects.

Until next time.
