---
title: "WordPress to Gatsby: Migrating Posts/Pages from WordPress"
date: "2020-02-XX"
description: ""
---

Welcome back, this is the second post on migrating a WordPress Site/Blog to Gatsby. I am in the process of migrating this blog to Gatsby so I taught it would be good to document the process. Today I am going be discussing how to migrate/export posts from WordPress into Gatsby.

While there are various ways to getting data out of WordPress, I am going to be discussing one main way that will automate pretty much all of the work. The way it is going to work is:

1. Export Data from in the WordPress UI into xml.
2. Use [wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown) to go through the xml documents and generate the markdown files.
3. Take all this folders and import them into `content/blog`.


## Exporting Data from WordPress




I should not I do not recommend this way if you are keeping your WordPress site around in the backend or using it as headless WordPress, you can still do what I am going to show but there are probably better ways for that.



