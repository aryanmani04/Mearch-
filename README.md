# Mearch

A movie discovery app built with React + Vite, powered by the TMDB API.

This is my first real project after learning JavaScript and React fundamentals — components, hooks, state, routing, and working with a real external API. I wanted something I'd actually use, not just a tutorial clone.

## What it does

- Browse trending and popular movies, with a rotating hero section on the homepage
- Search TMDB's full catalog, with infinite scroll instead of pagination
- Save movies to a **Watchlist** or **Favourites**, both persisted locally
- Hover any movie card for a glassy overlay with the full description, genres, and rating
- Toast confirmations whenever you add or remove something
- A login/signup screen (UI only for now — no real backend yet)
- Scroll-to-top button, focus states, and small animations throughout

## Stack

React, React Router, Tailwind CSS, TMDB API, lucide-react icons.

## Setup

```
npm install
```

Add a `.env` file in the project root:

```
VITE_TMDB_API_KEY=your_key_here
```

```
npm run dev
```

## Status

Actively being built and tweaked. signup login  is currently just a UI shell , there's more polish to come around animations and empty states.
