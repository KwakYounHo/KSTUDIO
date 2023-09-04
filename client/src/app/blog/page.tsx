import type { FC } from 'react';
import { Metadata } from 'next';
import { constants } from '@/app/common/domain/models/constants'

export const metadata: Metadata = {
  title: constants.createTitle('Blog')
}

const Blog: FC = () => {
  return (
    <main className={'my-auto'}>
      <h1 className={'text-4xl'}>공사중</h1>
    </main>
  )
}

export default Blog;