"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  seq: number;
  slug: string;
};

const ManagingButton = ({ seq, slug }: Props): JSX.Element => {
  const router = useRouter();

  const deleteRequest = async () => {
    const request = await fetch(`/blog/delete/api?seq=${seq}`, {
      method: "DELETE",
    });

    if (request.status < 400) {
      router.push(await request.json());
      router.refresh();
    } else {
      alert("게시글 삭제 오류");
      console.error(await request.json());
    }
  };

  return (
    <div className={"flex gap-2"}>
      <button type={"button"} onClick={deleteRequest} className={"border-2"}>
        삭제
      </button>
      <Link href={`/blog/edit/${slug}?seq=${seq}`} className={"border-2"}>
        <button type={"button"}>수정</button>
      </Link>
    </div>
  );
};
export default ManagingButton;
