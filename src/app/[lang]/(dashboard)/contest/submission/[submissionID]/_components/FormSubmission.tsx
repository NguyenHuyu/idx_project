'use client'
import { updateSubmissionByID } from '@/actions/submission'
import { createTeamMember, updateTeamMember } from '@/actions/team-member'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { showErrorNotification, showSuccessNotification } from '@/lib/notification'
import { Submission_Content_Response } from '@/types/submission'
import { Team_Member_Content_Response } from '@/types/team-member.types'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  userID: string
  lang: string
  submission?: Submission_Content_Response
}
export default function FormSubmission({ userID, submission, lang }: Props) {
  async function handleUpdateSubmission(formData: Team_Member_Content_Response | any) {
    const content = formData?.get('content')
    const prompt = formData?.get('prompt')

    const result = await updateSubmissionByID({
      ...submission,
      content,
      prompt,
      user: {
        id: userID
      }
    })
    if (result.status === 200) {
      showSuccessNotification(result.message)
    } else {
      showErrorNotification(result.message)
    }
  }

  return (
    <form action={handleUpdateSubmission} className='py-6'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-1'>
          <Label>Nội dung</Label>
          <Textarea defaultValue={submission?.content} required name='content' />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Prompt</Label>
          <Textarea defaultValue={submission?.prompt} required name='prompt' />
        </div>
      </div>
      <div className='flex justify-center py-4'>{submission ? <Button>Cập nhật</Button> : <Button>Thêm</Button>}</div>
    </form>
  )
}
