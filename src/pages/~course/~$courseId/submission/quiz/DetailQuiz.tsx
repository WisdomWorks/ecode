import { SubmitHandler, useForm } from 'react-hook-form'

import { GetDetailSubmissionResponse, QuizSubmission } from '@/apis'
import { Form } from '@/components/form'
import { cn } from '@/utils'

import {
  Button,
  ButtonGroup,
  Checkbox,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'

interface Props {
  exercise: GetDetailSubmissionResponse['exercise']
  submissions: GetDetailSubmissionResponse['submissions']
}

type TForm = {
  questions: (GetDetailSubmissionResponse['exercise']['questions'][number] & {
    studentAnswer: QuizSubmission
  })[]
}

export const DetailQuiz = ({ exercise, submissions }: Props) => {
  const form = useForm<TForm>({
    defaultValues: {
      questions: exercise.questions.map(question => {
        return {
          ...question,
          studentAnswer: Array.isArray(submissions.submission)
            ? submissions.submission.find(
                item => item.questionId === question.questionId,
              )
            : undefined,
        }
      }),
    },
  })

  const handleSubmit: SubmitHandler<TForm> = _ => {}

  const questions = form.watch('questions')

  return (
    <Form
      className="flex h-full flex-col gap-4 overflow-hidden pb-3 [&_.Mui-disabled]:disabled-text-neutral-900 [&_.MuiInputBase-root]:text-neutral-900"
      form={form}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <span className="mb-3 text-lg font-semibold">
          Total:
          <span className="ml-3">{questions.length} questions</span>
        </span>
        <ButtonGroup className="flex flex-wrap">
          {questions.map((question, index) => {
            const isAnswered = question.studentAnswer.answers.length > 0
            return (
              <Button
                className={cn({
                  'bg-primary-500 text-white': isAnswered,
                })}
                key={question.questionId}
              >
                {index + 1}
              </Button>
            )
          })}
        </ButtonGroup>
      </div>
      <div className="col-span-12 grid h-full grid-cols-12 gap-4 overflow-auto">
        {questions.map((question, index) => {
          const isMultipleChoice = question.answers.length > 1
          const { choices, questionId, studentAnswer, title } = question

          return (
            <div
              className="col-span-12 mx-10 mb-5 grid grid-cols-12 gap-2 rounded-lg p-4 shadow-xl"
              key={questionId}
            >
              <div className="col-span-12 flex w-full items-center justify-between">
                <span className="col-span-12 text-base font-semibold">
                  Question {index + 1}
                </span>
              </div>
              <div className=" my-2 ml-3">{title}</div>
              <div className="col-span-12 flex flex-col gap-2">
                {!isMultipleChoice && (
                  <RadioGroup className="flex flex-col gap-2">
                    {choices.map((choice, i: number) => {
                      const checked = studentAnswer.answers.some(
                        as => as.choiceId === choice.choiceId,
                      )

                      const isCorrectAnswer = question.answers.some(
                        as => as.choiceId === choice.choiceId,
                      )
                      const isStudentWrong = !question.answers.some(
                        as => as.choiceId === choice.choiceId,
                      )

                      return (
                        <div className="flex w-full items-center" key={i}>
                          <Radio checked={checked} value={choice.choiceId} />
                          <TextField
                            className={cn({
                              'bg-success-300': isCorrectAnswer,
                              'bg-danger-300': isStudentWrong && checked,
                            })}
                            defaultValue={choice.content}
                            disabled
                            fullWidth
                          />
                        </div>
                      )
                    })}
                  </RadioGroup>
                )}
                {isMultipleChoice && (
                  <FormGroup className="flex flex-col gap-2">
                    {choices.map((choice, i) => {
                      const checked = studentAnswer.answers.some(
                        as => as.choiceId === choice.choiceId,
                      )

                      const isCorrectAnswer = question.answers.some(
                        as => as.choiceId === choice.choiceId,
                      )
                      const isStudentWrong = !question.answers.some(
                        as => as.choiceId === choice.choiceId,
                      )

                      return (
                        <div className="flex w-full items-center" key={i}>
                          <Checkbox checked={checked} />
                          <TextField
                            className={cn({
                              'bg-success-300': isCorrectAnswer,
                              'bg-danger-300': isStudentWrong && checked,
                            })}
                            defaultValue={choice.content}
                            disabled
                            fullWidth
                          />
                        </div>
                      )
                    })}
                  </FormGroup>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Form>
  )
}
