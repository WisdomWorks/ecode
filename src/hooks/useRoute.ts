import { useNavigate, useParams, useRouter } from '@tanstack/react-router'

export const useRoute = () => {
  const {
    state: { location },
  } = useRouter()
  const navigate = useNavigate()
  const params = useParams({ strict: false })

  return { location, navigate, params }
}
