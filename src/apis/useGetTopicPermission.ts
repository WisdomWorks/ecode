import { TGroup } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

interface Props {
  isEnabled: boolean
  topicId: string
}

export const useGetTopicPermission = ({ isEnabled, topicId }: Props) => {
  return useQuery<AxiosResponse<TGroup[]>, AxiosResponseError>({
    queryKey: ['getTopicPermission', topicId],
    queryFn: async ({ queryKey }) => {
      // Update the type of the parameter to match the expected type
      const topicId = queryKey[1]
      return await callAPI('/topics/view', 'get', {
        params: {
          topicId,
        },
      })
    },
    enabled: !!topicId && isEnabled,
  })
}
