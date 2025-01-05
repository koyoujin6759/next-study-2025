"use client";
import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);
  return (
    <>
      <div>검색과정에서 오류가 발생했습니다. {error.message}</div>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); //현재 페이지에필요한 서버컴포넌트들을 다시 불러옴.비동기.
            reset(); //에러상태를 초기화하고 컴포넌트들을 다시 렌더링.
          });
        }}
      >
        다시 시도
      </button>
    </>
  );
}
