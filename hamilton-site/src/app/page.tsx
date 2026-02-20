import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import UnicornHero from "@/components/UnicornHero";
import VideoSection from "@/components/VideoSection";
import Marquee from "@/components/Marquee";
import Experiences from "@/components/Experiences";
import HowItWorks from "@/components/HowItWorks";
import AfterHours from "@/components/AfterHours";
import SocialProof from "@/components/SocialProof";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <UnicornHero />
      <VideoSection />
      <Marquee />
      <Experiences />
      <HowItWorks />
      <AfterHours />
      <SocialProof />
      <CTA />
      <Marquee />
      <Footer />
    </>
  );
}
