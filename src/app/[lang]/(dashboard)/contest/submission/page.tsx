import React from 'react'
import { DataTable } from './_components/Table'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOption'
import { getUserInfoDetail } from '@/actions/user'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function page() {
  const session = await getServerSession(authOptions)
  const users = await getUserInfoDetail(String(session?.user.token.user.id))
  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-red-500 md:text-3xl font-bold'>Nộp bài</h1>
        </div>
        <div className='flex items-center p-4'>
          <Link href='/contest/submission/create'>
            <Button>Nộp bài mới</Button>
          </Link>
        </div>
      </div>
      <DataTable users={users} />
    </div>
  )
}
