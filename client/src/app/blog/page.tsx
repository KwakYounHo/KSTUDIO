import * as React from "react";
import { Metadata } from "next";
import { constants } from "@/app/common/domain/models/constants";
import { clientSupabase } from "@/utils/supabase";

// export const metadata: Metadata = {
//   title: constants.createTitle("Blog"),
// };

const Blog = async (): Promise<React.JSX.Element> => {
  const { data: posts, error } = await clientSupabase.from("posts").select("*");

  if (error) {
    console.error(error);
  }
  return (
    <main>
      <h1>공사중</h1>
      <div>
        <p>아래는 결과</p>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </div>
    </main>
  );
};

export default Blog;
