import { TCourse } from '@/types'

import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useGetCourseDetail = ({ courseId }: { courseId: string }) => {
  return useQuery<
    AxiosResponse<TCourse>,
    AxiosError<AxiosResponseError>,
    AxiosResponse<TCourse>
  >({
    queryKey: ['course-detail', courseId],
    queryFn: async () => {
      return await callAPI(`/courses/${courseId}` as Path, 'get')
    },
    enabled: !!courseId,
  })
}
