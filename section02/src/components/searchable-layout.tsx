import React, { ReactNode, useState } from "react";
import { useRouter } from "next/router";

export default function SearchableLayout({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = () => {
    if (!search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <div>
        <input type="text" placeholder="검색어를 입력하세요" onChange={onChangeSearch} value={search} />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
