import React from 'react'
import type { Locale } from '@/i18n.config'
import Section1 from '@/components/Home/Section1'
import Section2 from '@/components/Home/Section2'
import Section3 from '@/components/Home/Section3'
import Section4 from '@/components/Home/Section4'
import Section5 from '@/components/Home/Section5'
import Section6 from '@/components/Home/Section6'
import { PageProps } from 'next'

export interface PropsParams {
  params: {
    lang: Locale
  }
}

export default function page({ params }: PageProps) {
  return (
    <>
      <Section1 params={params} />
      <Section2 params={params} />
      <Section4 params={params} />
      <Section3 params={params} />
      <Section5 params={params} />
      <Section6 params={params} />
    </>
  )
}
