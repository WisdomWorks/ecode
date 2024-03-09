import { useMutation } from 'react-query'

import { Schema } from '@/types'

import { callAPI } from './axios'

export const useCreateQuizExercise = () => {
  return useMutation({
    mutationKey: ['createQuizExercise'],
    mutationFn: async (data: Schema['QuizExercise']) => {
      return await callAPI('/exercises/quiz', 'post', {
        data,
      })
    },
  })
}
