import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function Page() {
  //자바스크립트함수는 객체이기때문에 메서드를 추가할수 있다.
  const router = useRouter();
  // console.log(router);
  const { q } = router.query;
  return <h1>search {q}</h1>;
}
Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
