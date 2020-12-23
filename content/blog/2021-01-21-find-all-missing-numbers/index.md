---
title: "Leetcode 448 Find All Numbers Disappeared in an Array"
date: "2021-01-21"
description: "Leetcode Goal 5 / 25, Discussing and solving Find All Numbers Disappeared in an Array"
---

Welcome back, part of my Self Development Goals for 2021 is "Complete at least 25 - 50 Leetcode Questions", today we are going to discuss and solve [Leetcode Leetcode 448 Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array)

## Find All Numbers Disappeared in an Array Problem

![Find All Numbers Disappeared in an ArrayProblem](./images/all-missing-numbers.png)

## Find All Numbers Disappeared in an Array Solution 1

As with every leetcode problem there are various ways to solve this, we will be discussing two ways of solving this problem. Firstly we will solve it with O(n) time and space complexity then we will see if we can improve it by using no extra space i.e solving it in O(1) space.

\# Pseudocode

```
    1. Create a set with the current unique numbers in the array
    2. Go through each number from 0...n+1
    3. If number not in set then return it
```

```py
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        # Solution 1:
        #   Generate hashmap of 1..n
        #   Mark each number in hashmap as "seen"
        #   Find values in hashmap that are 0 and return it
        # Time Complexity: O(n)
        # Space Complexity: O(n)

        # Solution 2:
        #   Sort list O(n log n)
        #   check index + 1 = cur if not then it missing
        # Time Complexity: O(n log n)
        # Space Complexity: O(n)

        # Solution 3:
        #   for all numbers in array
        #       Each number is treated as index (-1)
        #       Mark that index in the array as "seen" (add a -)
        #   Any positive indexes left will be numbers missing
        # Time Complexity: O(n)
        # Space Complexity: O(1)

        for i, num in enumerate(nums):
            # real index num - 1
            rIndex = abs(num) - 1
            # Take the value at that index and make it negative
            nums[rIndex] = abs(nums[rIndex]) * -1

        return_list = []
        # Any numbers that are positive add index + 1 them return list
        for i,num in enumerate(nums):
            if num > 0:
                return_list.append(i + 1)

        return return_list
```

### Time / Space Complexity

Time: O(n + n) = O(n): O(Cost of creating set + cost of loop), Set/Hashmap lookup is O(1)

Why: At worst we need go through each element of the array to find a duplicate element, hash table look ups are O(1) so our complexity is O(n)

Space: O(n)

Why: As we are using a set to store every each element of the array the space is O(n) because at worst we have to store every element.

## Conclusion

I hope you enjoyed this second post on solving some Leetcode problems, Anyway, that is 4 / 25 for my yearly goal done! now onto the rest, i hope you enjoyed this post!

Until next time

Jason
