import type { Locale } from './i18n.config'
import NextAuth from 'next-auth'

declare module 'next' {
  export interface PageProps {
    params: {
      lang: Locale
      memberID?: string
      userID?: string
      memberID?: string
      submissionID?: string
    }
    searchParams?: {
      page: string
    }
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      token: {
        email: string
        sub: string
        user: {
          id: number
          fullName: string
          password: string
          email: string
          phone: string
          school: string
          dob: string
          className: string
          teamMembers: any[]
          submissions: any[]
          isAdmin: boolean
        }
        iat: number
        exp: number
        jti: string
      }
    }
  }
}
