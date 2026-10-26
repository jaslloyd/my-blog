---
title: "Accessibility: Semantic HTML"
date: "2019-11-10"
description: First post of a series on Web accessibility where I discuss Semantic HTML. I give examples of what is and what is not Semantic HTML.
---

![Cover image](./cover_image.png)

Welcome back guys, I am going to be starting a new mini-series of blog posts on Accessibility. I have been trying to learn more about accessibility and making my applications more accessible. I want to share what I learned and give some helpful links about accessibility.

# Semantic HTML

When you read about accessibility on the web you will hear everybody mention that you should use semantic HTML, "making websites accessible start with using semantic HTML" so what does this actually mean? The good news is you have already been using Semantic HTML, every time you use heading tags, paragraph tags, section or many more you are using "Semantic HTML".

Semantic HTML introduces meaning to the web page rather than just presentation. A simple example is a <p> tag, it indicates that the enclosed text is a paragraph, or an h1 tag indicates the main heading for this page.

## Examples of Semantic HTML tags

- `<section>` - A section of a document, it is a grouping of content usually with a heading.
- `<article>` - Independent, self container element, e.g Blog post, Newspaper Article etc.
- `<nav>` - Defines a set of navigation links
- `<header>` - Specifics a header for a document or a section. Usually, a container for introductory content, note you can have more than one header in a document.
- `<footer>` - Again similar to `<header>` and you can have more than one in a document.
- `<aside>` - Defines content aside the main content, like a sidebar or menu.
- `<figure>` and `<figcaption>` - The purpose of a figure caption is to add visual explanation to an image.
- Many more like `<p>`, `<button>`...explained here: https://www.w3schools.com/html/html5\_semantic\_elements.asp

### Lesser-Known Semantic HTML tags

- `<mark>` - Used for highlighting text
- `<time>` - Defines a date/time
- `<address>` - Associate contact/address information.
- `<abbr>` - Defines an abbreviation or acronym. Used with a title property.

## What tags are not Semantic HTML tags?

A tag that only impacts style are not Semantic HTML, tags such as `<b>`, `<strong>` and `<i>` are not semantic. However, you might think that `<em>` would not be semantic HTML but it is because it means this text should be emphasized i.e giving the text more meaning.

`<div>` - is not a semantic HTML element because a div is just a generic grouping element, it tells the browser nothing about its content.

`<span>` is not a semantic HTML element because it just describes how to display the element e.g inline and it also tells the browser nothing about its content.

## Using the correct HTML Tags

- Always use a `<button>` for a button, do not use a div or a link and style it like a button. Just use the button element, it gives you accessibility.
- Use a link (`<a>`) for changing a page or bringing the user somewhere else, you should never use a button\* and redirect using JS, just use a link.
- Use an `<table>` element for show tabular data, some web devs think you should never use the table element but, as long as it is used for showing tabular data and NOT for layout it is fine.
- When using heading tags never skip numbers, e.g instead of `<h1>` `<h3>` `<h5>` just use `<h1>` `<h2>` `<h3>` and use CSS to change the styles if needed.
- Before writing your HTML and when you are about to use a div ask is this really the best tag I can use for this situation.

**There are always exceptions to never using an element but 99% of the time always use the native element.**

## Conclusion / Next Steps

I hope you enjoyed this first post on accessibility about Semantic HTML, I hope this post helped you in some way. The next post will be available soon.

Until next time,

Jason
