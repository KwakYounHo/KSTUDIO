import * as React from "react";
import type { Metadata } from "next";
import { constants } from "@/app/common/domain/models/constants";
import { quoteSupabase } from "@/app/quote/adapter/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { commonClassName } from "@/app/common/commonClass";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

import { diphylleia } from "@/utils/fontManager";

export const metadata: Metadata = {
  title: constants.createTitle("Quote"),
};

const Quote: React.FC = async () => {
  const cookieStore = cookies();
  const supabase = quoteSupabase(
    createServerComponentClient<Database>({ cookies: () => cookieStore })
  );
  const { quote, error } = await supabase.getQuoteAll();
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
