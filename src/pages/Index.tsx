import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import VideoIntroSection from "@/components/VideoIntroSection";
import BestGoalsSection from "@/components/BestGoalsSection";
import TopScorersSection from "@/components/TopScorersSection";
import WinnersSection from "@/components/WinnersSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroBanner />
    <VideoIntroSection />
    <BestGoalsSection />
    <TopScorersSection />
    <WinnersSection />
    <Footer />
  </div>
);

export default Index;
