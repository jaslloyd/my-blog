---
title: "PR Reviews Tips: X tips for better Pull Requests"
date: "2020-04-29"
description: "X tips for better Pull Requests"
---

Pull request are a huge part of being a developer, weather you are just getting started in your career or you have 10 years experience you will be reviewing PRs. I want to give X tips for reviewing PR for anybody at any level.

1. Set some time aside just for reviews - Your team members or project members work hard on their changeset and when you are a team you have the duty to review PRs, give feedback and approve when ready. You and your team members are the gatekeepers of the codebase so it if very important you find the time to do reviews. I usually do them in the morning, this is mostly because most of my team is in the US and there is a bit of a time difference so there is often PRs ready for me to review in the morning. It also slowly gets you into the day.

2. Come up with a PR template - We didn't have a PR template for a long time and the PR descriptions where always different from person to person. PR template can avoid this situation, no longer should you need to ask for testing instructions, or design links make it apart of your PR process.

3. Automated as much checks as you can - Nobody likes arguing about spacing, line height use tools to automate this process, prettier for example is an opinionated Code formatter that means you no longer need to have formatting discussions. Same goes for using tools like Eslint to do basic code checks for unused variables, functions etc automate it out to the tool so the developer can get immediate feedback. Avoids a lot of "Bike shedding" in PRs.

4. Actually checkout the code don't just review it in Github / TFS or the tool

5. Always leave a comment - Developers work hard on PRs often no comment approvals can leave developers wanting, that why always leave a comment even if it is yeah looks good, great job or anything it really makes a difference.

6. Everybody should reviews PRs and nobody should be excluded from it - I know this is not the case in all companies but this is hugely important to me, it doesn't matter if this is your 1st month in the industry or this is your 25 year in the industry everybody should review PRs. We do this on my team and I have learned so much about code and so much about how different people approach solutions. Also Nobody should be excluded from it I do not care if you are the most senior engineer in the entire company everybody should be able to review your code...why? Firstly, the reviewers will learn a lot from looking at your code, they will ask questions you might not have taught of, you will learn a lot, you will also quickly realize what assumptions you have made with your code.

7. Approve the PR, if your most of your comments/concerns have been addressed, don't just leave it or never reply to the resolved comments. I know this can be hard with timing but make an effort to approve the PR.

They were X tips for better Pull requests, if you have any more tips please reach out to me on [twitter](https://twitter.com/jaythewebdev) and let me know.