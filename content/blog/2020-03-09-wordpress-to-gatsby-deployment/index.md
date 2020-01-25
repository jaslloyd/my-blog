---
title: "WordPress to Gatsby: Deploying a blog to Netlify"
date: "2020-03-09"
description: ""
---

Welcome back, this is the third post on migrating a WordPress Site/Blog to Gatsby. I am in the process of migrating this blog to Gatsby so I taught it would be good to document the process. Today I am going be discussing how to deploy our blog to Netlify. We populated the Blog with posts which we imported from WordPress in the [last Post](https://link-to-last-post.com).

## Netlify

We are going to be deploying to [Netlify](https://www.netlify.com/), Netlify is a very popular hosting platform that will allow you to do a lot of things. One of those things is to deploy a Gatsby site a.k.a a static site to its platform for free. 

Netlify relies on heavily on using Git, it will watch your Git repository for changes and automatically deploy any changes to your website. What is great about this, when we add a new Blog post, gatsby will automatically deploy the website with the new content!. As stated every time we create or change a post we are going to need to deploy a new version as we have a static site and Netlify helps with that. Lets get started by creating a Netlify account.

### Creating a Netlify account and connecting to the blog repo.

Make sure you have a Github or Bit Bucket account, also make sure your latest blog changes are pushed to the repo.

1. Visit https://app.netlify.com/signup
2. Click 'Github' to Sign up with Github and following the instructions to connect it with your account.
3. Once your sign up is completed you will be brought to your Dashboard.
4. Click 'New Sign from Github', you will be brought to the very simple 3 step setup process. 

Once you complete the steps you should have your blog repository connected. Now back on your Netlify Dashboard you will see a new application with some crazy name. If it is was successful you can click your site an will see your domain name e.g: https://ecstatic-jang-39a880.netlify.com and if you click you should now see your blog!!

### Continuous Deployment

## Conclusion

