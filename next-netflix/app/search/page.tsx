"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import { useTopRatedMovies } from "@/hooks/useTopRatedMovies";
import { tmdbImage } from "@/lib/tmdbImage";
import SearchIcon from "@/images/searchPage/search.svg";
import DeleteIcon from "@/images/searchPage/delete.svg";
import PlayIcon from "@/images/searchPage/play.svg";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useSearchMovies(query);
  const { data: topRatedData, isLoading: topRatedLoading } = useTopRatedMovies();
  const results = data?.results ?? [];
  const topSearches = topRatedData?.results?.slice(0, 10) ?? [];

  return (
    <div className="min-h-screen bg-black pt-[44px]">
      {/* 검색창 */}
      <div className="sticky top-11 z-40 bg-[#424242] mb-6 flex items-center pl-3 pr-2 py-2.5">
        <SearchIcon className="w-5 h-5 mr-2 shrink-0" />
        <input
          type="text"
          placeholder="Search for a show, movie, genre, e.t.c"
          className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-[15px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button
          onClick={() => setQuery("")}
          className="p-1 shrink-0"
        >
          <DeleteIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 검색 결과 또는 Top Searches */}
      <div>
        {!query ? (
          // Top Searches
          <div>
            <h2 className="text-white text-[26.75px] font-bold mb-6 px-2">
              Top Searches
            </h2>
            <div className="space-y-0">
              {topRatedLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-[#424242] mb-[3px] h-[76px] animate-pulse"
                  />
                ))
              ) : (
                topSearches.map((movie) => {
                  const src = tmdbImage(movie.backdrop_path || movie.poster_path, "w780");
                  return (
                    <div
                      key={movie.id}
                      className="flex items-center bg-[#424242] mb-[3px] overflow-hidden"
                    >
                      <div className="relative w-[146px] h-[76px] bg-neutral-800 shrink-0">
                        {src && (
                          <Image
                            src={src}
                            alt={movie.title}
                            fill
                            className="object-cover"
                            sizes="146px"
                          />
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-between pl-4 pr-3">
                        <p className="text-white text-[14.72px] tracking-tight">
                          {movie.title}
                        </p>
                        <button className="shrink-0">
                          <PlayIcon className="w-7 h-7" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          // 검색 결과
          <div>
            {isLoading ? (
              <div className="space-y-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-[#424242] mb-[3px] h-[76px] animate-pulse"
                  />
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-0">
                {results.map((movie) => {
                  const src = tmdbImage(movie.backdrop_path || movie.poster_path, "w780");
                  return (
                    <div
                      key={movie.id}
                      className="flex items-center bg-[#424242] mb-[3px] overflow-hidden"
                    >
                      <div className="relative w-[146px] h-[76px] bg-neutral-800 shrink-0">
                        {src ? (
                          <Image
                            src={src}
                            alt={movie.title}
                            fill
                            className="object-cover"
                            sizes="146px"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-white/40 text-xs text-center px-2">
                              {movie.title}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-between pl-4 pr-3">
                        <p className="text-white font-medium text-[14.72px] line-clamp-1 pr-2 tracking-tight">
                          {movie.title}
                        </p>
                        <button className="shrink-0">
                          <PlayIcon className="w-7 h-7" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
