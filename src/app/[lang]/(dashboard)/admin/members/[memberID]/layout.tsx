import React from 'react'
import { authOptions } from '@/lib/authOption'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { getUserInfo } from '@/actions/user'
import { WrapperByID } from '@/components/WrapperByID'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const users = await getUserInfo()

  return (
    <div className='w-full'>
      <WrapperByID users={users}>{children}</WrapperByID>
    </div>
  )
}
