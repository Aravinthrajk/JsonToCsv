import './globals.css'
import Heading from './component/Heading'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BITS',
  description: 'webdevelopment and design',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Heading/>
    </html>
  )
}
