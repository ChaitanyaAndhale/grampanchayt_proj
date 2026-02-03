import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import VillageSection from "../components/VillageSection";
import GramSabhaSection from "../components/GramSabhaSection";
import MembersSection from "../components/MembersSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />
      <Hero />
      <VillageSection />
      <GramSabhaSection />
      <MembersSection />
      <Footer />
    </div>
  );
};

export default Index;
