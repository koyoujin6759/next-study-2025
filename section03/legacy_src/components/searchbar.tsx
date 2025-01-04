"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = () => {
    router.push(`/search?s=${search}`); // 검색 결과 페이지로 이동
  };

  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
