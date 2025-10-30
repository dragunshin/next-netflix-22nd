"use client";

import Lottie from "react-lottie-player";
import netflixAnimation from "@/images/landingPage/NetflixLogoMotion.json";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleAnimationComplete = () => {
    router.push("/home");
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black"
      style={{
        width: "100%",
        height: "811.7px",
      }}
    >
      <Lottie
        loop={false}
        animationData={netflixAnimation}
        play={true}
        style={{ width: "100%", height: "100%" }}
        onComplete={handleAnimationComplete}
      />
    </div>
  );
}
