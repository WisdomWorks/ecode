import { useQuery } from 'react-query'

// interface ICode {
//   code: string
// }

const fn = async () => {
  console.log('function to fetch data')
}

export const useGetCode = () => {
  return useQuery({
    queryKey: ['code'],
    queryFn: fn,
  })
}
