'use client'
import { submission } from '@/actions/submission'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { showErrorNotification, showErrorNotificationNottime, showSuccessNotification } from '@/lib/notification'
import { redirect } from 'next/navigation'

export default function Submition({ users }: { users?: any }) {
  const [file, setFile] = useState<File | null>(null)
  const formRef = React.useRef<any>(null)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]
    if (selectedFile) {
      // Kiểm tra kích thước file không quá 10MB
      if (selectedFile.size <= 10 * 1024 * 1024) {
        // Kiểm tra loại file có phải là ảnh không
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/svg+xml']
        if (allowedImageTypes.includes(selectedFile.type)) {
          // Đúng kích thước và loại file, có thể sử dụng file
          setFile(selectedFile)
        } else {
          showErrorNotificationNottime('Chỉ chấp nhận file ảnh (JPEG, PNG, GIF)))')
          setFile(null)
          formRef.current?.reset()
        }
      } else {
        showErrorNotificationNottime('Kích thước file quá lớn, hãy chọn file có kích thước nhỏ hơn 10MB')
        setFile(null)
        formRef.current?.reset()
      }
    }
  }

  async function handleSubmition(data: any) {
    const formData = new FormData()
    const content = data.get('content')
    const prompt = data.get('prompt')

    const dataFileBlob = new Blob(
      [
        JSON.stringify({
          content,
          prompt,
          user: {
            id: users
          }
        })
      ],
      {
        type: 'application/json'
      }
    )
    formData.append('image', file as any)
    formData.append('submission', dataFileBlob as any)
    formData.append('users', users as any)

    const result = await submission(formData)

    if (result.status === 201) {
      showSuccessNotification(result.message)
      redirect('/contest/submission')
    } else {
      showErrorNotification(result.message)
    }
  }

  return (
    <>
      <form ref={formRef} action={handleSubmition} className='space-y-2 py-4'>
        <div className='flex flex-col gap-2'>
          <Label>Nội dung</Label>
          <Input type='text' name='content' required />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Prompt</Label>
          <Input type='text' name='prompt' required />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>
            File <strong>(*ảnh tối đa 10mb)</strong>
          </Label>
          <Input type='file' onChange={handleFileChange} required accept='image/*' className='p-2' />
        </div>
        <div className='flex justify-center py-4'>
          <Button>Submit</Button>
        </div>
      </form>
    </>
  )
}
