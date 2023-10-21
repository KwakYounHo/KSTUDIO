import * as React from "react";
import type { Metadata } from "next";
import { constants } from "@/app/common/domain/models/constants";
import { clientSupabase } from "@/utils/supabase";
import { commonClassName } from "@/app/common/commonClass";

import { diphylleia } from "@/utils/fontManager";

export const metadata: Metadata = {
  title: constants.createTitle("Quote"),
};

const Quote: React.FC = async () => {
  const { data: quote, error } = await clientSupabase
    .from("quote")
    .select("*")
    .order("id", { ascending: false });
  return (
    <main
      className={`${commonClassName.topBlank} container px-7 flex justify-center items-center flex-col`}
    >
      {quote ? (
        quote.map((e) => {
          return (
            <div
              key={e.id}
              className={`flex flex-col justify-center items-center gap-4 text-center [&:not(:last-child)]:border-b-[0.1rem] py-10`}
            >
              <i
                className={`${diphylleia.className} text-2xl before:content-['"'] after:content-['"'] before:mr-1 after:ml-1`}
              >
                {e.quote}
              </i>
              <p
                className={
                  "before:content-[''] before:mr-2 before:border-l-4 before:border-black font-light"
                }
              >
                {e.credit}
              </p>
            </div>
          );
        })
      ) : (
        <p>이 문구가 보인다면 개발자에게 연락 부탁드립니다</p>
      )}
    </main>
  );
};
export default Quote;
