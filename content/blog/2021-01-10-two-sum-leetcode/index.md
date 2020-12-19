---
title: "Leetcode Two Sum & Two Sum II"
date: "2021-01-10"
description: "Leetcode Goal starting now 2 / 25, Discussing Two Sum and Two Sum II"
---

Welcome back, one of my Self Development Goals for 2021 is "Complete at least 25 - 50 Leetcode Questions" so why not get this goal started right away. Leetcode has a huge question bank of questions so what questions have I decided to answer? Looking around online there seems to be different opinions on what do focus on and whilst there is no definitive answer some good advice I found is to generally look at different areas / Techniques e.g: Arrays, Dynamic Programming, Binary Search, Graphs (DFS, BFS), Trie etc. The first area I have decided to focus on is Arrays / Two pointers as they seem to closely related in a lot of problems.

## Two Sum Problem

![Two Sum Problem](./images/two-sum-problem.png)

## Two Sum Solution

### Time / Space Complexity

Time: O(n)
Why: At worst we need go through each element of the array to find two matching elements, hash table look ups are O(1) so our complexity is O(n)

Space: O(n)
Why: As we are using a hash table to store every each element of the array (to check if can find target - currentNum is in Hashmap) the space is O(n) because at worst we have to store every element.

## Two Sum II Problem

![Two Sum Problem](./images/two-sum-ii.png)

## Two Sum II Solution

### Time / Space Complexity
