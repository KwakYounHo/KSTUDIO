"use client";

import { useRouter } from "next/navigation";

type Props = {
  seq: number;
};

const ManagingButton = ({ seq }: Props): JSX.Element => {
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
    <>
      <button type={"button"} onClick={deleteRequest} className={"border-2"}>
        삭제
      </button>
    </>
  );
};
export default ManagingButton;
