import React from 'react'
import { DataTable } from './_components/Table'
import { getUserInfo } from '@/actions/user'

export default async function page() {
  const users = await getUserInfo()

  return (
    <div className='w-full'>
      <h1 className='text-red-500 md:text-3xl font-bold'>Danh sách đội trưởng các đội</h1>
      <DataTable users={users} />
    </div>
  )
}
