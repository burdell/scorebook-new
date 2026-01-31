import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'
import type { AppRouter } from './router'

// Client-side tRPC setup
export const trpc = createTRPCReact<AppRouter>()

export function createTRPCClientInstance() {
  return createTRPCClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  })
}
