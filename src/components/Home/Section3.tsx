import Image from 'next/image'
import React from 'react'
import ImageIcon from '../../../public/icon-section3.png'
import dataPrizes from '@/data/prizeData.json'

import type { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'

interface Section3Props {
  params: {
    lang: Locale
  }
}

export default async function Section3({ params }: Section3Props) {
  const { section3 } = await getDictionary(params.lang)

  const dataPrize = params.lang === 'vi' ? dataPrizes.vi : dataPrizes.en

  return (
    <div className='bg-yellow-100 w-full py-10 px-4 md:px-0 text-justify'>
      <div className='flex items-start flex-col max-w-5xl mx-auto'>
        <h2 className='text-red-700 font-medium text-3xl mb-10 text-center md:text-left inline-flex items-center gap-4'>
          {dataPrize.heading}
          <Link
            href={`/${params.lang}/the-le-cuoc-thi`}
            className='cursor-pointer hover:scale-125 hover:-translate-y-2 transition-all duration-500'
          >
            <LinkIcon />
          </Link>
        </h2>
        <div className='flex flex-col md:flex-row justify-around gap-6'>
          <div className='basis-1/2 gap-4'>
            <h3 className='text-2xl py-4 text-center font-medium shadow-lg'>{dataPrize.highSchoolStudent.heading}</h3>
            {dataPrize.highSchoolStudent.description.map((item) => (
              <div key={item.title} className='flex gap-4 py-4'>
                <Image
                  src={ImageIcon}
                  width={100}
                  height={100}
                  alt='SIU AI Art Contest - Cuộc thi vẽ tranh cùng AI'
                  className='w-24 h-24'
                />
                <div className='flex flex-col'>
                  <h3 className='font-medium mb-1 text-md md:text-xl'>{item.title}</h3>
                  <span className='font-light text-sm md:text-sm w-full'>{item.content}</span>
                </div>
              </div>
            ))}
          </div>
          <div className='basis-1/2 gap-4'>
            <h3 className='text-2xl py-4 text-center font-medium shadow-lg'>{dataPrize.middleSchoolStudent.heading}</h3>
            {dataPrize.middleSchoolStudent.description.map((item) => (
              <div key={item.title} className='flex gap-4 py-4'>
                <Image
                  src={ImageIcon}
                  width={100}
                  height={100}
                  alt='AI Art Contest - Cuộc thi vẽ tranh cùng AI'
                  className='w-24 h-24 '
                />
                <div className='flex flex-col '>
                  <h3 className='font-medium mb-1 text-md md:text-xl'>{item.title}</h3>
                  <span className='font-light text-sm md:text-sm '>{item.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h2 className='text-black font-bold flex justify-center items-center text-xl my-10 text-center'>
        {section3.heading}
      </h2>
    </div>
  )
}
