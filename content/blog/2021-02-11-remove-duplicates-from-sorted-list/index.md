---
title: "Leetcode 83 Remove Duplicates from Sorted List"
date: "2021-02-11"
description: "Leetcode Goal 11 / 25, Remove Duplicates from Sorted List"
---

Welcome back, part of my Self Development Goals for 2021 is "Complete at least 25 - 50 Leetcode Questions", today we are going to discuss and solve [Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)

## Problem

![Remove Duplicates from Sorted List](./images/remove-duplicates-from-sorted-list.png)

## Solution

The solution to this question is very similar to the last post [Leetcode 10 / 25 Post: Remove Linked List Element ](tba), so please check that out for more details. We can do it in O(n) time and O(1) space by just switching pointers. Since the list is sorted we know the duplicate elements will appear one after each other, its a case of checking for the value and moving the next pointer until we reach the end of the list.

```py
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:

        """
        Time Complexity: O(n)
        Space Complexity: O(1)
        """

        if head == None:
            return None

        p1 = head

        while p1.next != None:
            if p1.next.val == p1.val:
                p1.next = p1.next.next
            else:
                p1 = p1.next

        return head
```

## Time / Space Complexity

Time: O(N)

Why: We need to transverse the entire linked list in order to remove every duplicate element.
Space: O(1)

Why: We are just switching pointers to remove elements so its constant space.

## Conclusion

I hope you enjoyed this second post on solving some Leetcode problems, Anyway, that is 11 / 25 for my yearly goal done! now onto the rest, i hope you enjoyed this post!

Until next time

Jason
