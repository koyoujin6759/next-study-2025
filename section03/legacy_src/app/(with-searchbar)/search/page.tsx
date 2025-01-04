import ClientComponent from "../../../components/client-component";

export default async function Page({ searchParams }: { searchParams: Promise<{ s: string }> }) {
  const s = await searchParams;

  return (
    <div>
      {s.s}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
