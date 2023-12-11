import * as React from "react";
import { constants } from "@/app/common/domain/models/constants";
import { blogSupabase } from "@/app/blog/adapter/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import EditBoard from "@/app/blog/containers/EditBoard";
import type { Metadata } from "next";
import type { Database } from "@/lib/database.types";

type Props = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  return {
    title: constants.createTitle(`수정 : ${decodeURIComponent(params.slug)}`),
  };
};

const EditBlog = async ({ params }: Props) => {
  const cookieStore = cookies();

  const supabase = blogSupabase(
    createServerComponentClient<Database>({ cookies: () => cookieStore })
  );
  const post = await supabase.selectSlug(params.slug);
  return (
    <main>
      <h1>에딧페이지</h1>
      {post && <EditBoard article={post[0].article} />}
    </main>
  );
};
export default EditBlog;
