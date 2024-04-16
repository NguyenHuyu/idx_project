import React from 'react'
import GL1 from '../../../../../public/guideline1.jpg'
import GL2 from '../../../../../public/guideline2.jpg'
import GL3 from '../../../../../public/guideline3.jpg'
import Image from 'next/image'
import type { Metadata, PageProps } from 'next'
import { getDictionary } from '@/lib/dictionary'
import Link from 'next/link'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { register_guidelines_page } = await getDictionary(params.lang)
  return {
    title: register_guidelines_page.metadata.title,
    description: register_guidelines_page.metadata.description
  }
}

export default async function RegistrationGuidelinePage({ params }: PageProps) {
  const { register_guidelines_page } = await getDictionary(params.lang)
  const data = [
    {
      sub: register_guidelines_page.step1.sub,
      content_1: register_guidelines_page.step1.content,
      image_1: GL1,
      sub_image_1: register_guidelines_page.step1.sub_image,
      content_2: register_guidelines_page.step2.content,
      image_2: GL2,
      sub_image_2: register_guidelines_page.step2.sub_image,
      content_3: register_guidelines_page.step3.content,
      image_3: GL3,
      sub_image_3: register_guidelines_page.step3.sub_image
    }
  ]

  return (
    <div className='w-full px-2 text-justify'>
      <div className='max-w-4xl mx-auto py-10 space-y-6'>
        <h1 className='text-3xl font-bold text-red-500 text-center '>{register_guidelines_page.h1}</h1>
        {data.map((item) => (
          <div key={item.sub} className='flex flex-col space-y-8'>
            <p className='text-xl px-2 font-medium'>{item.sub}</p>
            <div className=''>
              <div className='flex flex-col space-y-2'>
                {item.content_1.map((content, index) => (
                  <div key={index} className='flex flex-col md:flex-row gap-2'>
                    <p className='text-lg'>{content.link}</p>
                    <Link className='underline' href='https://aiart.siu.edu.vn'>
                      {content.sub_link}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col justify-center items-center m-2 gap-1'>
              <Image
                src={item.image_1.src}
                alt={item.sub}
                width={800}
                height={800}
                className='w-full border border-red-700'
              />
              <span>{item.sub_image_1}</span>
            </div>
            <div className='flex flex-col space-y-2'>
              {item.content_2.map((content) => (
                <p key={content} className='text-lg'>
                  {content}
                </p>
              ))}
            </div>
            <div className='flex flex-col justify-center items-center m-2 gap-1'>
              <Image
                src={item.image_2.src}
                alt={item.sub}
                width={800}
                height={800}
                className='w-full border border-red-700'
              />
              <span>{item.sub_image_2}</span>
            </div>
            <div className='flex flex-col space-y-2'>
              {item.content_3.map((content) => (
                <p key={content} className='text-lg'>
                  {content}
                </p>
              ))}
            </div>
            <div className='flex flex-col justify-center items-center m-2 gap-1'>
              <Image
                src={item.image_3.src}
                alt={item.sub}
                width={800}
                height={800}
                className='w-full border border-red-700'
              />
              <span>{item.sub_image_3}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
