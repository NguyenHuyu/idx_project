import Image from 'next/image'
import React from 'react'
import Logo from '../../public/logo.png'
import Link from 'next/link'
import { Facebook, Mail, Phone, Timer } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

interface Props {
  params: {
    lang: Locale
  }
}

export default async function Footer({ params }: Props) {
  const { footer } = await getDictionary(params.lang)
  return (
    <div className='bg-blue-100'>
      <div className='p-4 flex flex-col gap-10 md:gap-2 md:flex-row justify-center items-left  md:justify-around md:items-center md:max-w-7xl mx-auto py-10'>
        <div className='flex flex-col gap-2'>
          <Link href='/' className=' flex items-center'>
            <Image src={Logo} alt='SIU - AIlab' className='w-24' width={100} height={100} />
            <p className='text-[#359fed] font-bold text-xl w-full'>{footer.name}</p>
          </Link>
          <div className='flex flex-col md:w-80'>
            <p>{footer.content_name}</p>
            <span>{footer.content_address}</span>
          </div>
        </div>
        <div className='flex md:flex-col'>
          <ul className='flex flex-col gap-4'>
            <li className='hover:-translate-y-2 duration-300 transition-all'>
              <Link href={`/${params.lang}`}>{footer.home}</Link>
            </li>
            {/* <li>{footer.judging_panel}</li> */}
            <li className='hover:-translate-y-2 duration-300 transition-all'>
              <Link href={`/${params.lang}/the-le-cuoc-thi`}>{footer.competition_rules}</Link>
            </li>
            <li className='hover:-translate-y-2 duration-300 transition-all'>
              <Link href={`/${params.lang}/huong-dan-nop-bai`}>{footer.submission_guidelines}</Link>
            </li>
            <li className='hover:-translate-y-2 duration-300 transition-all'>
              <Link href={`/${params.lang}/huong-dan-dang-ki`}>{footer.registration_guidelines}</Link>
            </li>
            <li className='hover:-translate-y-2 duration-300 transition-all'>
              <Link href={`/${params.lang}/lien-he`}>{footer.contact}</Link>
            </li>
          </ul>
        </div>
        <div className='flex flex-col'>
          <h2 className='pb-4 text-lg font-medium'>{footer.contact_us}</h2>
          <ul className='flex flex-col gap-4'>
            <li className='flex items-center gap-1'>
              <Phone /> {footer.contact_us_phone}
            </li>
            <li className='flex items-center gap-1'>
              <Mail /> {footer.contact_us_email}
            </li>
            <Link className='flex items-center gap-1' target='_blank' href='https://www.facebook.com/SIUAILAB'>
              <Facebook /> {footer.contact_us_fb}
            </Link>
          </ul>
        </div>
      </div>
      <div className='bg-red-700 p-2 text-center mx-auto -bottom-7 z-10 text-white font-normal text-sm'>
        {footer.copyright}
      </div>
    </div>
  )
}
