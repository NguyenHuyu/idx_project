import { getUserInfoDetail } from '@/actions/user'
import React from 'react'
import { DataTable } from './_components/Table'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOption'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Edit } from 'lucide-react'
import Hint from '@/components/Hint'
import { renderDOB } from '@/lib/renderDate'

export default async function page() {
  const session = await getServerSession(authOptions)
  const user = await getUserInfoDetail(String(session?.user.token.user.id))

  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-red-500 md:text-3xl font-bold'>Thành viên đội</h1>
          <h2 className='text-md font-bold pt-2'>Thông tin đội trưởng</h2>
          <div className='flex items-start py-2'>
            <div className='px-2'>
              <p>Họ và tên: {user.fullName}</p>
              <p>Email: {user.email}</p>
              <p>Ngày sinh: {renderDOB(user.dob)}</p>
              <p>Tên đội: {user.teamName}</p>
              <p>Số điện thoại: {user.phone}</p>
              <p>Trường: {user.school}</p>
              <p>Lớp: {user.className}</p>
            </div>
            <Hint label='Chỉnh sửa thông tin đội trưởng'>
              <Link href={`/contest/account`}>
                <Edit />
              </Link>
            </Hint>
          </div>
        </div>
        <div className='flex items-center p-4'>
          <Link href='/contest/member/create'>
            <Button>Thêm thành viên</Button>
          </Link>
        </div>
      </div>
      <h2 className='text-md font-bold pt-2'>Thông tin thành viên khác</h2>
      <DataTable user={user} />
    </div>
  )
}
