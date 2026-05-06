import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import VideoIntroSection from "@/components/VideoIntroSection";
import BestGoalsSection from "@/components/BestGoalsSection";
import TopScorersSection from "@/components/TopScorersSection";
import WinnersSection from "@/components/WinnersSection";
import OpinionSection from "@/components/OpinionSection";
import LegendsSection from "@/components/LegendsSection";
import FanZoneSection from "@/components/FanZoneSection";
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
      label="Coming Up · Post 2"
      title="Opinion Essay"
      subtitle="Our take on the modern era of the UEFA Champions League."
    />
    <OpinionSection />
    <SectionBanner
      label="Coming Up · Post 3"
      title="Students' Choice"
      subtitle="The records, moments and legends we couldn't leave out."
    />
    <LegendsSection />
    <SectionBanner
      label="Coming Up · Post 4"
      title="Fan Zone & Activities"
      subtitle="Test your UCL knowledge with games, puzzles and challenges made by Erik, Àlex & Luis."
    />
    <FanZoneSection />
    <Footer />
  </div>
);

export default Index;
