import type { FC } from "react";
import { Metadata } from "next";
import { constants } from "@/app/common/domain/models/constants";
import EditBoard from "@containers/EditBoard";

export const metadata: Metadata = {
  title: constants.createTitle("Blog"),
};

const Blog: FC = () => {
  return (
    <main className={"my-auto"}>
      <EditBoard />
    </main>
  );
};

export default Blog;
