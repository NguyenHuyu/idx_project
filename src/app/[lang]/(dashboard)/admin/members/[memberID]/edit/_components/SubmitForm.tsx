'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import React from 'react'
import { User_Content_Response } from '@/types/user.types'
import { Button } from '@/components/ui/button'

interface SubmitFormProps {
  user: User_Content_Response
}

export default function SubmitForm({ user }: SubmitFormProps) {
  async function handleSubmitForm(data: FormData) {}

  return (
    <form action={handleSubmitForm} className='w-full'>
      <div className='grid grid-cols-2 py-6 gap-2'>
        <div className='flex flex-col gap-1'>
          <Label>Họ tên</Label>
          <Input defaultValue={user.fullName} />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Email</Label>
          <Input defaultValue={user.email} />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>SĐT</Label>
          <Input defaultValue={user.phone} />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Trường</Label>
          <Input defaultValue={user.school} />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Lớp</Label>
          <Input defaultValue={user.className} />
        </div>
      </div>
      <div className='flex justify-center'>
        <Button type='submit' size='sm'>
          Sửa
        </Button>
      </div>
    </form>
  )
}
