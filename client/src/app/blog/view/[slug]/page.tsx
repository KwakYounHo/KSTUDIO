import { constants } from "@/app/common/domain/models/constants";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import databaseAdapter from "@/app/blog/adapter/supabase";
import MarkdownRenderer from "@/utils/MarkdownRenderer";
import ManagingButton from "@/app/blog/view/components/ManagingButton";
import { toISO8601 } from "@/app/blog/common/dateManagement";
import { commonClassName } from "@/app/common/commonClass";

import type { Metadata } from "next";
import type { Database } from "@/lib/database.types";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    seq: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const titleText = decodeURIComponent(params.slug);
  return {
    title: constants.createTitle(titleText),
  };
};

const ViewPage = async ({ params, searchParams }: Props) => {
  const cookieStore = cookies();
  const database = databaseAdapter(
    createServerComponentClient<Database>({ cookies: () => cookieStore })
  );
  const { data, error } = await database.selectSlugSeq(
    params.slug,
    searchParams.seq
  );

  const isLogin = await database.isManager();

  return (
    <>
      {data && (
        <>
          <h1 className={"text-4xl font-black mb-7"}>{data[0].title}</h1>
          <div
            className={`${commonClassName.topBlank} w-1/3 flex justify-between`}
          >
            <p className={"text-sm"}>
              작성일 : {toISO8601(data[0].created_at, "YYYY년 MM월 DD일 HH:mm")}
            </p>
            {data[0].updated_at ? (
              <p className={"text-sm"}>
                수정일 :{" "}
                {toISO8601(data[0].updated_at, "YYYY년 MM월 DD일 HH:mm")}
              </p>
            ) : (
              <p>수정일 : </p>
            )}
          </div>
          <MarkdownRenderer
            content={data[0].article}
            className={`${commonClassName.topBlank} w-full`}
          />
          {isLogin && <ManagingButton seq={data[0].seq} slug={data[0].slug} />}
        </>
      )}
    </>
  );
};
export default ViewPage;
