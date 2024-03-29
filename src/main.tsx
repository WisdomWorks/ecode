import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { configAuthorization } from './apis/axios.ts'
import { useCheckSession } from './apis/useCheckSession.ts'
import { BackDropLoading } from './components/common/BackDropLoading.tsx'
import { useAppStore } from './context/useAppStore.tsx'
import { routeTree } from './generated/routeTree.gen.ts'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { SnackbarProvider } from 'notistack'

import './index.css'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    user: undefined,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const InnerApp = () => {
  const setUser = useAppStore(state => state.setUser)
  const setCourses = useAppStore(state => state.setCourses)

  const { data, isLoading } = useCheckSession()

  useEffect(() => {
    if (data) {
      const { courses, token, user } = data.data
      configAuthorization(token)
      setUser(user)
      setCourses(courses)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (isLoading) {
    return <BackDropLoading />
  }

  return (
    <SnackbarProvider autoHideDuration={2000} maxSnack={1}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouterProvider
          context={{
            user: data?.data.user || null,
          }}
          router={router}
        />
      </LocalizationProvider>
    </SnackbarProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <InnerApp />
    </QueryClientProvider>
  </React.StrictMode>,
)
