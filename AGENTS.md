# AGENTS.md - Scorebook Project

## Project Overview

Scorebook is a baseball scorecard visualization application built with TanStack Start. It displays baseball game data including scorecards, lineups, pitching rotations, and game statistics.

## Tech Stack

- **Framework**: TanStack Start (full-stack React framework)
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: File-based routing via TanStack Router
- **Data**: Server functions with TanStack Start
- **Scorekeeping Library**: scorekeepr (locally linked npm package)
- **Component Development**: Ladle (Storybook alternative)

## Project Structure

```
scorebook-tanstack/
├── app/                          # Application entry points
│   ├── client.tsx               # Client-side hydration entry
│   └── ssr.tsx                  # Server-side rendering handler
├── src/
│   ├── games/                   # Games/Scorecards domain
│   │   ├── components/          # Game-specific components
│   │   │   ├── ScorecardGrid.tsx
│   │   │   └── ScorecardList.tsx
│   │   └── api.ts               # Game data fetching & types
│   ├── shared/                  # Shared/common code
│   │   ├── components/          # Shared UI components
│   │   │   ├── DefaultCatchBoundary.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── PostError.tsx
│   │   │   └── UserError.tsx
│   │   └── utils/               # Shared utilities
│   │       ├── loggingMiddleware.tsx
│   │       ├── posts.tsx
│   │       ├── users.tsx
│   │       └── seo.ts
│   ├── routes/                  # File-based routes (auto-generated)
│   │   ├── __root.tsx           # Root layout
│   │   ├── index.tsx            # Home page
│   │   ├── games.tsx            # Games layout
│   │   ├── games.index.tsx      # Games list
│   │   ├── games.$gameId.tsx    # Individual game view
│   │   └── ...                  # Other routes
│   ├── styles/                  # Global styles
│   │   └── app.css
│   └── router.tsx               # Router configuration
├── backend/                     # Future backend scaffolding
│   ├── src/api/                 # API routes
│   ├── src/data/                # Database layer
│   ├── src/ingestion/           # Data pipeline
│   └── src/types/               # Type definitions
└── node_modules/scorekeepr      # Linked local package
```

## Code Organization

### Games (`src/games/`)

Everything related to baseball games and scorecards:
- **Components**: ScorecardGrid, ScorecardList
- **API**: Data fetching functions and type exports from scorekeepr
- **Future**: Hooks, utilities specific to games

### Shared (`src/shared/`)

Common components and utilities used across the app:
- **Components**: Error boundaries, NotFound, loading states
- **Utils**: SEO helpers, logging, shared data fetching

### Routes (`src/routes/`)

TanStack Router file-based routes. Routes should be **thin** and import from domains:

```typescript
// Good: Route imports from domain
import { getScorecards } from '~/games/api'
import { ScorecardList } from '~/games/components/ScorecardList'

// Bad: Route contains business logic
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit
```

## Working with scorekeepr

The `scorekeepr` library is linked locally from `/Users/nathangriffin/Development/scorekeepr`.

### Making Changes to scorekeepr

1. Edit files in `/Users/nathangriffin/Development/scorekeepr`
2. If you add new exports, rebuild: `cd /Users/nathangriffin/Development/scorekeepr && npm run build`
3. Changes are automatically reflected in scorebook-tanstack

### scorekeepr Types

Key types exported from scorekeepr and re-exported in `games/api.ts`:
- `GameOutput` - Complete game data structure
- `GameInfo` - Game metadata (teams, date, location)
- `Gameplay` - Inning-by-inning game events
- `GameStats` - Runs, hits, errors
- `BatterEntry` / `PitcherEntry` - Player lineup entries
- `Team` - Team information

## File Naming Conventions

- **Routes**: Use TanStack Router's file-based convention
  - `index.tsx` - Route index
  - `$param.tsx` - Dynamic route parameters
  - `{splat}.tsx` - Catch-all routes
- **Feature Components**: PascalCase (e.g., `ScorecardGrid.tsx`)
- **API/Utils**: camelCase (e.g., `api.ts`)

## Route Structure

Routes are automatically generated from files in `src/routes/`:

| File Path | Route Path |
|-----------|------------|
| `routes/index.tsx` | `/` |
| `routes/games.tsx` | `/games` (layout) |
| `routes/games.index.tsx` | `/games` |
| `routes/games.$gameId.tsx` | `/games/:gameId` |

## Data Flow

1. Routes define `loader` functions that fetch data server-side
2. Components use `Route.useLoaderData()` to access loaded data
3. Mock data is defined in `src/games/api.ts`
4. Future: Data will come from backend API/ingestion pipeline

## Key Files

- `app/client.tsx` - Client entry
- `app/ssr.tsx` - Server entry
- `src/router.tsx` - Router configuration
- `src/routes/__root.tsx` - Root layout with navigation
- `src/games/api.ts` - Game data and types

## Common Issues

1. **Module not found: scorekeepr**
   - Ensure link is set up: `npm link scorekeepr`
   - Check that scorekeepr has been built: `cd ../scorekeepr && npm run build`

2. **Type errors in components**
   - Check that types match scorekeepr's GameOutput structure
   - Lineup data is `BatterEntry[][]` not `BatterEntry[][][]`

3. **Import path errors**
   - Use `~/` prefix with feature folder name
   - Example: `import { getScorecards } from '~/games/api'`

## Future Development

The `/backend` folder is scaffolding for:
- API implementation
- Database layer (PostgreSQL/SQLite)
- Data ingestion pipeline from external sources (MLB API, Retrosheet)
- Data processing and statistics calculation

## Testing

Currently no tests are set up. When adding tests:
- Use Vitest (already popular in the TanStack ecosystem)
- Place tests alongside components (e.g., `games/components/ScorecardGrid.test.tsx`)

## Build Output

Production build outputs to `.output/` directory:
- `.output/public/` - Static assets
- `.output/server/` - Server bundle

## Component Development with Ladle

Ladle is set up for developing UI components in isolation. It's a lightweight alternative to Storybook.

### Available Commands

```bash
# Start Ladle dev server
npm run ladle:dev

# Build static storybook
npm run ladle:build

# Preview built storybook
npm run ladle:preview
```

### Creating Stories

Stories are automatically discovered from files matching `src/**/*.stories.{js,jsx,ts,tsx}`.

Place stories alongside your components:

```
src/
├── games/
│   └── components/
│       ├── ScorecardGrid.tsx
│       ├── ScorecardGrid.stories.tsx  ← Story for ScorecardGrid
│       ├── ScorecardList.tsx
│       └── ScorecardList.stories.tsx  ← Story for ScorecardList
```

### Story Format

```typescript
import type { Story } from "@ladle/react";
import { ScorecardGrid } from "./ScorecardGrid";

// Mock data for your component
const mockGame = { ... };

export const Default: Story = () => (
  <ScorecardGrid scorecard={mockGame} />
);

export const ExtraInnings: Story = () => {
  const extraInningsGame = { ... };
  return <ScorecardGrid scorecard={extraInningsGame} />;
};
```

### Ladle Configuration

- `.ladle/config.mjs` - Main configuration
- `.ladle/components.tsx` - Global provider (adds Tailwind CSS)

### Available Addons

Ladle is configured with these addons enabled:
- **a11y** - Accessibility checks
- **action** - Action logging
- **control** - Component controls
- **mode** - Fullscreen/zoom modes
- **rtl** - Right-to-left toggle
- **source** - Source code viewer
- **theme** - Light/dark mode
- **width** - Responsive viewport sizes

## Resources

- [TanStack Start Docs](https://tanstack.com/start)
- [TanStack Router Docs](https://tanstack.com/router)
- [scorekeepr Repository](../scorekeepr)
- [Ladle Docs](https://ladle.dev)
