
import HeroSection from "@/components/homepage/HeroSection";
import FeaturedJob from "@/components/homepage/FeaturedJob";
import HeaderNav from "@/components/homepage/HeaderNav";
import HiringProcess from "@/components/homepage/HiringProcess";

export default function Home() {
  return (
    <>
      <HeaderNav />
      <HeroSection/>
      <FeaturedJob />
      <HiringProcess/>

    </>
  );
}
