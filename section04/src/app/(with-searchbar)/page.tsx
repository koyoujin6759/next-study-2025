import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

// export const dynamic = "";
// 특정페이지 유형을 강제로 static, dynamic 설정
//1.auto :기본값,아무것도 강제하지 않음
//2.force-dynamic :
//3.error
//4.force-static

async function AllBooks() {
  //서버컴포넌트
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, { cache: "force-cache" });
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }
  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, { next: { revalidate: 10 } });
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
