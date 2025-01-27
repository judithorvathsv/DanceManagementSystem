import { createFileRoute } from '@tanstack/react-router'
import DetailsDanceClass from '../pages/detailsDanceClass'

export const Route = createFileRoute('/detailsDanceClass')({
  component: DetailsDanceClass,
  validateSearch: (search: Record<string, unknown>) => ({
    id: search.id as string,
  }),
})
