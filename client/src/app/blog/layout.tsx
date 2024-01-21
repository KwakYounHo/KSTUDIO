import { commonClassName } from "@/app/common/commonClass";

type Props = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: Props): JSX.Element => {
  return (
    <main
      className={`${commonClassName.topBlank} flex flex-col container m-auto items-center`}
    >
      {children}
    </main>
  );
};
export default BlogLayout;
