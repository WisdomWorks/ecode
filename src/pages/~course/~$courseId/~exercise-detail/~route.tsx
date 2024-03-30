import { beforeLoadProtected } from '@/utils'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/course/$courseId/exercise-detail')({
  beforeLoad: beforeLoadProtected,
})
