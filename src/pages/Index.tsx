import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import VideoIntroSection from "@/components/VideoIntroSection";
import BestGoalsSection from "@/components/BestGoalsSection";
import TopScorersSection from "@/components/TopScorersSection";
import WinnersSection from "@/components/WinnersSection";
import SectionBanner from "@/components/SectionBanner";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroBanner />
    <VideoIntroSection />
    <BestGoalsSection />
    <TopScorersSection />
    <SectionBanner
      label="Next Chapter"
      title="The Hall Of Champions"
      subtitle="A journey through every European king — from 1956 to today."
    />
    <WinnersSection />
    <SectionBanner
      label="Coming Up · Post 4"
      title="Fan Zone & Activities"
      subtitle="Test your UCL knowledge with games, puzzles and challenges made by Erik, Àlex & Luis."
    />
    <Footer />
  </div>
);

export default Index;
