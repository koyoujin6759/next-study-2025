import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
type SearchParams = Promise<{ q?: string }>;

async function SearchResult({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
  await delay(1000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, { cache: "force-cache" });

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

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<BookListSkeleton count={1} />}>
      <SearchResult searchParams={searchParams} />
    </Suspense>
  );
}
