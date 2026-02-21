# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Project Overview

Star Realms Point Tracker - A static web application for tracking authority points in the Star Realms tabletop card game. Built with vanilla HTML, CSS, and JavaScript with a space-themed UI.

## Development Commands

### Running the Application
```bash
open index.html
# Or use a local server:
npx serve .
python -m http.server 8000
```

### Linting and Formatting
```bash
npm install                    # Install dev dependencies
npm run lint                   # Run ESLint
npm run lint:fix              # ESLint with auto-fix
npm run format                # Format with Prettier
npm run format:check          # Check formatting
```

### Testing
```bash
npm test                      # Run all tests
npm test -- path/to/test.spec.js  # Run single test file
npm run test:watch            # Watch mode
```

## Code Style Guidelines

### JavaScript

**Formatting:** 4-space indentation, no semicolons, single quotes for strings, template literals for interpolation.

**Naming:** `camelCase` for variables/functions, `UPPER_CASE` for constants, `PascalCase` for constructors.

**Best Practices:**
- Use `const` by default, `let` only when reassignment needed
- Early returns to reduce nesting
- Optional chaining (`?.`) and nullish coalescing (`??`) for safety

```javascript
const STARTING_AUTHORITY = 50

function changeAuthority(player, amount) {
    if (gameOver && amount < 0) return
    
    const name = player === 1 
        ? document.getElementById('name1').value 
        : document.getElementById('name2').value
    
    if (player === 1) {
        player1Authority = Math.max(0, player1Authority + amount)
        updateAuthorityDisplay(1)
    }
}
```

### CSS

**Formatting:** 4-space indentation, space after colon, blank line between rule sets, related properties grouped.

**Naming:** `kebab-case` for classes, BEM-inspired (`.block`, `.block__element`, `.block--modifier`), semantic names over presentational.

**Structure:** Reset/base → Layout → UI components → State classes → Animations → Media queries (at bottom).

```css
.player {
    background: linear-gradient(145deg, rgba(30, 30, 60, 0.9), rgba(20, 20, 40, 0.9));
    border-radius: 20px;
    padding: 25px;
}

.player-1 {
    border-color: #4444ff;
}

@media (max-width: 600px) {
    .player { padding: 15px; }
}
```

### HTML

**Formatting:** 4-space indentation, double quotes for attributes.

**Conventions:** Semantic HTML5 elements, `id` for JavaScript hooks only, `class` for styling. Inline event handlers acceptable for simple apps.

## Architecture Patterns

### State Management
Global state variables at top of file. Single source of truth. State changes trigger UI updates.

```javascript
let player1Authority = 50
let player2Authority = 50
```

### Persistence
localStorage for saving game state. JSON serialization with try-catch. Load on init, save on every change.

```javascript
function saveState() {
    const state = { player1Authority, player2Authority }
    localStorage.setItem('starRealmsTracker', JSON.stringify(state))
}

function loadState() {
    try {
        const saved = localStorage.getItem('starRealmsTracker')
        if (saved) {
            const state = JSON.parse(saved)
            player1Authority = state.player1Authority ?? STARTING_AUTHORITY
        }
    } catch (e) {
        console.error('Failed to load state:', e)
    }
}
```

### DOM Manipulation
Cache DOM references when used multiple times. Template literals for HTML generation. Class toggles for state changes.

## Error Handling

- Wrap JSON.parse in try-catch
- Provide fallback values with nullish coalescing
- Log errors to console for debugging
- Graceful degradation if localStorage unavailable

## File Organization

```
/
├── index.html          # Main HTML structure
├── styles.css          # All styles
├── app.js              # Application logic
├── CHANGELOG.md        # Version history
├── TODO.md             # Feature roadmap
├── AGENTS.md           # This file
├── .eslintrc.json      # ESLint configuration
└── .prettierrc         # Prettier configuration
```

## Documentation Requirements

### CHANGELOG.md
Update after each significant change:
- New features → Added
- Bug fixes → Fixed
- Breaking changes → Changed/Removed

### TODO.md
Update when: new features planned, features completed (move to Completed), priorities change.

## Comments Policy

Do not add comments unless explicitly requested. Code should be self-documenting through clear naming and simple logic.
