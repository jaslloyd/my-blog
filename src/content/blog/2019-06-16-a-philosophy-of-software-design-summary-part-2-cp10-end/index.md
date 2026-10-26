---
title: "A Philosophy of Software Design - Summary Part 2 (CP10 -> End)"
date: "2019-06-16"
---

![Cover Image](../2019-06-09-a-philosophy-of-software-design-summary-part-1-cp1-cp9/cover_image_philosophy.jpg)

Welcome back, this post is a continuation from last week post summarizing Chapter 1 to Chapter 9 of  A Philosophy of Software Design

**Chapter 10 - Define Errors Out of Existence**

"Exception handling is one of the worst sources of complexity in software systems". Dealing with special conditions is inherently harder to write than code that deals with normal cases. The author says the key to doing this is to reduce the number of places where exceptions must be handled.  Techniques for reducing the number of exception handlers:

- Define errors out of existence - i.e: Have no exceptions to handle. This may seem hard in practice but with thoughtful consideration, you can reduce the number of exceptions that need to be handled e.g reducing null checks by pre-allocation a variable, avoid key not found errors in a map by expressing all the possible keys and starting with that. Document.removeEventlistener does this in JS, if you call it with a listener that hasn't been added it won't do anything avoiding unnecessary checks for the user of that function.
- Mask Exceptions - Handle exceptional conditions at lower levels of the code so higher levels of software are not even aware of the situation.
- Exception Aggregation - Handling many exceptions with a single piece of code. Rather than writing distinct handlers for individual exceptions, handle them all in one place.
- Just crash - In most applications, there will be certain errors that is not worth trying to handle. Usually, they are impossible to handle and don't occur very often.

Design special cases out of existence - special cases can result in code that is riddled with if statements, which make the code hard to understand and lead to bugs. The best to remove special cases is by designing the normal case in a way that automatically handles the special cases without any extra code.

While defining exceptions away is great you can go too far says the author, the important thing do not hide or fail silently if a module using your code would need to know about that error to do something. Define what errors are important in your application.

**Chapter 11 - Design it Twice**

Designing software is hard, so it's unlikely that your first thoughts about how to structure a module or system will produce the best design. You will end up with a much better design if you consider multiple options for each major design decisions. As you come up with many designs try to pick approaches that are radically different from each other; you'll learn more that way. The advantage of "design it twice" is that not only does it allow you to see all the alternative designs to your problem you also improve your design skills.

**Chapter 12 - Why Write Comments? The four Excuses**

Ousterhout says Documentation plays a crucial role in software design. Comments are essential to help developers understand a system and work efficiently. He argues that if comments are done correctly it will improve a system's design. This goes against the view that most developers and code is. Most code is not commented, most developers argue that code is self-documenting. He goes on to argue against the main points developers bring up against writing comments (which I won't go through here). I want to focus on what he says is the main idea behind comments "...the main idea behind comments is to capture information that was in the mind of the designer but couldn't be represented in the code"

**Chapter 13 - Comments should describe things that are not obvious from the code**

Well as stated in the title - "Comments should describe things that are not obvious from the code".

"Developers should be able to understand the abstraction provided by a module without reading any code other than what is externally visible". When introducing comments in your code there are a few general guidelines that should be followed:

- Pick a convention, agree with your team on a convention if one doesn't exist. Pick a convention for documenting functions, classes modules etc.
- Don't repeat the code - This makes a comment bad if you're just stating exactly what the code is saying. Only comment on things that are not obvious.
- Abstractions should be commented but they should focus on the abstraction, not the implementation. Comments should focus on how to use it not what it is doing.

**Chapter 14 - Choosing names**

Selecting names for variables, methods and other entities is one of the most underrated aspects of software design. Good names are a form of documentation. When choosing a name, try to create an image in the mind of the reader without making the name unwieldy to read. A good rule of thumb for a name should be two to three words, a good name is precise and consistent.

Red Flag: Avoid vague names, if a name is broad enough to refer to many different things then it is not useful to the developer and will likely cause misuse of the variable.

Red Flag: If it is hard to find a simple name for a variable that usually means the design isn't clean or you haven't found the right abstraction.

**Chapter 15 - Write The comments First**

Since many developers put off writing documentation until the end, Ousterhout suggests that instead "write comment first and use it as part of the design process". He argues that doing this up front negates the problems with adding comments in later/after the code is done. When creating a new class, module, function method etc try doing it up front.

**Chapter 16 - Modifying Existing Code**

Modifying existing code is something we do every day as developers. A lot of developers take the approach of what is the smallest change I can make so it does what I need. This is a tactical mindset instead of taking the strategic mindset, a strategic mindset is instead improving the system a with every change you make. Ousterhout says that "Ideally when you have finished with each change, the system will have the structure it would if you had designed it from the start". To do this you must resist the temptation to make a quick fix. If you are not making the design better, you are probably making it worse.

Comments should be kept near the code and it should be updated to reflect the changes you are making, there is nothing more annoying than a wrong or out of date comment.

**Chapter 17 - Consistency**

Consistency reduces mistakes, without consistency developers must learn about how to handle each situation in the codebase. The advantage of a consistent code base is once you learn something in one place, you can use that knowledge to immediately understand other places that use the same approach.

Examples of Consistency

Variable names, coding style (prettier), interfaces and design patterns.

Ensuring Consistency

Document - "Have a document that lists the most important overall conventions such as coding guidelines."  - I agree with this but you should use tools to avoid having external documents from the code. Documents relating to the codebase should be kept close to the code base.

Enforce - Documents can be easy to forget and hard to find, this is why it is important to Enforce/automate that checks for your team style on a Pull Request and either automatically fixes them if capable or rejects the PR. This removes the cognitive load from other developers on the team reviewing the PR while also allowing simple knick picking stuff to pointed out by the tool instead of another developer.

When in Rome - "The most important convention of all is that every developer should follow the old adage "When in Rome, do as the Romans do" - Meaning when you see anything that may look like a convention follow it.

"Don't change existing conventions - Resist the urge to improve on existing conventions." - If you see a better way, open a discussion with your team, is the work of changing to the new convention really worth all the effort when compared to the old one. If it does and your team agrees then do it 100% of the way, don't have a mix of the old and new convention. If you introduce a new convention the old convention should have no trace left in the codebase.

**Chapter 18 - Code should be Obvious**

Choosing Good names - Having good names for variables, functions classes etc reduces the cognitive load of developers looking at the code. Many times with good names a developer look at a piece of code and know what it is doing means the code is obvious.

Use whitespace

Comments where the code is not obvious. (nonobvious code is unavoidable)

"Software should be designed for ease of reading, not ease of writing"

Ousterhout ends the book with two chapters one about software trends and designing for performance. None which I taught was needed for this summary.
