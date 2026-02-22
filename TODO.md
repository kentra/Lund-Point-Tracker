## 1. Project Overview

**Authority Tracker** is a mobile-first web application designed as a one-to-four person authority/point tracker for board games, specifically themed around the *Star Realms* card game.
The application is built on fastapi-fullstack, utilising WebSocket Streaming, SQLite, redis and taskiq.
For frontend it is using  Next.js 15(React 19 + TypeScript + Tailwind CSS v4) with Dark Mode + i18n.

### Key Features

- Supports 1 to 4 players.
- Mobile-first, responsive layouts (e.g., top player view is inverted for 2 players sitting across).
- Built-in history showing rapid point changes (+/- animations).
- Themed to match Star Realms factions (Blob, Trade Federation, Star Empire, Machine Cult).

# TODO

Feature roadmap for Star Realms Point Tracker

## High Priority

- [ ] Implement undo functionality for last authority change
- [ ] Add keyboard shortcuts for common actions

## Medium Priority

- [ ] Add sound effects for authority changes and victory
- [ ] Support for 3+ player games (commander format)
- [ ] Dark/light theme toggle
- [ ] Add custom starting authority option
- [ ] Export/import game history as JSON
- [ ] Add player color customization
- [ ] Implement turn counter

## Low Priority

- [ ] PWA support for offline use
- [ ] Add card database for reference
- [ ] Implement combat calculator
- [ ] Statistics dashboard (win rates, average game length)
- [ ] Add faction symbols/themes for players
- [ ] Multi-device sync via cloud storage

## Completed

- [x] Two-player authority tracking
- [x] Space-themed UI with animations
- [x] Match score tracking
- [x] Game history log
- [x] Local storage persistence
- [x] Responsive mobile design
- [x] Table mode for head-to-head play
