/**
 * API Router
 * 
 * This will define the tRPC router for the backend.
 * Currently a placeholder - the frontend uses its own router.
 */

import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import type { Database } from '../data/database'

const t = initTRPC.create({
  transformer: superjson,
})

export const router = t.router
export const procedure = t.procedure

interface Context {
  db: Database
}

export function createRouter(_db: Database) {
  return router({
    // Placeholder for future API routes
    health: procedure.query(() => {
      return { status: 'ok' }
    }),
  })
}

export type AppRouter = ReturnType<typeof createRouter>
