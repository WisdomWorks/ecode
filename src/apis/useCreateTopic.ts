import { useMutation } from 'react-query'

import { Schema } from '@/types'

import { callAPI } from './axios'

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
