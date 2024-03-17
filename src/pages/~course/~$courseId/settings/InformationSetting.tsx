import { SubmitHandler, useForm } from 'react-hook-form'

import { useUpdateCourse } from '@/apis'
import { Form, FormInput } from '@/components/form'
import { useToastMessage } from '@/hooks'
import { TCourse } from '@/types'

import { ManageCourseSchema } from '../../shema/manageCourse.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowDownward } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface Props {
  courseDetail?: TCourse
  refetchCourse: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
}

export const InformationSetting = ({ courseDetail, refetchCourse }: Props) => {
  const { setErrorMessage, setSuccessMessage } = useToastMessage()
  const { isPending, mutate } = useUpdateCourse()

  const form = useForm<TCourse>({
    defaultValues: courseDetail,
    resolver: zodResolver(ManageCourseSchema),
  })

  const { control } = form
  if (!courseDetail) return null

  const handleSubmit: SubmitHandler<TCourse> = data => {
    mutate(
      {
        ...data,
        teacherId: courseDetail.teacher.userId,
        courseId: String(courseDetail.courseId),
      },
      {
        onSuccess: () => {
          setSuccessMessage('Course information updated')
          refetchCourse()
        },
        onError: error => {
          setErrorMessage(
            error.response?.data.message || 'Something went wrong',
          )
        },
      },
    )
  }

  return (
    <Accordion>
      <AccordionSummary
        aria-controls="panel1-content"
        expandIcon={<ArrowDownward />}
        id="panel1-header"
      >
        <Typography variant="h3">Information Management</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Form form={form} onSubmit={handleSubmit}>
          <div className="col-span-12 grid grid-cols-12 gap-4">
            <FormInput
              className="col-span-4"
              control={control}
              label="Course name"
              name="courseName"
              placeholder="Fill the course name"
              required
            />
            <FormInput
              className="col-span-2"
              control={control}
              label="Semester"
              name="semester"
              placeholder="Fill the semester"
              required
            />
          </div>
          <div className="col-span-12 grid grid-cols-12 gap-4">
            <FormInput
              className="col-span-9"
              control={control}
              label="Description"
              maxRows={5}
              multiline
              name="description"
              placeholder="Fill the description"
              rows={3}
            />
          </div>
          <div className="col-span-12 flex justify-end">
            <Button
              className="submitBtn"
              disabled={isPending}
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </div>
        </Form>
      </AccordionDetails>
    </Accordion>
  )
}
