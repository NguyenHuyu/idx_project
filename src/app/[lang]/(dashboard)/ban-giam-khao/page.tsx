import Image from 'next/image'
import React from 'react'
import Image1 from '../../../../../public/image1.png'
import GS from '../../../../../public/imagegs.png'

import { Mail, Phone, Timer } from 'lucide-react'
import { Metadata, PageProps } from 'next'
import { getDictionary } from '@/lib/dictionary'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { judging_panel_page } = await getDictionary(params.lang)
  return {
    title: judging_panel_page.title,
    description: judging_panel_page.title
  }
}

const data = [
  {
    title: 'GS.TSKH. Hoàng Văn Kiếm'
  },
  {
    title: 'TS.Huỳnh Ngọc Tín'
  },
  {
    title: 'TS.Đinh Thị Thu Hương'
  },
  {
    title: 'Họa sĩ Nguyễn Quân 1'
  },
  {
    title: 'Họa sĩ Nguyễn Quân 2'
  }
]

export default async function page({ params }: PageProps) {
  const { judging_panel_page } = await getDictionary(params.lang)

  return (
    <div className='w-full'>
      <div className='max-w-4xl mx-auto py-10 space-y-6'>
        <h1 className='text-3xl font-bold text-red-500 text-center'>{judging_panel_page.heading}</h1>
        <Image src={Image1} width={1000} height={1000} alt='SIU - AILAB' />
      </div>
      <div className='max-w-5xl mx-auto p-4'>
        <div className='grid grid-cols-3 md:grid-cols-5 gap-6'>
          {data.map((item) => (
            <div key={item.title} className='flex flex-col gap-2'>
              <Image src={GS} width={2000} height={2000} alt='SIU - AILAB' className='' />
              <p className='text-sm text-center'>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
