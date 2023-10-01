"use client";

import * as React from "react";
import EditBoard from "@/containers/EditBoard";

export const EditArticle: React.FC = async () => {
  return (
    <main className={"my-auto"}>
      <EditBoard />
    </main>
  );
};
export default EditArticle;
