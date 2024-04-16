import { getUserInfoDetail } from '@/actions/user'
import Hint from '@/components/Hint'
import { Button } from '@/components/ui/button'
import { authOptions } from '@/lib/authOption'
import { Edit } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import FormAccount from './_components/FormAccount'

export default async function AccountPage() {
  const session = await getServerSession(authOptions)
  const users = await getUserInfoDetail(String(session?.user.token.user.id))

  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col w-full'>
          <h1 className='text-red-500 md:text-3xl font-bold'>Thông tin tài khoản</h1>
          <FormAccount userID={String(session?.user.token.user.id)} users={users} />
        </div>
      </div>
    </div>
  )
}
