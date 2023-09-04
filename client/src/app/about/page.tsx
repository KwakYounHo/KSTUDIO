import { FC } from "react";
import { Bad_Script } from "next/font/google";
import type { NextFont } from "next/dist/compiled/@next/font";
import { about } from '@/models/about/about'

const badScript: NextFont = Bad_Script({
  subsets: ['latin'],
  weight: ['400']
})

const About: FC = () => {
  return (
    <main className={'flex flex-col items-center'}>
      <div className={'w-52 h-52 my-8'}>
        <img src={about.profile} title="avatar" className={'rouned drop-shadow-lg'} />
      </div>
      <div className={'select-none'}>
        <span className={`${badScript.className} text-3xl`}>{about.name}</span>
        <span className={'opacity-40'}>({about.subName})</span>
      </div>
    </main>
  )
}

export default About;