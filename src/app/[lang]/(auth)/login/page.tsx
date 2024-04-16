import React from 'react'
import { Metadata, PageProps } from 'next'
import { getDictionary } from '@/lib/dictionary'
import Login from '@/components/Login'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { login_page } = await getDictionary(params.lang)
  return {
    title: login_page.metadata.title,
    description: login_page.metadata.description
  }
}

export default async function LoginPage({ params }: PageProps) {
  const { login_page } = await getDictionary(params.lang)
  return (
    <Login
      heading={login_page.heading}
      title={login_page.title}
      sub_heading={login_page.sub_heading}
      sub_heading_link={login_page.sub_heading_link}
      back_to_home={login_page.back_to_home}
    />
  )
}
