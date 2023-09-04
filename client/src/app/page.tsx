import { Metadata } from 'next'
import About from '@/app/about/page'
import { constants } from '@/app/common/domain/models/constants'

export const metadata: Metadata = {
  title: constants.createTitle(),
}

export default function Home() {
  return <About />
}