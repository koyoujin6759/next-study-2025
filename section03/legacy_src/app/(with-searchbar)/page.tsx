// "use client";

// import { useEffect } from "react";
import ClientComponent from "../../components/client-component";
import styles from "./page.module.css";
import ServerComponent from "../../components/server-component";

export default function Home() {
  // console.log("홈컴포넌트실행");
  // useEffect(() => {});

  return (
    <div className={styles.page}>
      index page
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
