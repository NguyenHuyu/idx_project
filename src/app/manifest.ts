import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Drawing with AI',
    short_name: 'Drawing with AI',
    description:
      'Lần đầu tiên, một cuộc thi vẽ cùng AI dành riêng cho học sinh Trung học trên cả nước do trung tâm SIU AI Lab - trường Đại học Quốc tế Sài Gòn tổ chức.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: 'https://aiart.siu.edu.vn/favicon.ico',
        sizes: '192x192',
        type: 'image/ico'
      },
      {
        src: 'https://aiart.siu.edu.vn/favicon.ico',
        sizes: '512x512',
        type: 'image/ico'
      }
    ]
  }
}
