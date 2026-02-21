# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- AGENTS.md file with development guidelines and code style conventions

### Changed
- Optimized UI for head-to-head gameplay
- Added Table Mode (📱 button) that rotates Player 2's panel 180° for across-table play
- Larger, more prominent authority numbers for quick reading
- Bigger touch-friendly buttons with common damage values (-20, -10, -5, -1, +1, +5)
- Simplified layout with collapsible menu panel
- Win counts moved to player headers for constant visibility
- Full-screen player panels in Table Mode

## [0.1.0] - 2026-02-21

### Added
- Initial Star Realms point tracker application
- Two-player authority tracking system with starting authority of 50
- Space-themed UI with animated starfield background
- Player name customization (click to edit names)
- Authority adjustment buttons: -10, -5, -1, +1, +5
- Visual warning indicators when authority drops below 20 (warning) or 10 (danger)
- Victory screen with rainbow animation when a player reaches 0 authority
- Match score tracking across multiple games
- Game history log showing all authority changes with timestamps
- Local storage persistence for game state, scores, names, and history
- Responsive design for mobile and desktop screens
- New Game button to reset authority while preserving match score
- Reset Score button to clear match wins
