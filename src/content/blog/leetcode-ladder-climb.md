---
title: Leetcode ladder climb
subtitle: Documenting my leetcode learning journey
description: >-
  The intro to a series where I make detailed walkthroughs of classic and
  interesting leetcode problems.
date: 2026-09-01
category: tech
tags:
  - meta
  - leetcode
  - deep-dives
  - python
draft: false
mathjax: false
---
Introduction\
For the past couple of years, I have been self-studying DSA and going through leetcode. I had several motivations:

1. I wanted to get a high paying developer job (pretty obvious motivation)
1. I am a big fan of puzzles and solving leetcode problems scratch the same itch
1. I like writing elegant, fast, simple code

This is my progress so far and my goals for the next year or so:

![problems solved by language](../../assets/images/blog/leetcode-ladder-climb/Screenshot%202026-09-02%20at%2010.04.45%E2%80%AFAM.png)

![Current progress in leetcode based on difficulty](../../assets/images/blog/leetcode-ladder-climb/Screenshot%202026-09-02%20at%2010.04.08%E2%80%AFAM.png)

The first thing that you might notice is that so far, I am an easy problem merchant. I think at this point I am comfortable enough with easies that the vast majority I can solve in less than 10 minutes unless if it's an introduction to an advanced pattern such as dynamic programming. Throughout the year I am going to focus on more advanced patterns and harder problems in order to upskill because I personally feel that I'm an "expert beginner"; really good at basis problems but struggle with the more advanced problems. \
\
The second thing you may notice is that I am absolutely a Pythonista and tend to use it for coding challenges. I am okay with this because I personally don't think leetcode is great for learning new languages and typically use other platforms such as Exercism or CodeWars. I love learning new languages and do like Java and Go for leetcode, but the difficulty with these languages is that I would need to look up the docs to use a lot of the features that I memorized in Python. For actually making personal projects I actually like Go more, but for cranking out leetcode problems in a time-sensitive environment like a coding interview I am reaching for Python.\
\
Now, if Python isn't your main programming language (such as if you specialize in Go, JS, or Java), I still think it's a really good idea to learn Python. I know what you're thinking, that learning a whole new programming language just to solve problems on a coding website it frankly ridiculous and I initially thought the same. However, after deciding to take the plunge and learn Python for leetcode and for teaching code to beginners, I definitely don't regret it. Python is the most widely used programming language in the world for a good reason: it's really nicely designed to read and write. I tend to reach for a declarative, terse, but straightforward coding style by composing a lot of simple functions and primitives together. Python goes hand-in-hand with this approach, and I feel that I can express anything in Python with really nice ergonomics. Simple stuff like:

- sorting based on ascending, descending, and passing in key functions to see what to sort by
- very handy built-in data structures such as set, dict, Counter, defaultdict, deque, heapq, and lists which support stack methods
- helpful built-in functions such as any, all, sum that turn multi-line loops into one liner statements
- fast and declarative approaches akin to map/filter/reduce with comprehensions and generators
- simple syntax that reads very close to pseudocode

The biggest time saver when deciding which language to use for coding interviews are the standard collections in the standard library. C++, C#, Kotlin, Java, and many others would be a strong choice for coding interviews if you are highly familiar with them, but I would try out Python just to see as the time savings will be a great asset in coding interviews.

Finally, I am going to showcase my approach to leetcode problems from initial ideation, to coding, to analysis. I will be going through an assortment of problems from Neetcode, Hellointerview, leetcode contest and daily problems, and interesting problems that I feel would warrant a write-up. I tend to draw with pen and paper when brainstorming, trying to picture the shape of the data as well as any data structures or algorithms to utilize initially. Then I tend to try to workshop very quickly in the code and iterate when encountering edge cases or syntactic errors (mostly as a proof of concept for initial plans, since a 30-45 minute interview gives very little leeway). Finally I refactor when I realize that my code could be simplified since when you have a working solution, you notice that you can eliminate a lot of cruft.
