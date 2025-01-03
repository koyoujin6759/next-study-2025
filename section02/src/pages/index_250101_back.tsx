import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = () => {
  //약속된 이름의 함수명, 이페이지는 이제 ssr로 동작하도록 자동으로 설정된다.
  //서버에서만 실행
  //페이지역할을 하는 해당 컴포넌트보다 먼저 실행되어서 해당 컴포넌트에 필요한 백엔행데이터 같은 것을 미리 불러온다.
  //객체형태를 return 한다.
  //브라우저를 읽을수 없다. ex) window.alert ~

  console.log("서버사이드프롭스입니다."); //서버에서만 작동함
  const data = "hello";
  return {
    //객체타입의 props가 있어야한다.
    props: {
      data,
    },
  };
};

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //infer~ > 서버에서 반환되는 데이터의 타입을 자동으로 추론해준다.

  console.log(data); // 서버에서 1번, 브라우저에서 1번 총 2번실행됨.

  useEffect(() => {
    console.log(window);
  }, []); //마운트된 이후 실행, 서버에서는 x , 브라우저에서만 실행됨.
  //main page
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
