import React from 'react'
import { authOptions } from '@/lib/authOption'
import { getServerSession } from 'next-auth'
import { PageProps } from 'next'
import FormSubmission from './_components/FormSubmission'
import { getSubmissionID } from '@/actions/submission'

export default async function SubmissionIDPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  const submission = await getSubmissionID(params.submissionID || '')

  return (
    <div className='w-full'>
      <h1 className='text-red-500 md:text-3xl font-bold'>Chỉnh sửa bài nộp</h1>
      <FormSubmission lang={params.lang} submission={submission} userID={String(session?.user.token.user.id)} />
    </div>
  )
}
