'use client'
import { updateSubmissionByID } from '@/actions/submission'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Submission_Content_Response } from '@/types/submission'

import React from 'react'

interface Props {
  userID: string
  lang: string
  submission?: Submission_Content_Response
}
export default function ReadSubmission({ userID, submission, lang }: Props) {
  return (
    <div className='py-6'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-1'>
          <Label>Nội dung</Label>
          <Textarea rows={10} disabled defaultValue={submission?.content} name='content' />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Prompt</Label>
          <Textarea rows={10} disabled defaultValue={submission?.prompt} name='prompt' />
        </div>
      </div>
    </div>
  )
}
