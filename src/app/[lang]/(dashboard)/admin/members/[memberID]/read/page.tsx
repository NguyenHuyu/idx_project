import React from 'react'
import { getUserInfoDetail } from '@/actions/user'
import { PageProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { renderDate } from '@/lib/renderDate'

export default async function page({ params }: PageProps) {
  const user = await getUserInfoDetail(params.memberID || '')
  const submissions = user?.submissions?.filter((item) => item.isFinal === true) || []

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center py-4'>
        <h1 className='text-center md:text-xl font-semibold'>Chi tiết đội {user?.teamName}</h1>
      </div>

      <div className='flex flex-col gap-1 py-2'>
        <strong> Thông tin nhóm trưởng </strong>
        <div className='grid grid-cols-2 border  p-3 rounded-md'>
          <p>
            <strong>Họ tên: </strong> {user.fullName}
          </p>
          <p>
            <strong>Email: </strong> {user.email}
          </p>
          <p>
            <strong>SĐT: </strong> {user.phone}
          </p>
          <p>
            <strong>Trường: </strong> {user.school}
          </p>
          <p>
            <strong>Lớp: </strong> {user.className}
          </p>
        </div>
      </div>

      <div className='flex flex-col gap-1 py-2'>
        <strong> Thành viên nhóm </strong>
        {user?.teamMembers?.length > 0 ? (
          user?.teamMembers?.map((member) => (
            <div key={member.id} className='grid grid-cols-2 border p-3 rounded-md'>
              <div className='flex gap-2'>Tên: {member.fullName}</div>
              <div className='flex gap-2'>Trường:{member.school}</div>
              <div className='flex gap-2'>Ngày sinh:{member.dob}</div>
              <div className='flex gap-2'>Lớp:{member.className}</div>
            </div>
          ))
        ) : (
          <div className='border p-3 rounded-md'>Không có thành viên nào</div>
        )}
      </div>
      <div className='flex flex-col gap-1 py-2'>
        <div className='flex justify-between'>
          <strong>Bài nộp: </strong>
          <Link href={`/admin/submissions/${params.memberID}`} className='font-bold text-red-500'>
            Xem tất cả bài đã nộp của đội
          </Link>
        </div>

        {submissions?.length > 0 ? (
          submissions.map((submission) => (
            <div key={submission.id} className='border p-3 rounded-md'>
              <div className='grid grid-cols-2 '>
                <div className='flex gap-2'>Nội dung: {submission?.content}</div>
                <div className='flex gap-2'>Prompt: {submission?.prompt}</div>
                <div className='flex gap-2'>Thời gian nộp: {renderDate(submission?.submitTime)}</div>
              </div>
              <div className='flex flex-col gap-2 w-full'>
                Ảnh:
                <Link target='_blank' href={`https://api.siu.edu.vn/ai-paint-contest/media/${submission?.image}`}>
                  <Image
                    src={`https://api.siu.edu.vn/ai-paint-contest/media/${submission?.image}`}
                    width={2000}
                    height={2000}
                    alt={submission?.content}
                  />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className='border p-3 rounded-md'>Không có thành viên nào</div>
        )}
      </div>
    </div>
  )
}
