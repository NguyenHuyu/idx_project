import React from 'react'
import { authOptions } from '@/lib/authOption'
import { getServerSession } from 'next-auth'
import AddMemberForm from '../create/_components/AddMemberForm'
import { PageProps } from 'next'
import { getTeamMemberDetail } from '@/actions/team-member'

export default async function AddMemberPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  const member = await getTeamMemberDetail(params.memberID)

  return (
    <div className='w-full'>
      <h1 className='text-red-500 md:text-3xl font-bold'>Chỉnh sửa thành viên</h1>
      <AddMemberForm lang={params.lang} member={member} userID={String(session?.user.token.user.id)} />
    </div>
  )
}
