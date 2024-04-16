import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://aiart.siu.edu.vn',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1
    },
    {
      url: 'https://aiart.siu.edu.vn/the-le-cuoc-thi',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8
    }
  ]
}
