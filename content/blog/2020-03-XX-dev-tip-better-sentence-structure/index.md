---
title: "DevTip: Better Sentence formatting with Intl.ListFormat"
date: "2020-03-XX"
---

Welcome back, this week I wanted to discuss a quick dev tip. Recently I was reviewing a PR and there was complicated logic around adding 'and' or 'commas' in the right place when showing an error message to the user. An example of this would be: 'Task 100, 101 and 102 failed'. While we could have just changed it to say 'Task 100, 101, 102 failed' we wanted to keep it correct english. When seeing this in the PR I thought there must have been an easier way, after some research I found [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ListFormat).

## Intl.ListFormat

TBA


