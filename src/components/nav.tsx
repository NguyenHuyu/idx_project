'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useSelectedLayoutSegment } from 'next/navigation'

export interface NavProps {
  links: {
    title?: string
    label?: string
    icon?: LucideIcon
    href: string
  }[]
}

export function Nav({ links }: NavProps) {
  const path = useSelectedLayoutSegment()

  return (
    <div className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'>
      <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {links.map((link, index) => {
          const variant = path === link.href ? 'default' : 'ghost'
          return (
            <Link
              key={index}
              href={`${link.label}/${link.href}`}
              className={cn(
                buttonVariants({
                  variant,
                  size: 'sm'
                }),
                path === link.href
                  ? 'default'
                  : 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start text-lg font-bold'
              )}
            >
              {link.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
