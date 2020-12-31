---
title: "Leetcode 203 Remove Linked List Element"
date: "2021-02-07"
description: "Leetcode Goal 10 / 25, Remove Linked List Element"
---

Welcome back, part of my Self Development Goals for 2021 is "Complete at least 25 - 50 Leetcode Questions", today we are going to discuss and solve [Remove Linked List Element](https://leetcode.com/problems/remove-linked-list-elements/)

## Problem

![Remove Linked List Element](./images/remove-linked-list-element.png)

## Solution

```py
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeElements(self, head: ListNode, val: int) -> ListNode:
        """
        Time Complexity: O(n)
        Space Complexity: O(1) since we reuse existing list.
        """
        if head == None:
            return None

        # Creating Dummy avoid edge cases where 1st node is one that we have to remove, instead we just create a dummy node and append the list to it.
        dummy = ListNode()
        dummy.next = head
        # Keep a pointer to head of list so we can return it
        head = dummy

        while dummy.next != None:
            if dummy.next.val == val:
                dummy.next = dummy.next.next
            else:
                dummy = dummy.next

        return head.next
```

## Time / Space Complexity

Time: O(N)

Why: TBA

Space: O(1)

Why: We are just switching pointers to remove elements so its constant space.

## Conclusion

I hope you enjoyed this second post on solving some Leetcode problems, Anyway, that is 10 / 25 for my yearly goal done! now onto the rest, i hope you enjoyed this post!

Until next time

Jason
