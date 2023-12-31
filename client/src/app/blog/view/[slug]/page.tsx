import * as React from "react";
import { constants } from "@/app/common/domain/models/constants";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { blogSupabase } from "@/app/blog/adapter/supabase";
import MarkdownRenderer from "@/utils/MarkdownRenderer";

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
  const titleText = decodeURIComponent(params.slug);
  return {
    title: constants.createTitle(titleText),
  };
};

const ViewPage = async ({ params }: Props) => {
  const cookieStore = cookies();
  const supabase = blogSupabase(
    createServerComponentClient<Database>({ cookies: () => cookieStore })
  );
  const post = await supabase.selectSlug(params.slug);

  return <main>{post && <MarkdownRenderer content={post[0].article} />}</main>;
};
export default ViewPage;
