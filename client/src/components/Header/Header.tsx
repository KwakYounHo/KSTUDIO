import { Inconsolata } from "next/font/google";
import Link from "next/link";
import { title } from "@/models/header/navigation";

import type { NextFont } from "next/dist/compiled/@next/font";

const inconsolata: NextFont = Inconsolata({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const Header = (): JSX.Element => {
  return (
    <header id="container" className={`${inconsolata.className} select-none`}>
      <Link href="/" className="flex justify-center">
        <button className="hover:text-blue-400">
          <p className="uppercase tracking-[3px] mt-12 mb-3">younho kwak</p>
        </button>
      </Link>
      <nav className="text-sm font-light text-gray-700 flex gap-4 justify-center capitalize tracking-tight m-4">
        {title.map((element) => {
          return (
            <Link
              href={element.url}
              className="hover:text-blue-400"
              key={element.id}
            >
              {element.title}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
