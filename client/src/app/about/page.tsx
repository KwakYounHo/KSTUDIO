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
    <>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <main className={'flex flex-col items-center'}>
        <div className={'w-52 h-52 my-8'}>
          <img src={about.profile.profileIMG} title="avatar" className={'rouned drop-shadow-lg select-none'} />
        </div>
        <div className={'select-none'}>
          <span className={`${badScript.className} text-3xl`}>{about.profile.name}</span>
          <span className={'opacity-40'}>({about.profile.subName})</span>
        </div>
      </main>
    </>
  )
}

export default About;