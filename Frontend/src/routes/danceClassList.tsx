import { createFileRoute } from '@tanstack/react-router'
import DanceClassList from '../pages/danceClassList'

export const Route = createFileRoute('/danceClassList')({
  component: DanceClassList,
})
