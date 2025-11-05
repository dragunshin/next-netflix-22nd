"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { tmdbImage } from "@/lib/tmdbImage";

export default function Detail() {
  const sp = useSearchParams();

  const poster_path = sp.get("poster_path") ?? "";
  const backdrop_path = sp.get("backdrop_path") ?? "";
  const overview = sp.get("overview") ?? "";

  const poster = poster_path ? tmdbImage(poster_path, "w500") : "";

  const src =
    tmdbImage(backdrop_path, "w1280") || tmdbImage(poster_path, "w780");

  return (
    <main className="mx-auto max-w-[430px] text-white">
      <div className="relative h-[415px] w-full overflow-hidden bg-neutral-900">
        {poster && (
          <Image
            src={src}
            alt={`movie`}
            fill
            className="object-cover"
            //sizes="430px"
            priority
          />
        )}
      </div>

      <button
        type="button"
        className="my-9 block mx-auto !h-[35px] !w-[303px] items-center justify-center gap-2 rounded-lg bg-[#C4C4C4] text-black font-bold shadow-sm hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-black/10 flex"
      >
        <span className="mt-[1px] text-[18px] leading-none">▶</span>
        <span className="text-[16px] leading-none">Play</span>
      </button>

      <h1 className="text-[23px] font-bold ml-5 ">Previews</h1>

      {overview && (
        <p className="p-4 mt-4 leading-6 text-sm text-neutral-200 whitespace-pre-line">
          {overview}
        </p>
      )}
    </main>
  );
}
