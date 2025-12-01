import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "No listing fees for your first month",
  "24/7 customer support",
  "Unlimited product uploads",
  "Advanced analytics dashboard",
];

const CallToAction = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-hero opacity-5 animate-glow" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Start Your
              <span className="text-gradient"> Journey?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of successful sellers who've built their dream business on VIRA.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border/40"
                >
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow group">
                Create Your Store
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-2">
                Talk to Sales
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              No credit card required • Free 30-day trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
