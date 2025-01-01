import { BookData } from "@/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  //q? -> 선택적 프로퍼티, 꼭받지 않아도되는 매개변수
  let url = "http://localhost:12345/book";

  if (q) {
    //검색어가 있다면
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json(); //json 포멧으로 변환해서 리턴,
  } catch (err) {
    console.error(err);
    return [];
  }
}
