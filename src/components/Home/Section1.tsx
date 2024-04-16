import Image from 'next/image'
import React from 'react'
import type { Locale } from '@/i18n.config'
import ImageSetion1 from '../../../public/image-section1.png'
import { getDictionary } from '@/lib/dictionary'

interface PropsSection1 {
  params: {
    lang: Locale
  }
}

export default async function Section1({ params }: PropsSection1) {
  const { section1 } = await getDictionary(params.lang)

  return (
    <div className='w-full md:p-10'>
      <div className='flex flex-col md:flex-row gap-4 mx-auto max-w-4xl'>
        <div className='md:basis-1/2'>
          <Image
            src={ImageSetion1}
            className='w-full rounded-md'
            alt='SIU AI Art Contest - Cuộc thi vẽ tranh cùng AI'
            width={300}
            height={300}
          />
        </div>
        <div className='md:basis-1/2 text-justify flex items-center flex-col gap-4 p-3 md:p-0'>
          <h1 className={`text-center md:text-left text-[33px] font-semibold  `}>
            {params.lang === 'vi' ? (
              <div>
                Cuộc thi <strong>Vẽ tranh cùng AI</strong>
              </div>
            ) : (
              <div>
                <strong> Draw with AI</strong> Contest
              </div>
            )}
          </h1>
          <p>{section1.content}</p>
        </div>
      </div>
    </div>
  )
}
