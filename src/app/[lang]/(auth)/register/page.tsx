import React from 'react'
import Register from '@/components/Register'
import type { Metadata, PageProps } from 'next'
import { getDictionary } from '@/lib/dictionary'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { register_page } = await getDictionary(params.lang)
  return {
    title: register_page.metadata.title,
    description: register_page.metadata.description
  }
}

export default async function RegisterPage({ params }: PageProps) {
  const { register_page } = await getDictionary(params.lang)

  return (
    <Register
      heading={register_page.heading}
      title={register_page.title}
      fullName={register_page.fullname}
      email={register_page.email}
      phone={register_page.phone}
      dob={register_page.dob}
      school={register_page.school}
      className={register_page.classname}
      province={register_page.province}
      password={register_page.password}
      confirmPassword={register_page.confirm_password}
      sub_heading={register_page.sub_heading}
      sub_heading_link={register_page.sub_heading_link}
      back_to_home={register_page.back_to_home}
    />
  )
}
