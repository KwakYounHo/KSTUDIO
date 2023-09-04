import './globals.css'
import { Inter } from 'next/font/google'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} flex flex-col items-center h-screen`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
