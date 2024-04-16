/* eslint-disable @typescript-eslint/ban-ts-comment */
import { login } from '@/actions/login'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        console.log('credentials', credentials)
        const response = await fetch('https://api.siu.edu.vn/ai-paint-contest/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.username,
            password: credentials?.password
          })
        })
        const data = await response.json()
        if (response.status == 200) {
          return data
        }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signOut: '/logout'
  },
  secret: '324242423324234324',
  callbacks: {
    async jwt({ token, user }: any) {
      const isSignIn = user ? true : false
      if (isSignIn) {
        token.username = user.username as any
        token.entry = user.entry as any
        token.user = user
      }
      return token
    },
    async session({ session, token }: any) {
      return {
        ...session,
        user: {
          session,
          token
        }
      }
    }
  }
}
