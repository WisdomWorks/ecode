import { beforeLoadProtected } from '@/utils'

import { createFileRoute } from '@tanstack/react-router'

export const Course = () => {
  return (
    <div>
      <h1>Course</h1>
    </div>
  )
}

export const Route = createFileRoute('/course/_course')({
  component: Course,
  beforeLoad: beforeLoadProtected,
})
