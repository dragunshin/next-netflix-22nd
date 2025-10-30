"use client";

import { useState } from "react";
import Lottie from "react-lottie-player";
import netflixAnimation from "@/public/landingPage/NetflixLogoMotion.json";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleAnimationComplete = () => {
    // router.push("/home"); 
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black"
      style={{
        width: "100%",
        height: "100vh",
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
