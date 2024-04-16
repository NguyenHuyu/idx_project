import React from 'react'
import { authOptions } from '@/lib/authOption'
import { getServerSession } from 'next-auth'
import Submition from '@/components/Submition'

export default async function AddSubmissionPage() {
  const session = await getServerSession(authOptions)
  const users = session?.user.token.user.id

  return (
    <div className='w-full'>
      <h1 className='text-red-500 md:text-3xl font-bold'>Nộp bài mới</h1>
      <Submition users={users} />
    </div>
  )
}
