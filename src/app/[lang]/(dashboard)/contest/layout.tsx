import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOption'
import { redirect } from 'next/navigation'
import { Wrapper } from '@/components/Wrapper'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const links: any[] = [
    {
      title: 'Nộp bài',
      label: '/contest',
      href: 'submission'
    },
    {
      title: 'Tài khoản',
      label: '/contest',
      href: 'account'
    }
  ]

  return (
    <div className='w-full'>
      <Wrapper links={links}>{children}</Wrapper>
    </div>
  )
}
