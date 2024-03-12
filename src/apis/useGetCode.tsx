// interface ICode {
//   code: string
// }

import { useQuery } from '@tanstack/react-query'

const fn = async () => {
  console.log('function to fetch data')
}

export const useGetCode = () => {
  return useQuery({
    queryKey: ['code'],
    queryFn: fn,
  })
}
