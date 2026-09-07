---
title: My Stab At Weekly Leetcode Contest 518
subtitle: My thoughts and approach attempting the contest
description: 'The planning, coding, and post-mortem of LC Weekly # 518'
date: 2026-09-06
category: tech
author: Jon Hunt
tags:
  - leetcode
  - python
  - deep-dives
draft: false
mathjax: false
---
I want to preface that this wasn't an official contest or even virtual. I am just going through the official contest problems the day after it happened. In contest mode, you are intentionally limited in not being able to see topics or hints and have limited test cases vs normal mode. I didn't look at the topics or hints but did use the standard leetcode mode for debugging, so definitely not the "true contest". My goal when trying to solve the contest problems is solving the first 2 because I think that's a good benchmark at my current skill level. Problem 3 is usually iffy for me because it typically uses a more advanced algorithm that I am not familiar with, and can be very punishing for suboptimal approaches. Problem 4 I pretty much just skim the description and skip.

## Q1:&nbsp;[**Count Rotations With Exactly K Equal Adjacent Pairs**](https://leetcode.com/problems/count-rotations-with-exactly-k-equal-adjacent-pairs/)

This may be one of the more challenging first questions that I could remember, at least to solve optimally. Typically every Q1 can be brute-forced pretty easily but I try to solve optimally because I'm a completionist. Unfortunately I don't quite know the optimal approach but  the brute force solution isn't too bad if I [lean into Pythonic tricks](https://jonhunt.dev/blog/all-the-python-tricks-you-need-for-leetcode/). Earlier I mentioned wanting to get more practice with the itertools Python module, and felt that pairwise would be a great tool to reach for here.

```py
from itertools import pairwise

class Solution:
    def get_score(self, s):
        return sum(
        first == second
        for first, second in pairwise(s)
        )
    def countRotations(self, s: str, k: int) -> int:
        return sum(
        self.get_score(s[i:] + s[:i]) == k
        for i in range(len(s))
        )
```

I made a little helper method for getting the "score" or the total of identical adjacent pairs, and then wrote a little generator that takes the count of all of the rotated strings whose score matched k. I recently discovered this neat little trick where a boolean can be cast as 1 if true or 0 if false in Python, where before I would write `sum(1 for item in arr if condition)`, instead you can write `sum(condition for x in arr)`. I have mixed feelings about this because it is fun to write but slightly more difficult to read.

This brute-force approach has quadratic time complexity and linear space complexity due to the string concatenation. After reading others' solutions it appears there is an optimization to solve this problem in O(n) time and O(1) space by comparing letters to their adjacent pair **and the beginning letter**.

## Q2: [**Count Good Cyclic Rotations**](https://leetcode.com/problems/count-good-cyclic-rotations/)

My initial idea was noticing this pattern:

```python
nums = [1,2,3,4,5,6]
left, right = [1,2,3], [4,5,6]
# Can swap the accumulated indices for left and right 
# totals to get the new left and right totals 
# after rotations
left_total = [1,3,6]
right_total = [4,9,15]
rotations_and_side_sums = [
            ([1, 2, 3, 4, 5, 6]	6, 15),
            ([2, 3, 4, 5, 6, 1]	9, 12),
            ([3, 4, 5, 6, 1, 2]	12, 9),
            ([4, 5, 6, 1, 2, 3]	15, 6),
            ([5, 6, 1, 2, 3, 4] 12, 9),
            ([6, 1, 2, 3, 4, 5] 9, 12)
        ]

# Attempt
from itertools import accumulate

class Solution:
    def countGoodRotations(self, nums: list[int]) -> int:
        half = len(nums) // 2
        left, right = list(accumulate(nums[:half])), list(accumulate(nums[half:]))

        result = 1 if left_total > right_total else 0

        for i in range(half):
            new_left = left_total[-1] + right_total[i] - left_total[i]
            new_right = right_total[-1] - right_total[i] + left_total[i]

            if new_left > new_right:
                result += 1

        return result
```

Unfortunately this approach was incorrect because I neglected the fact that the size of the subarray being moved over can actually be larger than half of the array, requiring a different approach. I still feel like this approach can work if amended, but decided to scrap it for a sliding window approach.

For the sliding window, I kinda realized that you don't really need to keep track of the right side, just the total sum of the array and the sum of a sliding window of half the elements. The only annoying issue is that it would have to wrap around, so in order to get around that I just concatenated the array to itself. This is less space efficient than using modulo math to simulate the wrapping around, but I didn't think it would matter in a contest where the goal is to just solve a problem in acceptable time limits:

```py
from itertools import accumulate

class Solution:
    def countGoodRotations(self, nums: list[int]) -> int:
        wrapped_nums = nums + nums
        half = len(nums) // 2
        running_total = list(accumulate(nums))
        left, total = running_total[half-1], running_total[-1]
        result = 1 if left > total - left else 0

        for i in range(len(nums) - 1):
            left += (wrapped_nums[i+half] - wrapped_nums[i])

            if left > total - left:
                result += 1

        return result
```

## Q3: &nbsp;[**Count Robot Groups**](https://leetcode.com/problems/count-robot-groups/)

This one I unfortunately wasn't able to solve, but I actually ended up being very close. This one screamed greedy to me, where the limiting factor would be the rightmost robots and keeping track of the slowest speed seen from the reverse. My idea is basically thinking of it like a traffic jam, where groups will congregate behind the slowest robots. An interesting twist with this is that if the robots are within a given distance of each other, they automatically join together to be a group. If any robots behind a group were too slow and too far away, means that there will be at least one more group. If I could scan and either increment from zero or decrement from the total number of robots, I should get the number of groups that form. My attempt to this was this:

```py
class Solution:
    def countGroups(self, positions: list[int], speeds: list[int], distance: int) -> int:
        bumping_speed = speeds[-1]
        bumping_position = positions[-1]
        groups = len(positions) + 1

        for position, speed in zip(positions[-1::-1], speeds[-1::-1]):
            #print(position, speed, groups, bumping_speed, bumping_position)
            if bumping_position - position <= distance or speed > bumping_speed:
                #print("fire 1", position, speed)
                groups -= 1
                bumping_speed = min(speed, bumping_speed)
            bumping_position = position

        return groups
```

The correct approach is indeed greedy but my code had some pitfalls. First, instead of having the speed be the rightmost robot in a group when merges occur, it takes the minimum of the 2. I also don't have the limiter for speed be the minimum seen in the non merging path, which is another logical error.

## Summary

I skipped the final question, leading to a solid 2/4 with a decent attempt on Q3. Overall I think it was a respectable showing and I was able to incorporate itertools in here and so far I'm liking it. I definitely think these questions would be pretty fair in an interview, mostly being straightforward array and string questions. I have noticed that I have a weakness against greedy problems, so I think I'll deep dive into that pattern in a later time.\
