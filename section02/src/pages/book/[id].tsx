import fetchOneBook from "@/lib/fetch-one-book";
import style from "@/pages/book/[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }, { params: { id: "3" } }],
    fallback: "blocking", //만일의 상황에 대비하여 미리 경로를 정의해두는 것.
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  // console.log(context);
  const id = context.params!.id;
  //params! -> params가 있을거다 라고 단언. 어차피 ID가 있어야 진입할수있는 상세페이지이기때문에 가능.
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta property="og:description" content="한입북스에 등록된 도서들을 소개합니다." />
        </Head>
        <div>로딩 중입니다.</div>
      </>
    );
  }

  if (!book) return "문제가 발생했습니다. 다시 시도해주세요.";

  const { title, subTitle, description, author, coverImgUrl, publisher } = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
          <Image src={coverImgUrl} alt={`${title} 책 표지`} width={300} height={500} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
