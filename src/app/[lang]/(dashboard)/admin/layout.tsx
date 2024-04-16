import { authOptions } from '@/lib/authOption'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import React from 'react'
import { Wrapper } from '@/components/Wrapper'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (session?.user.token.user.isAdmin !== true) {
    redirect('/login')
  }

  const links: any[] = [
    {
      title: 'Bài nộp',
      label: '/admin',
      href: 'submissions'
    }
  ]

  return (
    <div className='w-full'>
      <Wrapper links={links}>{children}</Wrapper>
    </div>
  )
}
