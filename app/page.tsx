"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 100);
  }, []);
  return null;
};

export default Home;
