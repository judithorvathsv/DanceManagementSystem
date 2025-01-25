import { createFileRoute } from '@tanstack/react-router'
import DanceClassList from '../components/danceClassList'

export const Route = createFileRoute('/danceClassList')({
  component: DanceClassList,
})
