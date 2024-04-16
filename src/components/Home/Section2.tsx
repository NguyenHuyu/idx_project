import type { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import React from 'react'

interface PropsSection2 {
  params: {
    lang: Locale
  }
}

export default async function Section2({ params }: PropsSection2) {
  const { section2 } = await getDictionary(params.lang)

  return (
    <div className='w-full bg-yellow-100 h-40'>
      <h2 className='flex justify-center text-center items-center h-full text-xl md:text-3xl max-w-xl mx-auto font-medium text-red-700 px-2'>
        {section2.heading}
      </h2>
    </div>
  )
}
