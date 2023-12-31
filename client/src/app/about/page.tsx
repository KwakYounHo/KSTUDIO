import { FC } from "react";
import { Bad_Script } from "next/font/google";
import type { NextFont } from "next/dist/compiled/@next/font";
import { about } from "@/models/about/about";
import Link from "next/link";
import { Metadata } from "next";
import { constants } from "@/app/common/domain/models/constants";
import { commonClassName } from "@/app/common/commonClass";

const badScript: NextFont = Bad_Script({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: constants.createTitle("About"),
};

const About: FC = () => {
  return (
    <main className={`${commonClassName.topBlank} flex flex-col items-center`}>
      <div className={"w-52 h-52 mb-8"}>
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
              <span className={"material-symbols-outlined mr-1 select-none"}>
                {element.icon}
              </span>
              {element.href ? (
                <span className={"text-xs text-blue-400"}>
                  <Link href={element.href} target="_blank">
                    {element.text}
                  </Link>
                </span>
              ) : (
                <span className={"text-xs"}>{element.text}</span>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default About;
