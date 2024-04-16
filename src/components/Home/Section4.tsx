import Image from 'next/image'
import React from 'react'
import ImageS4 from '../../../public/image-section4.png'
import type { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import Link from 'next/link'

interface PropsSection4 {
  params: {
    lang: Locale
  }
}

export default async function Section4({ params }: PropsSection4) {
  const { section4 } = await getDictionary(params.lang)

  return (
    <div className=' py-4 w-full'>
      <div className='flex flex-col  md:flex-row max-w-4xl mx-auto w-full gap-6 md:gap-10'>
        <div className='md:basic-4/5 w-full flex flex-col justify-center items-center gap-2'>
          <h2 className='flex pt-4 justify-center text-center items-center h-full text-2xl max-w-xl mx-auto font-bold text-red-700'>
            {section4.heading}
          </h2>
          <div className='w-full'>
            <div className=' flex flex-col justify-center items-start'>
              <div>
                <span className='text-center text-sm pl-4'>{section4.content}</span>
                <Link href={`/${params.lang}/register`} className='underline'>
                  {section4.content_link}
                </Link>
              </div>
              <span className='text-center text-sm px-4'>{section4.content2}</span>
            </div>
            <div className='flex flex-col justify-center'>
              <h2 className='flex py-5 justify-center text-center items-center h-full text-2xl max-w-xl mx-auto font-bold text-red-700'>
                {section4.heading_2}
              </h2>

              {params.lang === 'vi' ? (
                <div className='flex flex-col text-sm px-4'>
                  <p>
                    <strong>Bảng A:</strong> Học sinh Trung Học Phổ Thông trên cả nước.
                  </p>
                  <p>
                    <strong>Bảng B:</strong> Học sinh Trung Học Cơ Sở trên cả nước.
                  </p>
                </div>
              ) : (
                <div className='flex flex-col text-sm px-4'>
                  <p>
                    <strong>Group A:</strong> High school students nationwide.
                  </p>
                  <p>
                    <strong>Group B:</strong> Secondary school students nationwide.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='md:basic-1/5 w-full'>
          <Image
            src={ImageS4}
            alt='SIU AI Art Contest - Cuộc thi vẽ tranh cùng AI'
            width={300}
            height={300}
            className='w-full md:-translate-y-6'
          />
        </div>
      </div>
    </div>
  )
}
