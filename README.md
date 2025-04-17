# 📰 RSS Feed App
A frontend application for reading and managing RSS feeds, built with Next.js and React.

## Features
  1. Add and edit RSS feeds
  2.Subscribe to and persist added feeds
  3.Sort articles by publication date (newest first)
  4.Preview individual articles with a link to the original source
  5.Add, remove, and filter favorite articles
  6.Filter articles by title
  7. Filter view to show only favorites

## Tech Stack
Next.js + React
Tanstack Query – data fetching and subscription handling
styled-components – component styling
date-fns – date formatting
lodash – utility functions
Markdown parser for rendering article content

## 🚀 Demo
Here you can find working demo:
🔗 [demo](https://rssfeed-one.vercel.app/)

## Side Notes
Due to CORS policy, feed parsing is handled on the backend (Next.js API routes), and the frontend fetches pre-processed data. Subscriptions are managed using Tanstack Query with a refresh interval of 1 second. Articles are rendered using Markdown for better readability.

## Author
Paweł Jakubowski
🔗 [LinkedIn](https://www.linkedin.com/in/pawel-jakubowski-programmer/) 
