'use client'
import { createTeamMember, updateTeamMember } from '@/actions/team-member'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { showErrorNotification, showSuccessNotification } from '@/lib/notification'
import { Team_Member_Content_Response } from '@/types/team-member.types'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
  userID: string
  lang: string
  member?: Team_Member_Content_Response
}

export default function AddMemberForm({ userID, member, lang }: Props) {
  async function handleUploadMember(formData: Team_Member_Content_Response | any) {
    const fullName = formData?.get('fullName')
    const school = formData?.get('school')
    const dob = formData?.get('dob')
    const className = formData?.get('className')

    if (member) {
      const result = await updateTeamMember({
        className,
        dob,
        fullName,
        school,
        id: member.id,
        userID
      })
      if (result.status === 200) {
        showSuccessNotification(result.message)
      } else {
        showErrorNotification(result.message)
      }
    } else {
      const result = await createTeamMember({
        className,
        dob,
        fullName,
        school,
        id: Number(userID),
        lang
      })
      if (result.status === 201) {
        showSuccessNotification(result.message)
        redirect('/contest/member')
      } else {
        showErrorNotification(result.message)
      }
    }
  }
  return (
    <form action={handleUploadMember} className='py-6'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-1'>
          <Label>Họ tên</Label>
          <Input defaultValue={member?.fullName} type='text' name='fullName' required />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Trường học</Label>
          <Input defaultValue={member?.school} name='school' required />
        </div>
        <div className='flex flex-col gap-1'>
          <Label className='w-20'>Ngày sinh</Label>
          <Input defaultValue={member?.dob} type='date' name='dob' required />
        </div>
        <div className='flex flex-col gap-1'>
          <Label className='w-20'>Lớp</Label>
          <Input defaultValue={member?.className} name='className' required />
        </div>
      </div>
      <div className='flex justify-center py-4'>{member ? <Button>Cập nhật</Button> : <Button>Thêm</Button>}</div>
    </form>
  )
}
