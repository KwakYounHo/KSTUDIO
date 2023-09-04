import { Metadata } from 'next'
import About from '@/app/about/page'

export const metadata: Metadata = {
  title: '::VedK, 곽윤호 - STUDIO',
}

export default function Home() {
  return <About />
}