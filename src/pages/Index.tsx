import Header from "../components/Header";
import Navigation from "../components/Navigation";
import LeadersCarousel from "../components/LeadersCarousel";
import Hero from "../components/Hero";
import MissionVision from "../components/MissionVision";
import UpcomingEventSection from "../components/UpcomingEventSection";
import VillageSection from "../components/VillageSection";
import ServicesSection from "../components/ServicesSection";
import GoogleEarthSection from "../components/GoogleEarthSection";
import GramSabhaSection from "../components/GramSabhaSection";
import VideosSection from "../components/VideosSection";
import SuccessStoriesSection from "../components/SuccessStoriesSection";
import AwardsSection from "../components/AwardsSection";
import MembersSection from "../components/MembersSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />
      {/* Content wrapper with padding to account for fixed header */}
      <div className="pt-24 md:pt-28">
        <LeadersCarousel />
      </div>
      <Hero />
      <MissionVision />

      {/* Upcoming Events - Priority Announcement */}
      <UpcomingEventSection />

      {/* Decorative Wave Separator */}
      <div className="relative h-16 bg-gradient-to-b from-primary/5 to-transparent">
        <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" fill="white" opacity="0.3" />
          <path d="M0,20 C300,100 900,100 1200,20 L1200,120 L0,120 Z" fill="white" opacity="0.5" />
          <path d="M0,40 C300,120 900,120 1200,40 L1200,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      <VillageSection />

      <ServicesSection />

      {/* Google Earth Integration */}
      <GoogleEarthSection />

      {/* Decorative Gradient Separator */}
      <div className="h-24 bg-gradient-to-b from-white via-blue-50/20 to-slate-50/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
        </div>
      </div>

      <GramSabhaSection />

      {/* Decorative Line Separator */}
      <div className="relative h-20 bg-gradient-to-b from-slate-50/50 to-background">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center shadow-md">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
          </div>
        </div>
      </div>

      <VideosSection />
      <SuccessStoriesSection />

      {/* Decorative Wave Separator */}
      <div className="relative h-16 bg-gradient-to-b from-white via-amber-50/30 to-white">
        <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" fill="white" opacity="0.3" />
          <path d="M0,20 C300,100 900,100 1200,20 L1200,120 L0,120 Z" fill="white" opacity="0.5" />
          <path d="M0,40 C300,120 900,120 1200,40 L1200,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      <AwardsSection />

      {/* Decorative Transition to Members */}
      <div className="h-16 bg-gradient-to-b from-background to-muted/20"></div>

      <MembersSection />

      {/* Footer Wave Transition */}
      <div className="relative h-20 bg-gradient-to-b from-background to-slate-900">
        <svg className="absolute top-0 w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,20 900,20 1200,60 L1200,0 L0,0 Z" fill="white" opacity="0.1" />
          <path d="M0,80 C300,40 900,40 1200,80 L1200,0 L0,0 Z" fill="rgb(15, 23, 42)" opacity="0.3" />
          <path d="M0,100 C300,60 900,60 1200,100 L1200,0 L0,0 Z" fill="rgb(15, 23, 42)" />
        </svg>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
