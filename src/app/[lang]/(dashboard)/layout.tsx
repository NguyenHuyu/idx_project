import Navbar from '@/components/Navbar'
import '../../globals.css'
import type { Locale } from '@/i18n.config'
import Footer from '@/components/Footer'

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
  return (
    <>
      <Navbar params={params} />
      <section className='md:min-h-screen md:h-full'> {children}</section>
      <Footer params={params} />
    </>
  )
}
