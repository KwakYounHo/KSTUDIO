import * as React from "react";
import { constants } from "@/app/common/domain/models/constants";
import databaseAdapter from "@/app/blog/adapter/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import EditContainer from "@/app/blog/edit/containers/EditContainer";
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
  return {
    title: constants.createTitle(`수정 : ${decodeURIComponent(params.slug)}`),
  };
};

const EditBlog = async ({ params, searchParams }: Props) => {
  const cookieStore = cookies();

  const supabase = databaseAdapter(
    createServerComponentClient<Database>({ cookies: () => cookieStore })
  );
  const { data, error } = await supabase.selectSlugSeq(
    params.slug,
    searchParams.seq
  );
  return (
    <>
      <p className={`text-2xl font-black`}>에딧페이지</p>
      {error && <p>이 문구가 보인다면 관리자에게 문의 부탁드립니다.</p>}
      {data && <EditContainer data={data} />}
    </>
  );
};
export default EditBlog;
