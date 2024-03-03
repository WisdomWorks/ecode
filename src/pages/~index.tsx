import { createFileRoute } from '@tanstack/react-router'

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})
