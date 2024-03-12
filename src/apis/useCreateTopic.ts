import { Schema } from '@/types'

import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'

export const useCreateTopic = () => {
  return useMutation({
    mutationFn: async (data: Schema['CreateTopicRequest']) => {
      return callAPI('/topics', 'post', {
        data,
      })
    },
    mutationKey: ['createTopic'],
  })
}
