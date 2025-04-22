"use client";
import HeroSection from "@/components/homepage/HeroSection";
import FeaturedJob from "@/components/homepage/FeaturedJob";
import HeaderNav from "@/components/homepage/HeaderNav";
import HiringProcess from "@/components/homepage/HiringProcess";
import JoinTeamSection from "@/components/homepage/JoinTeam";

export default function Home() {
  return (
    <>
      <HeaderNav />
      <HeroSection />
      <FeaturedJob />
      <HiringProcess />
      <JoinTeamSection />
    </>
  );
}
