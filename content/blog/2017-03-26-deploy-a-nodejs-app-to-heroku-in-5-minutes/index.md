---
title: "Deploy a NodeJS application to Heroku in 5 minutes"
date: "2017-03-26"
---

![NodeJS + Heroku](./cover_image.png)

Welcome back, this week I want to take a sample NodeJS application and deploy it to Heroku. I have heard of people deploying their apps to Heroku but I never took the time to actually check it out. If you don't know what Heroku is:

> _Heroku_ is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.

What makes Heroku so good, it's very easy to use and their pricing is simple when compared to something like AWS. Don't get me wrong AWS is powerful and I am pretty sure Heroku runs on tops of amazon. Heroku is free to use for up to 5 applications and they have support for many programming languages. We will be deploying a basic NodeJS application in about 5 minutes so let's get started.

### Deploying NodeJS app via HerokuCli

We will be following a cut down version of Heroku own [tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction). If you want more information on what we are doing check out their tutorial.

Steps:

1. Download and install the Heroku cli for your OS [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
2. Open your command line and run: `heroku login`
3. Clone the repo for the application: `git clone https://github.com/heroku/node-js-getting-started.git`
4. Go to the Directory: `cd node-js-getting-started`
5. Create an Heroku app by running:`heroku create` **Note: This will give your application a random unique name**. If you want a custom name run the following: `heroku create --app your_unique_app_name`
6. Deploy the code by pushing a master branch: `git push heroku master`
7. Verify its now running on Heroku via: `heroku open`

Well there you have it, you deployed a NodeJS application in about 5 minutes. In the future, it will be even less as you won't have to installed the cli. Now I want to discuss things I learned and how to troubleshoot.

### Troubleshooting and Lessons learned

**Q**: My application didn't work how do I check the logs? **A**: To display the logs for the machine: `heroku logs` if you want to tail the logs: `heroku logs --tail`

**Q: **Is there any way to deploy my app locally before we push it to Heroku? **A**: Yep, run the following: `heroku local`

**Q:** How do I push new changes to Heroku? **A:**

1. Make whatever changes you need to
2. Run it locally to check for errors: `heroku local`
3. Add your changes to git via: `git add .`
4. Commit your changes via: `git commit -m "Latest changes"`
5. Deploy the code by pushing a master branch: `git push heroku master`
6. Verify its now running on Heroku via: `heroku open`

### Conclusion

Heroku is awesome and it's very easy to deploy your NodeJS side project. I hope you enjoyed this small post and it helps you get your side-projects visible to other people. For people wondering how would we go ahead and deploy an application with a DB? I had the same question so I went ahead and deployed the MEAN stack application that we built in the [Simple MEAN stack series](http://thedeployguy.com/simple-mean-stack-application-starting-a-new-project/). That is what I will be showing you how to do in an upcoming tutorial so stay tuned :)

Until next time,

Jason
