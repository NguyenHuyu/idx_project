import Image from 'next/image'
import React from 'react'
import MAP from '../../../../../public/image_contact.png'
import type { Locale } from '@/i18n.config'
import { Facebook, FacebookIcon, Mail, MailCheckIcon, Phone, Timer } from 'lucide-react'
import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import Link from 'next/link'

interface Props {
  params: {
    lang: Locale
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { contact_page } = await getDictionary(params.lang)
  return {
    title: contact_page.title + ' | AI Painting Contest'
  }
}

export default async function page({ params }: Props) {
  const { contact_page } = await getDictionary(params.lang)

  return (
    <div className='bg-white py-10'>
      <h1 className='text-3xl font-bold text-red-500 text-center'>{contact_page.heading}</h1>
      <div className='container flex flex-col mx-auto bg-white'>
        <div className='w-full draggable'>
          <div className='container flex flex-col items-center gap-16 mx-auto my-20'>
            <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
              <div className='flex flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-main border border-red-500'>
                <MailCheckIcon size={40} />
                <p className='text-2xl font-extrabold text-dark-grey-900'>Email</p>
                <p className='text-lg font-bold text-purple-blue-500'>aiart@siu.edu.vn</p>
              </div>
              <div className='flex flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-main border border-red-500'>
                <Phone size={40} />
                <p className='text-2xl font-extrabold text-dark-grey-900'>Hotline</p>
                <p className='text-lg font-bold text-purple-blue-500'>(+84)768471589</p>
              </div>
              <Link
                target='_blank'
                href='https://www.facebook.com/SIUAILAB'
                className='flex flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-main border border-red-500'
              >
                <FacebookIcon size={40} />
                <p className='text-2xl font-extrabold text-dark-grey-900'>Facebook</p>
                <div className='text-lg font-bold text-purple-blue-500'>SIU AILAB</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
