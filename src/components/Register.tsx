'use client'
import React, { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowRightToLineIcon } from 'lucide-react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { register } from '@/actions/register'
import { useRouter } from 'next/navigation'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { renderDOB } from '@/lib/renderDate'
interface Props {
  heading: string
  title: string
  fullName: string
  email: string
  phone: string
  dob: string
  school: string
  className: string
  province: string
  password: string
  confirmPassword: string
  sub_heading: string
  sub_heading_link: string
  back_to_home: string
}

export default function Register({
  heading,
  title,
  fullName,
  email,
  phone,
  dob,
  school,
  className,
  province,
  password,
  confirmPassword,
  sub_heading,
  sub_heading_link,
  back_to_home
}: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const [selectedDate, setSelectedDate] = useState<any>()

  const handleDateChange = (date: any) => {
    setSelectedDate(date)
  }

  async function handleAction(formData: any) {
    const email = formData?.get('email')
    const province = formData?.get('province')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    const fullName = formData.get('fullName')
    const phone = formData.get('phone')
    const dob = selectedDate
    const school = formData.get('school')
    const className = formData.get('className')
    const currentDate = new Date()
    const inputDate = new Date(dob)

    const convertDateTime = renderDOB(dob)

    if (password !== confirmPassword) {
      toast.error('Mật khẩu và xác nhận mật khẩu không trùng nhau')
    } else if (!/^\d{9,}$/.test(phone)) {
      toast.error('Số điện thoại không hợp lệ')
    } else if (inputDate >= currentDate) {
      toast.error('Ngày sinh phải nhỏ hơn ngày hiện tại')
    } else {
      const data = await register(email, password, fullName, phone, convertDateTime, school, className, province)
      if (data.status === 201) {
        toast.success(data.message)
        router.push('/login')
      } else {
        toast.error(data.message)
      }
    }
  }

  return (
    <div className='flex min-h-screen'>
      <div className='w-full bg-gray-100 flex items-center justify-center'>
        <div className='max-w-md w-full p-6'>
          <h1 className='text-3xl font-semibold mb-6 text-black text-center'>{heading}</h1>
          <h1 className='text-md bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent font-semibold mb-6 t text-center'>
            {title}
          </h1>

          <form ref={formRef} action={handleAction} className='space-y-4'>
            <div>
              <Label htmlFor='fullName'>{fullName}</Label>
              <Input
                name='fullName'
                type='text'
                required
                className='focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
              />
            </div>
            <div>
              <Label htmlFor='email'>{email}</Label>
              <Input
                name='email'
                type='email'
                required
                className='focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
              />
            </div>
            <div>
              <Label>{phone}</Label>
              <Input
                name='phone'
                required
                type='tel'
                maxLength={11}
                className='focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='dob'>{dob}</Label>
              <ReactDatePicker
                id='dateInput'
                name='dob'
                placeholderText='dd/MM/yyyy'
                className='border w-full p-0.5 rounded-md cursor-pointer'
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat='dd/MM/yyyy'
              />
            </div>
            <div>
              <Label htmlFor='school'>{school}</Label>
              <Input
                name='school'
                required
                type='text'
                className='focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
              />
            </div>

            <div>
              <Label htmlFor='className'>{className}</Label>
              <Input
                name='className'
                required
                type='text'
                className='focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
              />
            </div>
            <div>
              <Label htmlFor='province'>{province}</Label>
              <Input
                name='province'
                required
                type='text'
                className='focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
              />
            </div>
            <div>
              <Label htmlFor='password'>{password}</Label>
              <Input
                name='password'
                type='password'
                required
                className='focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
              />
            </div>
            <div>
              <Label htmlFor='password'>{confirmPassword}</Label>
              <Input
                type='password'
                name='confirmPassword'
                className='focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
              />
            </div>

            <Button className='w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300'>
              {heading}
            </Button>
          </form>
          <div className='mt-4 text-sm text-gray-600 text-center'>
            <p>
              {sub_heading}{' '}
              <Link href='/login' className='text-black hover:underline'>
                {sub_heading_link}
              </Link>
            </p>
            <Link href='/' className='mt-10 flex items-center gap-4 justify-center'>
              {back_to_home}
              <p className='text-black hover:underline '>
                <ArrowRightToLineIcon size={18} />
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
