import * as React from "react";
import { constants } from "@/app/common/domain/models/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: constants.createTitle("글 작성하기"),
};

const ArticleCreate: React.FC = () => {
  return (
    <main>
      <p>글 작성 페이지</p>
    </main>
  );
};
export default ArticleCreate;
