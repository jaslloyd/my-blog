---
title: "Leetcode 206 Reverse Linked List"
date: "2021-01-31"
description: "Leetcode Goal 8 / 25, Reverse Linked List"
---

Welcome back, part of my Self Development Goals for 2021 is "Complete at least 25 - 50 Leetcode Questions", today we are going to discuss and solve [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

## Problem

![Reverse Linked List](./images/reverse-linked-list.png)

## Solution

```py
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: ListNode) -> ListNode:

        prev = None
        current = head
        """
            1->2->3->4->5->NULL
            NULL<-1<-2<-3<-4<-5

        """
        while current != None:
            nextNode = current.next
            current.next = prev
            prev = current
            current = nextNode

        return prev
```

## Time / Space Complexity

Time: O(N) = O(N)

Why: We need go through each element of the linked list (until we get to a None/Null pointer).

Space: O(1)

Why: Since we are switch pointers and using a prev variable it is constant space.

## Conclusion

I hope you enjoyed this second post on solving some Leetcode problems, Anyway, that is 8 / 25 for my yearly goal done! now onto the rest, i hope you enjoyed this post!

Until next time

Jason
