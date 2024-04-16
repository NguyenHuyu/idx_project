'use client'
import React from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRightToLineIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { showSuccessNotification } from '@/lib/notification'

interface Props {
  heading: string
  title: string
  sub_heading: string
  sub_heading_link: string
  back_to_home: string
}

export default function Login({ heading, title, sub_heading, sub_heading_link, back_to_home }: Props) {
  const router = useRouter()

  async function handleAction(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')

    await signIn('credentials', {
      username: email,
      password,
      redirect: false,
      callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL
    }).then((res) => {
      if (res?.status === 401) {
        toast.error('Invalid credentials')
      } else {
        showSuccessNotification('Đăng nhập thành công')
        router.push('/')
        router.refresh()
      }
    })
  }

  return (
    <div className='flex min-h-screen'>
      <div className='w-full bg-gray-100 flex items-center justify-center'>
        <div className='max-w-md w-full p-6'>
          <h1 className='text-3xl font-semibold mb-6 text-black text-center'>{heading}</h1>
          <h1 className='text-md bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent font-semibold mb-6 t text-center'>
            {title}
          </h1>

          <form action={handleAction} className='space-y-4'>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                name='email'
                type='email'
                className='focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
              />
            </div>
            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                name='password'
                type='password'
                className='focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
              />
            </div>

            <Button className='w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300'>
              Login
            </Button>
          </form>
          <div className='mt-4 text-sm text-gray-600 text-center'>
            <p>
              {sub_heading} {''}
              <Link href='/register' className='text-black hover:underline'>
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
