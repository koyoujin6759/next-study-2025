import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string | undefined;
  };
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`, { cache: "force-cache" });
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }
  const books: BookData[] = await response.json();
  if (books.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
