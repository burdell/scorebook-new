# Scorebook - Baseball Scorecard Viewer

A TanStack Start application for viewing baseball game scorecards.

## Features

- Visual scorecard grids with inning-by-inning scoring
- Team lineups and pitching rotations
- Game statistics and summaries
- Built with TanStack Start + React + TypeScript

## Linked Dependencies

### scorekeepr (local development)

This project uses the `scorekeepr` library for baseball scorekeeping data types. The package is linked locally so you can make changes to the library and see them immediately.

**Setup:**
```bash
# Link is already configured, but if you need to set it up:
cd /Users/nathangriffin/Development/scorekeepr
npm link

cd /Users/nathangriffin/Development/scorebook-tanstack
npm link scorekeepr
```

**Development workflow:**
1. Make changes to `scorekeepr` library in `/Users/nathangriffin/Development/scorekeepr`
2. If you add new exports, make sure to rebuild: `npm run build` in the scorekeepr directory
3. Changes are automatically reflected in scorebook-tanstack (no reinstall needed)

## Development

```bash
npm install
npm run dev
```

The app runs at http://localhost:3000

## Backend Structure

The `/backend` folder contains scaffolding for a future API and data ingestion pipeline that will use scorekeepr to process game data.

## Build

```bash
npm run build
```
