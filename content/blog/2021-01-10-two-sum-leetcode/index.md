---
title: "Leetcode Two Sum & Two Sum II"
date: "2021-01-10"
description: "Leetcode Goal starting now 2 / 25, Discussing Two Sum and Two Sum II"
---

Welcome back, one of my Self Development Goals for 2021 is "Complete at least 25 - 50 Leetcode Questions" so why not get this goal started right away. Leetcode has a huge question bank of questions so what questions have I decided to answer? Looking around online there seems to be different opinions on what do focus on and whilst there is no definitive answer some good advice I found is to generally look at different areas / Techniques e.g: Arrays, Dynamic Programming, Binary Search, Graphs (DFS, BFS), Trie etc. The first area I have decided to focus on is Arrays / Two pointers as they seem to closely related in a lot of problems.

## Two Sum Problem

![Two Sum Problem](./images/two-sum-problem.png)

[Link](https://leetcode.com/problems/two-sum/)

## Two Sum Solution

There are a few ways to approach this problem we could Bruce force the solution by having two loops, for each number in list check against rest of numbers to see if matches the target. This solution would work but its time complexity is O(n^2), can we do better?

We can in fact, we can use additional space to reduce the overall time complexity. The idea is: as we go through each number, check if target - num already exist in hashmap(meaning it exists in the array) we can return that value & index as well as the current index. If we cannot find the value in the array we can add it along with the index (hash_map[num] = i).

```py
class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        hash_map = {};
        # Go through each element, minus that element from the target, if that new target exists return hash_map[new_target], currentIndex, if its not in the hashmap add it (Key = Number), value = index
        for i, num in enumerate(nums):
            n = target - num
            if n in hash_map:
                return [hash_map[n], i]
            else:
                hash_map[num] = i;

# Input: nums = [2,7,11,15], target = 9
# Output: [0,1]
#  Output: Because nums[0] + nums[1] == 9, we return [0, 1].

```

### Time / Space Complexity

Time: O(n)
Why: At worst we need go through each element of the array to find two matching elements, hash table look ups are O(1) so our complexity is O(n)

Space: O(n)
Why: As we are using a hash table to store every each element of the array (to check if can find target - currentNum is in Hashmap) the space is O(n) because at worst we have to store every element.

Could we solve this using constant space? O(1) i.e No other data structures the answer is yes! and I will show you that by answering another leet code question Two Sum II. Both problems can solved using a hashmap but they both can also be solved via another way which will give us O(1) space.

## Two Sum II Problem

![Two Sum Problem](./images/two-sum-ii.png)

## Two Sum II Solution

### Time / Space Complexity
