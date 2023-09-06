import type { FC } from 'react'
import Image from 'next/image'

type Props = {
  date: string
  title: string
  tag: string
  description: string
  ImageSrc: string
  created: string[]
}

const DatabaseResult: FC<Props> = ({date, title, tag, description, ImageSrc, created}) => {
  return (
    <div className={'flex flex-col w-[18rem] justify-center border-2 border-slate-400/20 rounded-xl transition transfrom duration-300 hover:scale-105 hover:shadow-md hover:shadow-blue-400'}>
      <div className={'w-full h-[12rem] flex justify-center'}>
        <Image
          src={ImageSrc}
          alt={'cover image'}
          width={300}
          height={300}
          className={'w-full h-full object-cover rounded-t-xl'}
        />
      </div>
      <div className={'p-2'}>
        <h2 className={'w-full text-2xl font-bold my-2'}>{title}</h2>
        <p className={'w-full overflow-hidden overflow-ellipsis whitespace-nowrap'}>{description}</p>
        <span className={'text-xs tracking-tight'}>{`선택 날짜 : ${date}`}</span>
        <div>
          <span className={'rounded-md bg-slate-700/90 p-1 my-1 text-white inline-block'}>{tag}</span>
        </div>
      </div>
      <div className="p-2 flex justify-between border-t-2 border-t-slate-400/20">
        <span>{created[0]}</span>
        <span>{created[1]}</span>
      </div>
    </div>
  )
}

export default DatabaseResult;