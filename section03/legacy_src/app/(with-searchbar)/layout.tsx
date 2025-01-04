import Searchbar from "../../components/searchbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <Searchbar />
      </div>
      {children}
    </div>
  );
}
