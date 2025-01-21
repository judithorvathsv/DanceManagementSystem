import { createFileRoute } from '@tanstack/react-router'
import DanceClassList from '../components/DanceClassList'

export const Route = createFileRoute('/danceClassList')({
  component: DanceClassList,
})
