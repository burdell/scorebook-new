import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { createFileRoute } from '@tanstack/react-router'
import { appRouter } from '~/trpc/router'

export const Route = createFileRoute('/api/trpc/$')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return fetchRequestHandler({
          endpoint: '/api/trpc',
          req: request,
          router: appRouter,
          createContext: () => ({}),
        })
      },
      POST: async ({ request }) => {
        return fetchRequestHandler({
          endpoint: '/api/trpc',
          req: request,
          router: appRouter,
          createContext: () => ({}),
        })
      },
    },
  },
})
