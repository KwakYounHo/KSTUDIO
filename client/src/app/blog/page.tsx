import type { FC } from 'react';
import { Metadata } from 'next';
import { constants } from '@/app/common/domain/models/constants'
import MarkdownRenderer from '@/utils/components/MarkdownRenderer';

export const metadata: Metadata = {
  title: constants.createTitle('Blog')
}

const Blog: FC = () => {
  return (
    <main className={'my-auto'}>
      <MarkdownRenderer
        content={"# 임시 오픈\n## 계속 변경 예정"}
        className={"mt-auto text-center"}
      />
    </main>
  )
}

export default Blog;