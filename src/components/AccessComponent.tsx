'use client'
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { CircleUser } from 'lucide-react'

interface AccessComponentProps {
  logoutDictionary: string
  lang?: string
}

export default function AccessComponent({ logoutDictionary, lang }: AccessComponentProps) {
  const { data } = useSession()

  const isAdmin = data?.user.token.user.isAdmin === true

  const linkHref = isAdmin ? `/${lang}/admin/submissions` : `/${lang}/contest/submission`

  const handleLogout = () => {
    signOut({
      callbackUrl: `/${lang}`
    })
  }

  return (
    <>
      <Link href={linkHref} className='hidden md:block'>
        <Button size='sm' variant='btnDashboard'>
          <CircleUser />
        </Button>
      </Link>
      <Button size='sm' variant='btnLogout' onClick={handleLogout}>
        {logoutDictionary}
      </Button>
    </>
  )
}
