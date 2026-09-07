---
title: Backend For Box Inventory Platform
tagline: Easy cataloging and searching for your boxes
date: 2026-09-07
tags:
  - Go
  - Postgres
  - Docker
  - Docker Compose
githubUrl: https://github.com/JonHunt1995/box_backend
highlights: []
draft: false
---
# Open Source Repo For Collaborative Web App

This is a Go backend using the service and repository pattern for modularity and testability. The service pattern is used in order to declutter the http handlers from application logic, focusing on the http transport and request/response lifecycle. I utilized a SQL code generation library called sqlc for commands and queries and a db migration library called goose. I then utilized the generated sqlc code to create a repository interface that the services can consume in order to have modular data
