---
title: "Leetcode 21 Merge Two Sorted Lists"
date: "2021-02-14"
description: "Leetcode Goal 12 / 25, Merge Two Sorted Lists"
---

Welcome back, part of my Self Development Goals for 2021 is "Complete at least 25 - 50 Leetcode Questions", today we are going to discuss and solve [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

## Problem

![Merge Two Sorted Lists](./images/merge-two-sorted-lists.png)

## Solution

<!-- TODO -->

```py
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        newMergedLL = ListNode()
        head = newMergedLL

        while l1 != None and l2 != None:
            if l1.val < l2.val:
                newMergedLL.next = ListNode(l1.val)
                l1 = l1.next

            else:
                newMergedLL.next = ListNode(l2.val)
                l2 = l2.next

            newMergedLL = newMergedLL.next

        if l1 != None:
            newMergedLL.next = l1

        if l2 != None:
            newMergedLL.next = l2


        return head.next
```

## Time / Space Complexity

Time: O(N)

Why: We need to transverse the entire linked list in order to remove every duplicate element.

Space: O(N)

Why: Since we are create a new sorted list and not modifying the input one it will be O(N), where N is the nodes in the list.

## Conclusion

I hope you enjoyed this second post on solving some Leetcode problems, Anyway, that is 12 / 25 for my yearly goal done! now onto the rest, i hope you enjoyed this post!

Until next time

Jason
