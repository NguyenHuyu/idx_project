'use client'
import { updateUserInfo } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { showErrorNotification, showSuccessNotification } from '@/lib/notification'
import { renderDOB } from '@/lib/renderDate'
import { User_Content_Response } from '@/types/user.types'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  userID: string
  users?: User_Content_Response
}

export default function FormAccount({ userID, users }: Props) {
  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/').map(Number)
    return new Date(year, month - 1, day)
  }

  const [selectedDate, setSelectedDate] = useState<any>(parseDate(users?.dob || ''))

  const handleDateChange = (date: any) => {
    setSelectedDate(date)
  }

  async function handleUploadMember(formData: User_Content_Response | any) {
    const fullName = formData?.get('fullName')
    const school = formData?.get('school')
    const dob = selectedDate
    const province = formData?.get('province')
    const className = formData?.get('className')
    const email = formData?.get('email')
    const phone = formData?.get('phone')
    const currentDate = new Date()
    const inputDate = new Date(dob)

    const convertDateTime = renderDOB(dob)

    if (!/^\d{9,}$/.test(phone)) {
      showErrorNotification('Số điện thoại không hợp lệ')
    } else if (inputDate >= currentDate) {
      showErrorNotification('Ngày sinh phải nhỏ hơn ngày hiện tại')
    } else {
      const result = await updateUserInfo({
        ...users,
        className,
        dob: convertDateTime,
        fullName,
        school,
        id: Number(userID),
        email,
        phone,
        province
      })
      if (result?.status === 200) {
        showSuccessNotification(result?.message)
      } else {
        showErrorNotification(result?.message)
      }
    }
  }
  return (
    <form action={handleUploadMember} className='py-6'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-1'>
          <Label>Họ tên</Label>
          <Input defaultValue={users?.fullName} type='text' name='fullName' />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Trường học</Label>
          <Input defaultValue={users?.school} name='school' />
        </div>
        <div className='flex flex-col gap-1'>
          <Label className=''>Ngày sinh</Label>
          <ReactDatePicker
            id='dateInput'
            name='dob'
            className='border w-full p-0.5 rounded-md cursor-pointer'
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat='dd/MM/yyyy'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Tỉnh thành</Label>
          <Input defaultValue={users?.province} name='province' type='text' />
        </div>
        <div className='flex flex-col gap-1'>
          <Label className='w-20'>Lớp</Label>
          <Input defaultValue={users?.className} name='className' />
        </div>
        <div className='flex flex-col gap-1'>
          <Label className='w-20'>Email</Label>
          <Input defaultValue={users?.email} name='email' />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Số điện thoại</Label>
          <Input defaultValue={users?.phone} name='phone' />
        </div>
      </div>
      <div className='flex justify-center py-4'>
        <Button>Cập nhật</Button>
      </div>
    </form>
  )
}
