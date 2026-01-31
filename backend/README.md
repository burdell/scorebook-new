# Scorebook Backend

This directory contains the backend services for the Scorebook application.

## Structure

- `src/api/` - API endpoints and routing (future tRPC or REST implementation)
- `src/data/` - Data models, database schemas, and data access layer
- `src/ingestion/` - Data ingestion pipeline for importing game data
- `src/types/` - Shared TypeScript types
- `tests/` - Backend tests
- `config/` - Configuration files

## Future Implementation

The backend will eventually include:
- tRPC router for type-safe API
- Database layer (PostgreSQL/SQLite) for storing game data
- Ingestion pipeline to pull data from external sources (MLB API, retrosheet, etc.)
- Data processing and statistics calculation

## Current Status

Currently using mock data in the frontend. Backend infrastructure is scaffolded for future development.
