"use client";

import { ReactNode } from "react";

// import ServerComponent from "./server-component";
//클라이언트 컴포넌트에서 서버컴포넌트를 직접 import 하는것은 지양함. children props

export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log("client component!!");
  //   return <ServerComponent />;
  return <div>{children}</div>;
}
