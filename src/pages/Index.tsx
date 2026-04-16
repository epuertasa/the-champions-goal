import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import VideoIntroSection from "@/components/VideoIntroSection";
import OpinionSection from "@/components/OpinionSection";
import LegendsSection from "@/components/LegendsSection";
import FanZoneSection from "@/components/FanZoneSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroBanner />
    <VideoIntroSection />
    <div className="section-divider" />
    <OpinionSection />
    <div className="section-divider" />
    <LegendsSection />
    <div className="section-divider" />
    <FanZoneSection />
    <Footer />
  </div>
);

export default Index;
