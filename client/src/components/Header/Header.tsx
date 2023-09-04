import { FC } from "react"
import { NextFont } from "next/dist/compiled/@next/font";
import { Inconsolata } from "next/font/google";
import Link from "next/link";
import { title } from "@/models/header/navigation";

const inconsolata: NextFont = Inconsolata({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
})


const Header: FC = () => {
  return (
    <header id="container" className={`${inconsolata.className} select-none`}>
      <Link href='/' className='flex justify-center'>
        <button className='hover:text-cyan-400'>
          <h1 className='uppercase tracking-widest mt-8 mb-3'>kwakyounho</h1>
        </button>
      </Link>
      <nav className='text-sm font-light text-gray-900 flex gap-4 justify-center capitalize tracking-tight m-5'>
        {title.map(element=>{
          return <Link href={element.url} className='hover:text-cyan-400'>{element.title}</Link>
        })}
      </nav>
    </header>
  )
}

export default Header;