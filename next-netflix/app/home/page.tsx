import Previews from "../../components/features/Home/Previews";
import Thumb from "../../components/features/Home/Thumb";
import Continue from "../../components/features/Home/Continue";
import {
  getTrendingMoviesDay,
  getPopularMovies,
  getTopRatedMovies,
} from "@/lib/tmdbServer";
import Popular from "@/components/features/Home/Popular";

export default async function Home() {
  // SSR: 서버에서 데이터 페칭
  const [trendingData, popularData, topRatedData] = await Promise.all([
    getTrendingMoviesDay("en-US"),
    getPopularMovies("en-US"),
    getTopRatedMovies("en-US"),
  ]);

  return (
    <>
      <main className="mx-auto max-w-[430px]">
        <Thumb movies={trendingData.results} />
        <Previews movies={topRatedData.results} />
        <Continue movies={popularData.results} />
        <Popular movies={trendingData.results} />
      </main>
    </>
  );
}
