"use server"; //서버에서만 실행
import { revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString(); // ? 없으면 에러 발생
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "모든 필드를 입력해주세요.",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: "POST",
      body: JSON.stringify({ bookId, content, author }),
    });
    if (!response.ok) {
      throw new Error(`리뷰 작성 실패: ${response.statusText}`);
    }
    // revalidatePath(`/book/${bookId}`); //next 서버가 인수로 전달한 해당경로를 재검증요청함 (다시생성) , 클라이언트 컴포넌트에서 호출할수 없음, 데이터 캐시옵션이 무효화됨.
    revalidateTag(`reviews-${bookId}`);
    return {
      status: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: `리뷰 작성 실패: ${error}`,
    };
  }
}
