import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import ProviderClient from '@/lib/ProviderClient'
import { Locale, i18n } from '@/i18n.config'
import '../globals.css'
import { getDictionary } from '@/lib/dictionary'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  params: {
    lang: Locale
  }
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Drawing with AI',
  image: {
    '@type': 'ImageObject',
    url: 'https://aiart.siu.edu.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage-section1.32a9b7fe.png&w=3840&q=75',
    width: 1080,
    height: 1080
  },
  telephone: '(+84)768471589',
  url: 'https://aiart.siu.edu.vn/',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '8C 11 16 18 Tống Hữu Định, Thảo Điền, Quận 2, Thành phố Hồ Chí Minh,Thủ Đức',
    addressLocality: 'Ho Chi Minh',
    postalCode: '700000',
    addressRegion: 'Ho Chi Minh',
    addressCountry: 'VN'
  },
  priceRange: '1000 - 1000000000',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '21:00'
    }
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '10.79664498748942',
    longitude: '106.65856519879867'
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { home } = await getDictionary(params.lang)
  return {
    metadataBase: new URL('https://aiart.siu.edu.vn/vi'),
    title: home.title,
    description:
      'Drawing with AI - Lần đầu tiên, một cuộc thi vẽ cùng AI dành riêng cho học sinh Trung học trên cả nước do trung tâm SIU AI Lab - trường Đại học Quốc tế Sài Gòn tổ chức.',
    keywords:
      'Drawing with AI - Cuộc thi vẽ tranh, AI, Công cụ AI, SIU AI Lab, Trung tâm AI, Trí tuệ Nhân tạo, Trung tâm AI ở Việt Nam, AI Lab in Vietnam',
    robots: 'index, follow',
    referrer: 'origin-when-cross-origin',
    openGraph: {
      images: [
        {
          url: 'https://aiart.siu.edu.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage-section1.32a9b7fe.png&w=3840&q=75',
          width: 1200,
          height: 630,
          alt: 'Drawing with AI - Cuộc thi vẽ tranh, AI, Công cụ AI, SIU AI Lab, Trung tâm AI, Trí tuệ Nhân tạo, Trung tâm AI ở Việt Nam, AI Lab in Vietnam'
        }
      ],
      title: home.title,
      type: 'website',
      description:
        'Lần đầu tiên, một cuộc thi vẽ cùng AI dành riêng cho học sinh Trung học trên cả nước do trung tâm SIU AI Lab - trường Đại học Quốc tế Sài Gòn tổ chức.',
      url: 'https://aiart.siu.edu.vn/vi',
      locale: params.lang,
      alternateLocale: 'vi',
      siteName: 'Drawing with AI'
    },
    category: 'technology',
    icons: {
      icon: '/icon.png',
      shortcut: '/shortcut-icon.png',
      apple: '/apple-icon.png'
    },
    manifest: 'https://aiart.siu.edu.vn/manifest.json',
    twitter: {
      title: home.title,
      description:
        'Lần đầu tiên, một cuộc thi vẽ cùng AI dành riêng cho học sinh Trung học trên cả nước do trung tâm SIU AI Lab - trường Đại học Quốc tế Sài Gòn tổ chức.',
      siteId: '@siu_ai_art',
      card: 'summary_large_image',
      images: [
        'https://aiart.siu.edu.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage-section1.32a9b7fe.png&w=3840&q=75'
      ]
    },
    alternates: {
      canonical: 'https://aiart.siu.edu.vn/vi',
      languages: {
        'vi-VN': 'https://aiart.siu.edu.vn/vi',
        'en-US': 'https://aiart.siu.edi.vn/en'
      }
    },
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo'
    }
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <ProviderClient>{children}</ProviderClient>
        <Script
          id='json-ld'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
          strategy='lazyOnload'
        />
      </body>
    </html>
  )
}
