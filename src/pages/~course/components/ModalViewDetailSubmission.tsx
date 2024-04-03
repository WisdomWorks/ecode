import {
  GetExerciseDetailToReviewProps,
  useGetExerciseDetailToReview,
} from '@/apis/useGetExerciseDetailToReview'
import { Dialog } from '@/components/common'

interface Props {
  open: boolean
  state: GetExerciseDetailToReviewProps
  toggleModal: () => void
}

export const ModalViewDetailSubmission = ({
  open,
  state,
  toggleModal,
}: Props) => {
  const { exerciseId, type, userId } = state
  const { data } = useGetExerciseDetailToReview({
    exerciseId,
    type,
    userId,
  })

  console.log(data)

  return (
    <Dialog onClose={toggleModal} open={open}>
      <h2>Modal</h2>
    </Dialog>
  )
}
