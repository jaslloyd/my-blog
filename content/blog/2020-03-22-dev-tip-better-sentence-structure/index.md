---
title: "DevTip: Better Sentence formatting with Intl.ListFormat"
date: "2020-03-22"
---

Welcome back, this week I wanted to discuss a quick dev tip. Recently I was reviewing a PR and there was complicated logic around adding 'and' or ', (commas)' in the right place when showing an error message to the user. An example of this would be: 'Task 100, 101 and 102 failed'. While we could have just changed it to say 'Tasks 100, 101, 102 failed' we wanted to keep the correct grammar. When seeing this in the PR I thought there must have been an easier way, after some research I found [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ListFormat).

## Intl.ListFormat

```tsx
// Some API error response, we extracted the task ids
const failedTasks = ["100", "101", "102"]

const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
})
console.log(formatter.format(failedTasks))
// expected output: "100, 101, and 102"

const errorMessage = `Tasks ${formatter.format(failedTasks)} failed`
```

It also supports disjunction, let's say instead of having 'add' we want to put 'or' well Intl.ListFormat does that to!
In the previous code example change 'conjunction' to 'disjunction'

```tsx
const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "disjunction",
})
// Output will be: "100, 101, or 102"
```

This is extremely powerful because Intl supports multiple languages and all languages do not do conjugation or disjunction the same e.g German.

## Conclusion

I hope you enjoyed this short DevTip on Intl.ListFormat, it is a very powerful tool that you will be able to use in your code. I should note this is currently only supported in Chrome but should be available in future browser releases.

Until next time,

Jason
