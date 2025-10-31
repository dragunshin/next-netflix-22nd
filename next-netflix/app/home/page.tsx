import TrendingMovies from "../../components/features/Home/TrendingMovies";
import Previews from "../../components/features/Home/Previews";
import Thumb from "../../components/features/Home/Thumb";
import Continue from "../../components/features/Home/Continue";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-[430px]">
        <Thumb />
        <Previews />
        <Continue />
      </main>
    </>
  );
}
