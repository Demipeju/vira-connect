import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Star, Heart, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = ["All", "Fashion", "Electronics", "Crafts", "Beauty", "Home & Living", "Art"];

const stores = [
  {
    id: 1,
    name: "Artisan Pottery Studio",
    category: "Handmade Crafts",
    image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 234,
    sales: "500+",
    verified: true,
  },
  {
    id: 2,
    name: "Tech Gadgets Hub",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 456,
    sales: "1.2K+",
    verified: true,
  },
  {
    id: 3,
    name: "Vintage Fashion Co",
    category: "Fashion & Style",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
    rating: 5.0,
    reviews: 189,
    sales: "800+",
    verified: true,
  },
  {
    id: 4,
    name: "Organic Wellness",
    category: "Health & Beauty",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 312,
    sales: "600+",
    verified: false,
  },
  {
    id: 5,
    name: "Modern Home Decor",
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 421,
    sales: "950+",
    verified: true,
  },
  {
    id: 6,
    name: "Creative Art Studio",
    category: "Art",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 198,
    sales: "380+",
    verified: false,
  },
];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Discover <span className="text-gradient">Amazing Stores</span>
            </h1>
            <p className="text-muted-foreground">
              Browse thousands of unique storefronts from talented creators and sellers
            </p>
          </div>

          {/* Search and Filters */}
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search stores, products, or sellers..."
                  className="pl-10 bg-background/50"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48 bg-background/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="sales">Top Sales</SelectItem>
                  <SelectItem value="recent">Recently Added</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Categories */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-background/50 text-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Store Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stores.map((store) => (
              <a
                key={store.id}
                href={`/storefront/${store.id}`}
                className="glass rounded-2xl overflow-hidden hover-lift group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {store.verified && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full glass-dark text-xs text-white font-medium">
                      ✓ Verified
                    </div>
                  )}
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full glass-dark flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {store.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {store.category}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      <span className="font-medium text-foreground">{store.rating}</span>
                      <span>({store.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-primary" />
                      <span>{store.sales}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-2">
              Load More Stores
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Marketplace;
