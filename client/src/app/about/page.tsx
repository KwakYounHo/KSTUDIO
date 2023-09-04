import { FC } from "react";
import { Bad_Script } from "next/font/google";
import type { NextFont } from "next/dist/compiled/@next/font";
import { about } from "@/models/about/about";
import Link from "next/link";

const badScript: NextFont = Bad_Script({
  subsets: ["latin"],
  weight: ["400"],
});

const About: FC = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <main className={"flex flex-col items-center"}>
        <div className={"w-52 h-52 my-8"}>
          <img
            src={about.profile.profileIMG}
            title="avatar"
            className={"rouned drop-shadow-lg select-none"}
          />
        </div>
        <div className={"select-none"}>
          <span className={`${badScript.className} text-3xl`}>
            {about.profile.name}
          </span>
          <span className={"opacity-40"}>({about.profile.subName})</span>
        </div>
        <div className={"mt-11 flex flex-col"}>
          {about.description.map((element) => {
            return (
              <div key={element.id} className={"flex items-center"}>
                <span className={"material-symbols-outlined mr-1"}>
                  {element.icon}
                </span>
                {element.href ? (
                  <span className={"text-xs text-blue-400"}>
                    <Link href={element.href} target="_blank">{element.text}</Link>
                  </span>
                ) : (
                  <span className={"text-xs"}>{element.text}</span>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default About;
