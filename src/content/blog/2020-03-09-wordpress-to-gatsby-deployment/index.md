---
title: "WordPress to Gatsby: Deploying a blog to Netlify"
date: "2020-03-09"
description: ""
---

Welcome back, this is the third post on migrating a WordPress Site/Blog to Gatsby. I am in the process of migrating my blog to Gatsby so I taught it would be good to document the process. Today I am going be discussing how to deploy our blog to Netlify. We populated the Blog with posts which we imported from WordPress in the [last post](https://link-to-last-post.com), now it is time to get it live.

## Netlify

We are going to be deploying to [Netlify](https://www.netlify.com/), Netlify is a very popular hosting platform that will allow you to do a lot of things. One of those things is to deploy a Gatsby site a.k.a a static site to its platform for free.

Netlify relies on heavily on using Git, it will watch your Git repository for changes and automatically deploy any changes to your website. What is great about this, when we add a new Blog post, Netlify will automatically deploy the website with the new content!. As stated every time we create or change a post we are going to need to deploy a new version as we have a static site and Netlify helps with that. Lets get started by creating a Netlify account.

### Creating a Netlify account and connecting to the blog repo.

Make sure you have a Github or Bit Bucket account, also make sure you pushed the latest changes to the repo.

1. Visit https://app.netlify.com/signup
2. Click 'Github' to Sign up with Github and following the instructions to connect it with your account.
3. Once you sign up is completed you will be brought to your Dashboard.
4. Click 'New Site from Github', you will be brought to the very simple 3 step setup process.

Once you complete the steps you should have your blog repository connected. Now back on your Netlify Dashboard you will see a new application with some crazy name. If it is was successful you can click your site and will see your domain name e.g: https://ecstatic-jang-39a880.netlify.com and if you click you should now see your blog!!

Netlify has a lot of features that I may or may not dive into, I want to keep these posts pretty short so I won't be going into too much detail at this time.

Note: If it was unsuccessful Netlify will provide logs so you can see where it failed. If you follow the steps in this series you shouldn't have to worry about the failures now.

## Conclusion

Now we have our site live on the internet!, every time we push changes to Github, Netlify will automatically see the changes run any Gatsby command to create a production build and deploy the new version, this means our site is being continuously deployed e.g (CICD). I know this was a short post but it is an important step in migrating the Blog. Now we have a crazy domain name and the traffic is still being directed to the old blog, which is fine for now, in the future we will take care of redirecting our domain to our new Netlify website. The great thing is Netlify will step you through each stage of the process. Anyway, I hope you enjoyed this post.

Until next time,

Jason
