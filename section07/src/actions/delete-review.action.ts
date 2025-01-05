"use server";
import { revalidateTag } from "next/cache";
export async function deleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get("reviewId")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: "리뷰 아이디가 없습니다.",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`리뷰 삭제 실패: ${response.statusText}`);
    }
    revalidateTag(`reviews-${bookId}`);
    return {
      status: true,
      error: null,
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 삭제 실패: ${error}`,
    };
  }
}
