import React from 'react'
import { DataTable } from './_components/Table'
import { getSubmissions } from '@/actions/submission'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOption'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageProps } from 'next'

export default async function page({ searchParams }: PageProps) {
  const submissions = await getSubmissions(searchParams)
  const user = await getServerSession(authOptions)

  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <h1 className='text-red-500 md:text-3xl font-bold py-4'>Bài nộp</h1>
        <div className='flex items-center p-4 gap-1'>
          <Link href='https://api.siu.edu.vn/ai-paint-contest/submission/export'>
            <Button>Excel Hình</Button>
          </Link>
          <Link href='https://api.siu.edu.vn/ai-paint-contest/submission/export-image'>
            <Button>Excel Nội dung</Button>
          </Link>
        </div>
      </div>
      <DataTable submissions={submissions} user={user} />
    </div>
  )
}
