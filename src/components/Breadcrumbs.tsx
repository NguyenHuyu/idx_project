'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'
import { Edit, Eye } from 'lucide-react'

export type Categories = {
  icon: string
  url: string
  hidden?: boolean
}
export type Breadcrumb = {
  name: string
  url: string
}

type BreadcrumbItem = Breadcrumb & {
  length: number
  index: number
}
interface BreadcrumbsProps {
  breadCrumbs?: Breadcrumb[]
  categories?: Categories[]
}

export default function Breadcrumbs({ breadCrumbs, categories }: BreadcrumbsProps) {
  const BoxButton = ({ icon, url }: Categories) => {
    return (
      <Button className='w-8 h-6'>
        <Link href={url} className=' hover:text-cyan-500 text-white text-[7px] md:text-[15px]'>
          {icon === 'Edit' ? <Edit size={18} /> : <Eye size={18} />}
        </Link>
      </Button>
    )
  }

  const BreadCrumbItem = ({ name, url, index, length }: BreadcrumbItem) => {
    return (
      <li className='inline-flex items-center justify-start'>
        <Link href={url} className='text-black italic hover:text-cyan-500 font-medium text-[14px] md:text-[15px]'>
          {name}
        </Link>
        {length - 1 !== index && <ChevronRight size={18} />}
      </li>
    )
  }

  return (
    <section className=' py-2 md:flex justify-center items-center'>
      <div className='px-2 flex justify-between md:justify-start w-full gap-10'>
        <ol className='flex flex-wrap text-gray-600 space-x-1 md:space-x-0.5 items-start justify-start'>
          {breadCrumbs?.map((breadCrumb, index) => (
            <BreadCrumbItem
              index={index}
              key={index}
              name={breadCrumb.name}
              url={breadCrumb.url}
              length={breadCrumbs.length}
            />
          ))}
        </ol>

        {categories && (
          <div className='flex gap-6'>
            {categories.map((item) => !item.hidden && <BoxButton key={item.url} icon={item.icon} url={item.url} />)}
          </div>
        )}
      </div>
    </section>
  )
}
