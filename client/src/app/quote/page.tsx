import type { Metadata } from 'next';
import type { FC } from 'react';
import { constants } from '@/app/common/domain/models/constants'

const metadata:Metadata = {
  title: constants.createTitle('Quote')
}

const Quote: FC = () => {
  return (
    <h5 className={'m-auto text-4xl'}>공사중</h5>
  )
}

export default Quote;