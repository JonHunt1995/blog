---
title: 'Mock Interview Post-mortem #1'
subtitle: Sometimes I forget that straightforward usually beats clever
description: >-
  Interviews are not the time to experiment, itertools proves to be useful,
  floating-point math burns me bad
date: 2026-09-13
category: tech
author: Jon Hunt
tags:
  - leetcode
  - deep-dives
  - mock-interview
  - ladder-climb
draft: false
mathjax: true
---
I have been doing regular mock interviews with a group of friends for nearly a year now, and I figured I would write some post-mortems and reflections. The theme for this mock interview I would say is to use the tools you're comfortable with and save the experimentation for practice. Now for the past couple blog posts I have been trying out the [itertools](https://docs.python.org/3/library/itertools.html) module because it seems like a useful time-saver for a bunch of problems and seems pretty nice for Python programming in general. I also felt that something like math.log() would be a useful tool to have (which I think it does, just not as much as math.pow()), but since I didn't know the tools well they wouldn't be worth the trouble in an interview. However I did some digging later to learn more about these tools and how to apply them. I was asked 3 interview questions and here is roughly my thoughts when attempting them.

## Q1: [**Product of Array Except Self**](https://leetcode.com/problems/product-of-array-except-self/)

This is one that I have solved before, but not "correctly". The restriction for this problem is that you're not supposed to use division, but frankly I would absolutely solve this problem that way so I mentioned that as a possibility to the interviewer which they accepted. I knew that this problem is supposed to be an introduction to [prefix sum](https://www.hellointerview.com/learn/code/prefix-sum/overview), which like [2 pointer](https://www.hellointerview.com/learn/code/two-pointers/overview) or [sliding window](https://www.hellointerview.com/learn/code/sliding-window/fixed-length), is a technique to optimize O(n) time complexity solutions to O(n) by cutting down on duplicative calculations. However, knowing the strategy and how to apply it are 2 different things, so I decided to go with a simple idea: the product of an array except for that number is the equivalent to the product of the entire array divided by that element. This would be remarkably efficient because getting the total product is O(n) and then you perform n divisions (which is a constant time operation), leaving O(n) time complexity and O(1) space complexity (no array needed, just a zero count variable and total product variable). This is fairly straightforward to code except for one caveat: you can't divide by zero.\
\
Therefore I had to make two guard clauses depending on the amount of zeros in the array. If there's a single zero, then the output array will be all zeros except for the index that matches where the zero is in the input array (this would be the product of all of the other numbers excluding the zero). If there are multiple zeros in the array, then the output array will be all zeros. With the tricky edge cases taken care of, the rest is simple to code up:

```py
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        zero_count = nums.count(0)
        if zero_count > 1:
            return [0] * len(nums)

        total_prod = math.prod(num for num in nums if num != 0)

        if zero_count > 0:
            zero_idx = nums.index(0)
            return [0] * zero_idx + [total_prod] + ([0] * (len(nums) - zero_idx - 1))

        return [
            total_prod // num if num != 0 else 0
            for num in nums
        ]
```

Trying to implement this with prefix and suffix arrays is to first understand what we're trying to eliminate with prefix and suffix arrays. The simplest solution would be to take the product of every item before the index of the output and multiply that by the product of every item after like so:

```py
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        result = []

        for i in range(len(nums)):
            if i == 0:
                result.append(math.prod(nums[1:]))
            elif i == len(nums) - 1:
                result.append(math.prod(nums[:-1]))
            else:
                result.append(math.prod(nums[:i]) * math.prod(nums[i+1:]))

        return result
```

However, having to constantly calculate the product of every item before an index and every item after an index is very inefficient when instead we can have two arrays that keep track of a running product from either the start or the end of an array respectively (the prefix and suffix). With these prefix and suffix arrays constructed, the logic is the same as the inefficient version shown above:

```py
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        forwards_products = []
        backwards_products = [0] * len(nums)
        prefix, suffix = 1, 1
        result = []

        for i in range(len(nums)):
            prefix *= nums[i]
            suffix *= nums[-i-1]

            forwards_products.append(prefix)
            backwards_products[-i-1] = suffix

        for i in range(len(nums)):
            if i == 0:
                result.append(backwards_products[i+1])
            elif i == len(nums) - 1:
                result.append(forwards_products[i-1])
            else:
                result.append(forwards_products[i-1] * backwards_products[i+1])

        return result
```

Now initially I tried using itertools to construct the prefix and suffix arrays, since I have noted before that accumulate is a good tool for this. However I couldn't figure out the proper function to use as the accumulator function for a running product, but luckily the docs mention using operator.mul(). Here's my solution using itertools.accumulate(), which does end up being slightly faster than the looping version:

```py
from itertools import accumulate
from operator import mul

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        prefix = list(accumulate(nums, mul))
        suffix = list(accumulate(nums[::-1], mul))[::-1]
        result = [suffix[1]] + [0] * (len(nums) - 2) + [prefix[-2]]

        for i in range(1, len(nums) - 1):
            result[i] = prefix[i-1] * suffix[i + 1]

        return result
```

## Q2: [**Count Commas in Range**](https://leetcode.com/problems/count-commas-in-range/)

\
I was initially asked the tougher version of this problem, but ended up being stumped so opted for the easier one first. I initially solved this by initially thinking, that the amount of commas is basically the same as the $1000^x$ = num where $\lfloor x \rfloor$ is equal to the number of commas. Since a logarithm is the inverse of an exponent, I can use this code to get the number of commas:

```py
class Solution:
    def countCommas(self, n: int) -> int:
        return sum(
            int(math.log(i, 1000))
            for i in range(1,n+1)
        )
```

However, this is computationally expensive at O(n), with the function taking longer to execute based off of the size of the input. However, with some basic math and looking at the constraints of the problem, it's clear that for this simplified version that since there will only be dealing with numbers that are at most 1 comma (max is $10^5$). Therefore it can be simplified to this:

```py
class Solution:
    def countCommas(self, n: int) -> int:
        return max(0, n - 999)
```

## Q3: [**Count Commas in Range II**](https://leetcode.com/problems/count-commas-in-range-ii/)

Still, it feels like using the logarithm to get the number of commas is still correct. I also feel like the shape of the problem looks recursive to me, but I admit I tend to reach for recursion in many cases when it's superfluous. However, since using recursion is essentially O($\log\_\{1000}(n)$), I am not very concerned about the amount of levels of recursion, since it should be 5 max at 1 quintillion. The space efficiency should be around the same as well. I couldn't find a proper pattern during the mock and went back to the drawing board the next day. An insight I had was to calculate an "offset", which would be a way to isolate each magnitude of a number. For example, if I had 45,678,901 I could first find the $\lfloor\log\_\{1000}(n)\rfloor$ which I will be referring to as log\_k. This would be&#x20;
