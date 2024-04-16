import React from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOption'
import AccessComponent from './AccessComponent'
import Logo from '../../public/logo.png'
import { getDictionary } from '@/lib/dictionary'
import LocaleSwitcher from './switcher-locale'
import Sheet from '@/components/Sheet'
import { Session } from 'next-auth'
import { PageProps } from 'next'

export interface DesktopData {
  title: string
  link: string
}

export default async function Navbar({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  const { navbar, navbar_item, header } = await getDictionary(params.lang)

  const DesktopData = [
    {
      title: navbar_item.home,
      link: ''
    },
    // {
    //   title: navbar_item.judging_panel,
    //   link: 'ban-giam-khao'
    // },
    {
      title: navbar_item.competition_rules,
      link: 'the-le-cuoc-thi'
    },
    {
      title: navbar_item.guidelines,
      link: '',
      isOpen: true,
      subMenu: [
        {
          title: navbar_item.registration_guidelines,
          link: 'huong-dan-dang-ki'
        },
        {
          title: navbar_item.submission_guidelines,
          link: 'huong-dan-nop-bai'
        }
      ]
    },
    {
      title: navbar_item.contact,
      link: 'lien-he'
    }
  ]
  const SheetData = [
    {
      title: navbar_item.home,
      link: ''
    },
    // {
    //   title: navbar_item.judging_panel,
    //   link: 'ban-giam-khao'
    // },
    {
      title: navbar_item.competition_rules,
      link: 'the-le-cuoc-thi'
    },
    {
      title: navbar_item.registration_guidelines,
      link: 'huong-dan-dang-ki'
    },
    {
      title: navbar_item.submission_guidelines,
      link: 'huong-dan-nop-bai'
    },
    {
      title: navbar_item.contact,
      link: 'lien-he'
    }
  ]
  const MobileData = [
    {
      title: navbar_item.home,
      link: '/'
    },
    {
      title: navbar_item.contact,
      link: '/lien-he'
    }
    // {
    //   title: navbar_item.login,
    //   link: '/login'
    // }
  ]

  return (
    <header className='z-50 gap-10 justify-center bg-blue-100 sticky top-0 shadow-md'>
      <div className='flex justify-around items-center  h-28 md:h-32 px-3 md:max-w-[1600px] mx-auto'>
        <Link href={`/${params.lang}`} className='flex items-center'>
          <Image
            src={Logo}
            alt='SIU AI Art Contest - Cuộc thi vẽ tranh cùng AI'
            className='w-20 md:w-28'
            width={100}
            height={100}
          />
          <p className='text-[#359fed] font-bold text-xl w-48 md:w-full'>{header.name}</p>
        </Link>
        <div className='flex flex-col md:flex-row gap-4 items-center'>
          <LocaleSwitcher />

          {session ? (
            <div className='flex items-center gap-2'>
              <AccessComponent logoutDictionary={navbar.logout} lang={params.lang} />
            </div>
          ) : (
            <div className='items-center gap-1 hidden md:flex'>
              <Link href={`/${params.lang}/login`}>
                <Button size='sm' className='w-20   bg-orange-700 md:w-full  border-spacing-6  shadow-lg '>
                  {navbar.login}
                </Button>
              </Link>
              <Link href={`/${params.lang}/register`} className='hidden md:block'>
                <Button size='sm' variant='default' className='w-20 md:w-full'>
                  {navbar.register}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className='hidden md:flex justify-center bg-red-700 '>
        <NavigationMenu>
          <NavigationMenuList>
            {DesktopData.map((item) => (
              <NavigationMenuItem key={item.title}>
                {!item.isOpen && (
                  <Link href={`/${params.lang}/${item.link}`} className='font-medium text-sm px-4'>
                    {item.title}
                  </Link>
                )}
                {item.isOpen && (
                  <>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className='grid justify-center items-center w-52 px-1 md:grid-cols-1 '>
                        {item.subMenu.map((item) => (
                          <Link
                            className={cn(
                              'block select-none space-y-1 font-normal text-sm rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                            )}
                            key={item.title}
                            href={`/${params.lang}/${item.link}`}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                )}
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='flex md:hidden justify-center bg-red-700 p-1.5'>
        <NavigationMenu>
          <NavigationMenuList>
            {MobileData.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link href={`/${params.lang}/${item.link}`} className='font-medium text-sm px-4'>
                  {item.title}
                </Link>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <Sheet
                SheetData={SheetData}
                lang={params.lang}
                categories={navbar_item.categories}
                session={session as Session}
                logout={navbar.logout}
                login={navbar.login}
                register={navbar.register}
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-black'>{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'
