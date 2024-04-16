import React from 'react'
import { getUserInfoDetail } from '@/actions/user'
import { PageProps } from 'next'
import { EyeIcon } from 'lucide-react'
import SubmitForm from './_components/SubmitForm'
import Link from 'next/link'

export default async function page({ params }: PageProps) {
  const user = await getUserInfoDetail(params.memberID)

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-center md:text-xl font-medium'>Chi tiết thành viên</h1>
        <Link href={`/admin/members/${params.memberID}/read`}>
          <EyeIcon size={20} />
        </Link>
      </div>
      <SubmitForm user={user} />
    </div>
  )
}
