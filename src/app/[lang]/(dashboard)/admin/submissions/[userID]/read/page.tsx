import React from 'react'
import ReadSubmission from '../../_components/ReadSubmission'
import { authOptions } from '@/lib/authOption'
import { getServerSession } from 'next-auth'
import { PageProps } from 'next'
import { getSubmissionID } from '@/actions/submission'

export default async function page({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  const submission = await getSubmissionID(params.userID || '')

  return (
    <div className='w-full'>
      <h1 className='text-red-500 md:text-3xl font-bold'>Chi tiết bài nộp</h1>
      <ReadSubmission lang={params.lang} submission={submission} userID={String(session?.user.token.user.id)} />
    </div>
  )
}
