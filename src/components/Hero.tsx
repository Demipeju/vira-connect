import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10 animate-glow" />
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Sparkle effects */}
      <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-primary animate-sparkle" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-accent animate-sparkle" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/4 w-2 h-2 rounded-full bg-primary-glow animate-sparkle" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-accent animate-sparkle" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Where Commerce Meets Community</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Build Your
            <span className="text-gradient"> Digital Empire</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            VIRA blends professional storefronts with social engagement. Sell with personality, shop with confidence, and build lasting connections.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow group">
              Start Selling
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 hover:bg-accent/10 hover:border-accent">
              Explore Marketplace
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>10K+ Active Sellers</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span>$2M+ Monthly Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-glow" />
              <span>99% Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
