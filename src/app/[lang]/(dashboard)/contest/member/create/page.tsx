import React from 'react'
import AddMemberForm from './_components/AddMemberForm'
import { authOptions } from '@/lib/authOption'
import { getServerSession } from 'next-auth'
import { PageProps } from 'next'

export default async function AddMemberPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  return (
    <div className='w-full'>
      <h1 className='text-red-500 md:text-3xl font-bold'>Thêm thành viên</h1>
      <AddMemberForm userID={String(session?.user.token.user.id)} lang={params.lang} />
    </div>
  )
}
