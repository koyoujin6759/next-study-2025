export default function Layout({ children, sidebar, feed }: { children: React.ReactNode; sidebar: React.ReactNode; feed: React.ReactNode }) {
  return (
    <div>
      <div>{sidebar}</div>
      <div>{feed}</div>
      <div>{children}</div>
    </div>
  );
}
