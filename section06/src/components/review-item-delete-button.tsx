"use client";

import { useRef } from "react";

export default function ReviewItemDeleteButton({ reviewId, bookId }: { reviewId: number; bookId: number }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef}>
      <input name="reviewId" value={reviewId} hidden readOnly type="text" />
      <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
    </form>
  );
}
