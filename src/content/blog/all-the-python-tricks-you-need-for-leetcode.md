---
title: All the Python Tricks You Need For Leetcode
subtitle: Why I learned an entire language just to grind leetcode
description: >-
  Python and leetcode go hand in hand and I'm going to show all of the awesome
  Pythonic tips and tricks I typically use when solving leetcode problems.
date: 2026-09-04
category: tech
author: Jon Hunt
tags:
  - leetcode
  - deep-dives
  - ladder-climb
  - python
draft: false
mathjax: false
---
As I mentioned before, I actually didn't really know Python when initially grinding leetcode, preferring to use Java (not a bad choice for leetcode but pretty difficult to nail the syntax without the docs or IDE autocomplete imo) or Go (a language that's actually fairly unwieldy for leetcode unfortunately but actually pretty good for learning since you do have to DIY a lot of data structures). However, after 20 problems in leetcode, I decided to actually dive deep into learning Python to the level where I would be comfortable enough using it in coding interviews and have not regretted it 200 leetcode problems later. In fact, I would say that I'm now a Pythonista who naturally thinks in Python syntax first and then adapts that logic into other languages that I'm writing (this may be considered a con instead of a pro). Even though I typically make programs in Go or Typescript, I will say I am not as adept at writing code in either language as naturally with Python because it's a delightfully designed programming language for reading and writing. The main reasons why I think so all have a similar theme: Python is basically pseudocode that you can run as code. Python also has a lot of built-in functionality that I have noticed languages like JS especially do not have, as well as map/filter/reduce functionality that's fairly intuitive in comprehensions and generators. Before I go through my favorite tips and tricks, I'll preface that a lot of these are just quality of life enhancements and that really the only "necessary features" are heaps and deques because they would be painful to implement yourself. Since most leetcode problems are array, string, or hashmap problems you can go very far by just knowing the basics like branching, conditionals, loops, and dicts/sets/lists. Off the top of my head here are the main reasons why Python is the lingua franca of leetcode:

- collections and heapq modules
- dicts, sets, strings, and lists methods
- comprehensions, generators, and aggregator functions
- ability to use functions as a key in sorting, min, max
- enumerate, itertools, and zip

## Collections and Heapq

Python has many built-in modules ready made for DSA heavy problems, the most important are collections and, heapq. The collections model is the one I tend to reach for the most, and deque (double ended queue usually for BFS) and Counter (a dictionary that rapidly enumerates strings to letters or lists to items).

Now a Counter isn't exactly hard to implement which is why most languages don't have it built in, but being able to rapidly one-line and act on a Counter can render many leetcode problems into 2-5 lines vs 10-20. Another underrated aspect is since a Counter is a defaultdict(int), you don't need to check if an item is in a Counter because it'll automatically be 0 which saves from checking if an item is in a dict. Defaultdicts allow you to do the same thing, which is why they are a nice feature to reach for. [Counters also have additional helpful methods](https://docs.python.org/3/library/collections.html#collections.Counter) on top of dicts, but I don't really remember them so rarely reach for them in leetcode. They do look handy enough where it may be actually beneficial remembering though. A good example of when to reach for Counters are to solve straightforward hashmap problems very rapidly. Compare this Go approach to Valid Anagrams vs Python:

```go
func isAnagram(s string, t string) bool {
    if len(s) != len(t) {
        return false
    }
    sLetterFreq := map[rune]int{}
    tLetterFreq := map[rune]int{}
    for _, letter := range s {
        if _, ok := sLetterFreq[letter]; !ok {
            sLetterFreq[letter] = 0
        }
        sLetterFreq[letter]++
    }
     for _, letter := range t {
        if _, ok := tLetterFreq[letter]; !ok {
            tLetterFreq[letter] = 0
        }
        tLetterFreq[letter]++
    }

    for key, val := range sLetterFreq {
        if tLetterFreq[key] != val {
            return false
        }
    }
    return true
}
```

```python
from collections import Counter

class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return Counter(s) == Counter(t)
```

Being able to essentially compact 10+ lines of code into a simple one-liner is very helpful when you're racing against the clock and want to allow enough time to effectively express your approach to an interviewer. From what I've heard from FAANG interviewers, they also are very aware of Python's syntactic sugar and will be able to follow your code pretty well, which may not be the case if you use a relatively obscure language like Go or Kotlin.

Deques or double-ended queues are a very useful data structure when you want to reach for a queue. I typically only reach for a queue for BFS, which is usually for finding the shortest path in a graph or for binary trees. I don't recall using deques for any other problems, but BFS is a very important topic for leetcode so it's definitely high ROI (return on investment) to know it well. A typical BFS approach can be seen in something like level order traversal, [which is infamous for being a coding interview problem that apparently 90% of CS grads couldn't solve](https://www.youtube.com/watch?v=lNaW4zlo8ZY).

```python
from collections import deque

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []

        levels = []
        queue = deque([root])

        while queue:
            level = []
            for i in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            levels.append(level)

        return levels
```

This looks like a lot but you can think of deques as essentially lists that you're able to insert on the left and right very efficiently instead of just the right. The normal list append and pops work identically for the right side (for stacklike functionality), while deques have additional popleft and appendleft methods for queuelike functionality. This level order traversal code is essentially checking if a tree is empty, and if it isn't, goes through each level by initially adding the root to a deque, and then while the queue isn't empty, adding the children of each node we're processing to the queue. Once every level is processed, the queue is empty. In this case, we're saving the nodes to a level list and once a level is clear, we append it to the nested levels list that will eventually be our output.

Heapq is another relatively niche module that make nice work of problems optimally solved by heaps and priority queues. Typically, these problems are framed like "max/min k things in this list" but can also be seen in task scheduler and other problems. A heap is essentially a binary tree where the root is the smallest item if it's a min-heap or the largest if it's a max-heap. Historically Python only had min-heaps because you can just negate the values to get the max-heap version, [but luckily, they recently added the max heap in 3.14](https://docs.python.org/3/library/heapq.html). However, you'll probably still see a lot of code using the negating values to turn into a max-heap strategy since this is so new, especially in Neetcode videos or leetcode solutions. Technically, a lot of these problems can be solved more efficiently with quickselect (O(n) runtime complexity) or not as efficiently but easier to code by just sorting and then grabbing the index of an item (O(nlogn) runtime complexity) but heaps are usually straightforward and can be very nice when the size of the heap can be small (usually denoted as k, hence runtime complexity of O(nlogk)). Here's a classic heap problem:

```python
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heap = []

        for num in nums:
            if len(heap) < k:
                heapq.heappush(heap, num)
                continue
            heapq.heappushpop(heap, num)

        return heap[0]
```

## Lists, Strings, Dicts, Sets, and Methods

These are the bread and butter of typical Python programming, and although pretty much every mainstream programming language have these with similar functionality, I would still argue that Python has the nicest ergonomics for these especially with other features mentioned throughout this blog post.

Lists are dynamic arrays similar to JS arrays, Go slices, and Java ArrayLists. A neat feature of Python lists is that you can use negative indexing to find the last nth item of a list, so instead of `items[len(items)-2]` to get the second to last item in a Go slice, for Python you could write `items[-2]` and it wraps around so that you never have to worry about index out of bounds errors (which you can use modulo in other languages to do the same thing, but still nice to get for free). One big downside to this is that many languages including Python have an index list method that either returns the first index where an item is found in a list, or -1 if it's not found. However, in Python since -1 technically is a valid index, they decided to throw an exception instead for explicitness which is annoying. I still think the benefits to negative indexing are worth it but still important to be aware that list.index() typically needs to be in a try except statement which is not the case in many other languages. I would say the handiest methods to know for Python lists are count, index, append (add), extend (add items of a list while keeping it flat), and pop (for stacklike functionality).

Strings are similar to lists for leetcode, but there are some important things to know for Python. Since strings are immutable in Python, constantly concatenating strings will lead to worse performance just like with Java, so a better way similar to StringBuilder in Java or Go is to split a string to a list of chars and then in the end joining them back together for the final result. Finally for string manipulation, I tend to use str.lower(), str.upper(), str.isalpha(), str.isdigit(), and ord() and chr() functions. The latter two get the ascii char code and the inverse respectively which is nice for a lot of string manipulation problems.

Dicts are hashmaps similar to JS Objects or Maps, Go maps, and Java HashMaps. One thing to be aware of is that if you try accessing an item that isn't in a dict, it does raise an exception. The most natural way to solve this is to just use a defaultdict, but I tend to reach for dict.setdefault(item, whatever_i_want_default_to_be) instead. Another common way is to use dict.get(item, again_set_default_value_here) as well. Finally, you can just check if an item is in a dict by just doing if item in dict, but this is a bad habit because in production code can lead to nasty race conditions called [Time Of Check to Time Of Updates or TOCTOUs.](https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use) Obviously not a big deal in leetcode but still good to know if you want to make a FastAPI or Django app. The most common methods I reach for are dict.keys() to get a list of keys, dict.values() to get a list of values, and dict.items() to get a list of k-v pairs as tuples.

Sets are essentially dicts with only the keys and omitting the values, which is very nice when you want a deduplicated list. Python sets like many other languages also come with a lot of awesome methods borrowed from set theory such as union, intersection, difference, sub/super set, and symmetric difference. Typically, I use union, intersection, and difference when using set methods. The most common use case for sets is when uniqueness is important, such as in this problem:

```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return len(set(nums)) != len(nums)
```

## Comprehensions, Generators, Aggregators

Now we're getting to the really awesome features that I use and abuse often to get very efficient and succinct one-liners for many leetcode problems. Comprehensions and generators are very similar, but the former builds the whole data structure in memory while the latter is more space efficient ant only handles one item in memory at a time. I try to reach for generators when possible because I like getting the memory usage slightly lower, but comprehensions do run a little faster I have noticed. I tend to think of comprehensions very similarly to map and filter, but in an odd Python twist comprehensions actually run faster than typical loops because it uses highly optimized C code under the hood. In order to get reduce functionality, I reach for one of Python's many aggregator functions and throw a generator into it. My most common tools for this are sum(), any() which returns True if any item is true, and all() which returns True if all items are True. The sky is the limit with these tools and for a [large swathe of leetcode problems such as this one](https://leetcode.com/problems/number-of-strings-that-appear-as-substrings-in-word/description/), you can solve them very rapidly by combining these tools together like so:

```python
class Solution:
    def numOfStrings(self, patterns: List[str], word: str) -> int:
        return sum(1 for pattern in patterns if pattern in word)
```

I highly recommend looking at the admittedly terrible Python docs to see all of the various use cases for these features because they will serve you well in array problems especially.

## Intuitive Sorting, Max, Min Keys

A very underrated aspect of Python is that sorting makes a lot of sense, even if it might initially feel limiting vs JS, Java, or Go with their comparator approach. I personally never remember how to actually sort in these other languages and always have to look in the docs for any complicated sorting, which in Python is much easier. First, the default order is ascending but you can just add `reverse=True` to any sort function and it'll switch over to descending. Second, in order to be precise about the sorting key, you can very quickly pass in a lambda or function to the key parameter and throw in a tuple for tiebreakers. Here's a good [example where you have to reorder letters in a string based off of their order in an order string like so](https://leetcode.com/problems/custom-sort-string/description/):

```python
class Solution:
    def customSortString(self, order: str, s: str) -> str:
        order_map = {ch: i for i, ch in enumerate(order)}
        
        for ch in set(s).difference(order):
            order_map[ch] = 27 
        
        return ''.join(sorted(s, key=order_map.get))
```

Now if you're comfortable with the comparator approach in JS, Java, or Go then this isn't really a killer feature, but I personally love the Python approach the best. You can also pass in a function as a key parameter to min and max as well, which is ocasionally handy but not as much as sorting.

## Enumerate, Zip, Itertools

I personally would describe these as more nice to have than essential, but I love my indexed for loops with enumerate, zip for parallel iteration, and have discovered itertools very recently and will be personally diving deep for them later. These make looping in Python a lot nicer and in the case of itertools, a lot faster and more straightforward. Enumerate and zip are pretty common features in other languages so it's high ROI, while itertools is very niche and Python specific, so I probably would only bother learning it if you really want to. I tend to reach for enumerate and zip very often and feel like it's worth learning just for the time savings you'll get by properly utilizing them.

## Conclusion

That was a fairly surface-level overview of all of the Pythonic tricks that I think are good for leetcode, Advent of Code, and coding interviews. With all of these features that Python provides I have high confidence in being able to code up the majority of coding interview problems, especially for the fundamentals like arrays, strings, hashmaps. I would say that learning all of these would be at most a weekend of work and will allow you to solve tougher problems faster while giving you enough time to properly explain your approach, debug, and perhaps iterate from brute force to optimal approaches for a problem.
