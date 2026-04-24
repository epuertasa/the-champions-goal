import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import VideoIntroSection from "@/components/VideoIntroSection";
import BestGoalsSection from "@/components/BestGoalsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroBanner />
    <VideoIntroSection />
    <BestGoalsSection />
    <Footer />
  </div>
);

export default Index;
