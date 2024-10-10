import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/quick')({
  component: () => <div>Hello /_private/quick!</div>,
})
