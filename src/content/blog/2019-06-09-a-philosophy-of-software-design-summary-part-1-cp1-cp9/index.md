---
title: "A Philosophy of Software Design - Summary Part 1 (CP1 -> CP9)"
date: "2019-06-09"
---

![Cover Image](./cover_image_philosophy.jpg)

As stated in my previous post,  this year I want to read a lot of Software related books, this is something I have not done enough and I think there is some much to learn from books. On that note, this post is about A Philosophy of Software Design by John Ousterhout.

This book is about one thing complexity, Ousterhout describes many ways to handle different types of complexity through the book. He discusses two general purposes approaches to fighting complexity.

1. Eliminate Complexity by making code simpler and more obvious
2. Encapsulate Complexity so programmers can work on the system without being exposed to everything. (Modular Design)

He defines complexity has: "Anything related to the structure of a software system that makes it hard to understand and modify the system" or another way "If a system is hard to understand and modify, it is complex"

Symptoms of Complexity

- Change Amplification - Simple change requires code modifications in many different places
- Cognitive Load -  Relates to how much a developer needs to know in order to complete a task.
- Unknown unknowns - That there is something you need to know, but there is no way for you to find out what it is, or even whether there is an issue.

The main way to fix these symptoms is by making the system obvious.

**Chapter 3 - Strategic vs Tactical Programming**

Tactical mindset is focusing on getting features working as quickly as possible, however, if you want good a good design, you must take time to produce a clean design and fix problems, this is the Strategic mindset.

A strategic mindset is one where just working code is not enough, your primary goal of every change you do is to produce a great design. "A strategic mindset requires an investment mindset, rather than taking the fastest path to finish your current project, you must invest time to improve the design of the system."

**Chapter 4 - Modules should be Deep**

Modular Design - A software system that is decomposed into a collection of modules that are relatively independent. The main goal of modular design is to minimize the dependencies between modules.

In order to minimize dependencies, we think of each module in two parts: an interface and the implementation.

- An interface consists of everything that a developer working in a different module must know in order to use the given module. Typically an interface describes what the module does not how it does it.
- The implementation consists of the code that carries out the promises made by the interface

Deep modules provide powerful functionality yet have simple interfaces. A shallow module is one with a relatively complex interface, but not much functionality. e.g It doesn't hide complexity.

**Chapter 5 - Information Hiding**

The most important technique for achieving deep modules is information hiding. The information that is hidden within a module usually consists of details about how to implement some details such as how exactly files are stored or how JSON docs are parsed.

Information hiding reduces complexity in two ways. First, it simplifies the interface to the module. The interface reflects a simpler, more abstract view of the module's functionality and hides the details.

When designing a new module you should think carefully about what information can be hidden in that module. The more you are able to hide, the simpler the interface to that module can become.

The opposite of information hiding is information leakage, information leakage occurs when a design decision is reflected in multiple modules. In other words, a change to one places causes changes in many other files and places.

**Chapter 6 - General Purposes Modules are Deeper**

Modules should be implemented in "somewhat general purpose fashion". The phrase "somewhat general purpose fashion" means that that the module's functionality should reflect your current needs, but its interface should not. The interface should be general enough to support multiple uses.

Questions to ask yourself when designing/implementing a new module to help find the right balance.

- **What is the simplest interface that will cover all my current needs**? If you reduce the number of methods in an API without reducing its overall capabilities then you are probably creating more general-purpose methods.
- **In how many situations will this method be used? **If a method designed for one particular use, that is a red flag that it may be too special-purpose. Instead, replace several-purposes methods with a single general-purpose method.
- **Is this API easy to use for my current needs? **

**Chapter 7 - Different Layer, Different Abstraction**

Software systems are composed of layers, higher layers use the facilities provided by lower layers. If a system contains adjacent layers with similar abstractions, this is a red flag that suggests a problem with the class decomposition.

Pass-through methods - As pass-through methods are one that does little except invoke another method, whose signature is similar or identical to that of the calling method.

Interface vs Implementation - Another application of the "different layer, different abstraction" rule is that the interface for a class should normally be different from its implementation. If you have two similar abstractions, then the class probably isn't very deep.

**Chapter 8 - Pull Complexity Downwards**

It is important for a module to have a simple interface rather than a simple implementation. It can be tempting to push the complexity off to the users of the module. Approaches like this will make your life easier in the short term, but they amplify complexity, as now all the users of your module need to deal with it.

The author gives configuration parameters as an example of moving complexity upwards instead of down. While configuration parameters give the users the ability to customize the settings for their environment it also amplifies complexity, thus he says you should avoid configuration parameters as much as possible. Before you expose a configuration parameter ask yourself, will users be able to determine a better value than we can determine right here right now?

In conclusion look for opportunities to take a little bit of suffering upon yourself in order to reduce the suffering of your users.

**Chapter 9 - Better Together or Better Apart?**

When deciding whether to combine or separate modules, whatever option reduces the complexity of the system as a whole should be done. The author argues while separating modules might make sense there are a few downsides:

- Complexity can come from just the number of modules, making it harder to keep track of them.
- Subdivision can result in additional code to manage the components.
- Developers will end up flipping back and forth between component when working on them together.

The author says under the following circumstances modules should be brought together:

1. Bring together if the information is shared.
2. Bring together if it will simplify the interface.
3. Bring together to eliminate duplication.

"Red Flag: If the same piece of code (or code that is almost the same) appears over and over again, that's a red flag that you haven't found the right abstractions"

The decision to split or join modules should be based on complexity. Pick the structure that results in the best information hiding, the fewest dependencies, and the deepest interfaces.

This post is getting long enough so the rest of the summary will be continued next week!.
