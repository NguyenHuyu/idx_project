import React from 'react'
import S1 from '../../../../../public/submission1.jpg'
import S2 from '../../../../../public/submission2.jpg'
import S3 from '../../../../../public/submission3.jpg'
import S4 from '../../../../../public/submission4.jpg'
import S5 from '../../../../../public/submission5.jpg'

import Image from 'next/image'
import type { Metadata, PageProps } from 'next'
import { getDictionary } from '@/lib/dictionary'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const langTitle = params.lang === 'vi' ? 'SIU AI Art - Hướng dẫn nộp bài' : 'SIU AI Art - Submission Guidelines'
  const langDescription =
    params.lang === 'vi'
      ? 'Lần đầu tiên, một cuộc thi vẽ cùng AI dành riêng cho học sinh Trung học trên cả nước do trung tâm SIU AI Lab - trường Đại học Quốc tế Sài Gòn tổ chức.'
      : 'For the first time, a drawing contest with AI exclusively for high school students across the country was organized by SIU AI Lab - Saigon International University.'
  return {
    title: langTitle,
    description: langDescription,
    openGraph: {
      images: [
        {
          url: 'https://aiart.siu.edu.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage-section1.32a9b7fe.png&w=3840&q=75',
          width: 1200,
          height: 630,
          alt: 'SIU AI Art - Cuộc thi vẽ tranh, AI, Công cụ AI, SIU AI Lab, Trung tâm AI, Trí tuệ Nhân tạo, Trung tâm AI ở Việt Nam, AI Lab in Vietnam'
        }
      ],
      title: langTitle,
      type: 'website',
      description: langDescription,
      url: `https://aiart.siu.edu.vn/${params.lang}/huong-dan-nop-bai`,
      locale: params.lang,
      alternateLocale: 'vi',
      siteName: 'SIU AI Art Contest'
    }
  }
}

export default async function RegistrationGuidelinePage({ params }: PageProps) {
  const { submission_guidelines_page } = await getDictionary(params.lang)
  const data = [
    {
      content_1: submission_guidelines_page.step1.content,
      image_1: S1,
      sub_image_1: submission_guidelines_page.step1.sub_image,
      content_2: submission_guidelines_page.step2.content,
      image_2: S2,
      sub_image_2: submission_guidelines_page.step2.sub_image,
      content_3: submission_guidelines_page.step3.content,
      image_3: S3,
      sub_image_3: submission_guidelines_page.step3.sub_image,
      content_4: submission_guidelines_page.step4.content,
      image_4: S4,
      sub_image_4: submission_guidelines_page.step4.sub_image,
      content_5: submission_guidelines_page.step5.content,
      image_5: S5,
      sub_image_5: submission_guidelines_page.step5.sub_image
    }
  ]

  return (
    <div className='w-full px-2 text-justify'>
      <div className='max-w-4xl mx-auto py-10 space-y-6'>
        <h1 className='text-3xl font-bold text-red-500 text-center '>{submission_guidelines_page.h1}</h1>
        {data.map((item, index) => (
          <div key={index} className='flex flex-col space-y-8'>
            <div className='flex flex-col space-y-2'>
              {item.content_1.map((content) => (
                <p key={content} className='text-lg'>
                  {content}
                </p>
              ))}
            </div>
            <div className='flex flex-col justify-center items-center m-2 gap-1'>
              <Image
                src={item.image_1.src}
                alt='SIU AI Art Contest'
                width={1500}
                loading='lazy'
                height={1500}
                className='w-full border border-red-500'
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
                alt='SIU AI Art Contest'
                width={1500}
                height={1500}
                loading='lazy'
                className='w-full border border-red-500'
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
                alt='SIU AI Art Contest'
                width={1500}
                height={1500}
                loading='lazy'
                className='w-full border border-red-500'
              />
              <span>{item.sub_image_3}</span>
            </div>

            <div className='flex flex-col space-y-2'>
              {item.content_4.map((content) => (
                <p key={content} className='text-lg'>
                  {content}
                </p>
              ))}
            </div>
            <div className='flex flex-col justify-center items-center m-2 gap-1'>
              <Image
                src={item.image_4.src}
                alt='SIU AI Art Contest'
                width={1500}
                height={1500}
                loading='lazy'
                className='w-full border border-red-500'
              />
              <span>{item.sub_image_4}</span>
            </div>

            <div className='flex flex-col space-y-2'>
              {item.content_5.map((content) => (
                <p key={content} className='text-lg'>
                  {content}
                </p>
              ))}
            </div>
            <div className='flex flex-col justify-center items-center m-2 gap-1'>
              <Image
                src={item.image_5.src}
                alt='SIU AI Art Contest'
                width={1500}
                height={1500}
                loading='lazy'
                className='w-full border border-red-500'
              />
              <span>{item.sub_image_5}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
