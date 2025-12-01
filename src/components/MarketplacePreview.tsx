import { Button } from "@/components/ui/button";
import { Star, Heart, MessageCircle, TrendingUp } from "lucide-react";

const stores = [
  {
    name: "Artisan Pottery Studio",
    category: "Handmade Crafts",
    image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 234,
    sales: "500+",
  },
  {
    name: "Tech Gadgets Hub",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 456,
    sales: "1.2K+",
  },
  {
    name: "Vintage Fashion Co",
    category: "Fashion & Style",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
    rating: 5.0,
    reviews: 189,
    sales: "800+",
  },
  {
    name: "Organic Wellness",
    category: "Health & Beauty",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 312,
    sales: "600+",
  },
];

const MarketplacePreview = () => {
  return (
    <section id="marketplace" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing
            <span className="text-gradient"> Storefronts</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse curated stores from talented sellers. Each one with its own personality and story.
          </p>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stores.map((store, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden hover-lift group cursor-pointer"
            >
              {/* Store Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full glass-dark flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Heart className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Store Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {store.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {store.category}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-accent fill-accent" />
                    <span className="font-medium text-foreground">{store.rating}</span>
                    <span>({store.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-primary" />
                    <span>{store.sales} sales</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Visit Store
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-accent/10">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="border-2 hover:bg-primary/5 hover:border-primary">
            View All Stores
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
