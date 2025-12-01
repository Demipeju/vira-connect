import { Store, MessageCircle, TrendingUp, ShieldCheck, Palette, Zap } from "lucide-react";

const features = [
  {
    icon: Store,
    title: "Personal Storefronts",
    description: "Create stunning, customizable stores that reflect your brand's unique personality and style.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageCircle,
    title: "Real-Time Chat",
    description: "Connect with customers instantly. Build relationships through direct, meaningful conversations.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "Track visits, sales, and engagement. Make data-driven decisions to grow your business.",
    color: "text-primary-glow",
    bgColor: "bg-primary-glow/10",
  },
  {
    icon: ShieldCheck,
    title: "Secure Transactions",
    description: "Shop and sell with confidence. Bank-grade security protects every transaction.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Palette,
    title: "Brand Customization",
    description: "Express yourself with custom colors, banners, and layouts. Stand out from the crowd.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Integrated logistics and tracking. Get products to customers faster than ever.",
    color: "text-primary-glow",
    bgColor: "bg-primary-glow/10",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="text-gradient"> Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you sell more, connect deeper, and grow faster.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover-lift group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
