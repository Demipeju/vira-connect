import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import MarketplacePreview from "@/components/MarketplacePreview";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <MarketplacePreview />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
