import { Schema } from '@/types'

import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'

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
