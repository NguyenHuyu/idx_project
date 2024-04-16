import React from 'react'
import { getUserInfoDetail } from '@/actions/user'
import { PageProps } from 'next'
import { Undo2Icon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { renderDate } from '@/lib/renderDate'

export default async function page({ params }: PageProps) {
  const user = await getUserInfoDetail(params.userID || '')

  return (
    <div className='w-full'>
      <Link href={`/admin/members/${params.userID}/read`} className='py-2'>
        <Undo2Icon />
      </Link>
      <div className='flex justify-between items-center'>
        <h1 className='text-center md:text-xl font-medium'>Danh sách các bài nộp của đội {user.teamName}</h1>
      </div>

      <div className='flex flex-col gap-1 py-2'>
        {user.submissions.length > 0 ? (
          user.submissions.map((submission) => (
            <div
              key={submission.id}
              className={`grid grid-cols-2 border p-3 rounded-md ${
                submission.isFinal === true ? 'border border-red-500' : ''
              }`}
            >
              <div className='flex gap-2'>Nội dung: {submission.content}</div>
              <div className='flex gap-2'>Prompt:{submission.prompt}</div>
              <div className='flex gap-2'>Thời gian nộp: {renderDate(submission?.submitTime)}</div>
              <div className='flex gap-2'>
                Ảnh:
                <Image
                  src={`https://api.siu.edu.vn/ai-paint-contest/media/${submission?.image}`}
                  width={100}
                  height={100}
                  alt={submission.content}
                />
              </div>
            </div>
          ))
        ) : (
          <div className='border p-3 rounded-md'>Không có bài nộp nào</div>
        )}
      </div>
    </div>
  )
}
