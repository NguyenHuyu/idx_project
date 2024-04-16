'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { DesktopData } from '@/components/Navbar'
import { Session } from 'next-auth'
import { Button } from './ui/button'
import AccessComponent from './AccessComponent'

export default function Sheets({
  SheetData,
  categories,
  session,
  logout,
  login,
  lang,
  register
}: {
  SheetData: DesktopData[]
  categories: string
  session: Session
  lang: string
  logout: string
  login: string
  register: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='text-sm font-medium px-2'>{categories}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='text-2xl'>{categories}</SheetTitle>
          <SheetDescription className='flex flex-col items-start gap-4'>
            {SheetData.map((item) => (
              <Link
                onClick={() => setOpen(false)}
                key={item.link}
                href={item.link}
                className='font-medium text-xl px-4'
              >
                {item.title}
              </Link>
            ))}
          </SheetDescription>
          <SheetDescription>
            {session?.user?.token ? (
              <div className='flex items-center gap-4 p-4'>
                {session?.user.token.user.isAdmin === true ? (
                  <Link href={`${lang}/admin/members`}>
                    <Button size='sm' className='w-20   bg-orange-700 md:w-full  border-spacing-6  shadow-lg '>
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href={`${lang}/contest`}>
                    <Button size='sm' className='w-20   bg-orange-700 md:w-full  border-spacing-6  shadow-lg '>
                      Dashboard
                    </Button>
                  </Link>
                )}
                <AccessComponent lang={lang} logoutDictionary={logout} />
              </div>
            ) : (
              <div className='flex items-center justify-center gap-1 p-4'>
                <Link href={`${lang}/login`}>
                  <Button size='sm' className='w-20  bg-orange-700 md:w-full  border-spacing-6  shadow-lg '>
                    {login}
                  </Button>
                </Link>
                <Link href={`${lang}/register`}>
                  <Button size='sm' variant='default' className='w-20 md:w-full'>
                    {register}
                  </Button>
                </Link>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
