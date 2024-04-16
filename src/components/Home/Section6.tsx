import type { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import React from 'react'

interface Section6Props {
  params: {
    lang: Locale
  }
}

export default async function Section6({ params }: Section6Props) {
  const { section6 } = await getDictionary(params.lang)

  return (
    <div className='w-full md:py-10'>
      <div className='max-w-4xl mx-auto'>
        <h2 className=' md:py-0 text-center md:text-left  text-2xl text-red-700 font-bold md:pb-10'>
          {section6.heading}
        </h2>

        <div className='p-4 md:px-0 flex flex-col items-center justify-center gap-2 md:space-y-3 text-justify'>
          <span>{section6.content1}</span>
          <span>{section6.content2}</span>
        </div>
      </div>
    </div>
  )
}
