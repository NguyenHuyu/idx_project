import type { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Star } from 'lucide-react'
import React from 'react'

interface TimeLineData {
  time: string
  content: string
}

interface Section5Props {
  params: {
    lang: Locale
  }
}

export default async function Section5({ params }: Section5Props) {
  const { section5 } = await getDictionary(params.lang)

  const timeLineData: TimeLineData[] = [
    {
      time: section5.item1.time,
      content: section5.item1.content
    },
    {
      time: section5.item2.time,
      content: section5.item2.content
    },
    {
      time: section5.item3.time,
      content: section5.item3.content
    },
    {
      time: section5.item4.time,
      content: section5.item4.content
    },
    {
      time: section5.item5.time,
      content: section5.item5.content
    },
    {
      time: section5.item6.time,
      content: section5.item6.content
    },
    {
      time: section5.item7.time,
      content: section5.item7.content
    },
    {
      time: section5.item8.time,
      content: section5.item8.content
    },
    {
      time: section5.item9.time,
      content: section5.item9.content
    },
    {
      time: section5.item10.time,
      content: section5.item10.content
    },
    {
      time: section5.item11.time,
      content: section5.item11.content
    },
    {
      time: section5.item12.time,
      content: section5.item12.content
    },
    {
      time: section5.item13.time,
      content: section5.item13.content
    },
    {
      time: section5.item14.time,
      content: section5.item14.content
    }
  ]

  return (
    <div className='w-full py-10'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-center md:text-left  text-2xl text-red-700 font-bold md:pb-10'>{section5.heading}</h2>
        {timeLineData.map((item) => (
          <div key={item.time} className='px-4 flex flex-col md:flex-row md:items-center gap-1 md:space-y-4'>
            <Star color='yellow' fill='yellow' />
            <h3 className='font-medium mb-4 text-md  md:w-96'>{item.time}</h3>
            <span className='font-light text-sm md:text-lg '>{item.content}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
