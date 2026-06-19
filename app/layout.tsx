import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rena Wu — Software Engineer',
  description: 'Building software that drives efficiency, optimization, and innovation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-indigo-deep`}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
