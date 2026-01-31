import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/games')({
  component: GamesLayoutComponent,
})

function GamesLayoutComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
