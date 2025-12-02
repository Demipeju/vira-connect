import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Star, Heart, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { storesData } from "@/data/stores";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const categories = ["All", "Fashion", "Electronics", "Crafts", "Books", "Beauty", "Home & Living", "Art"];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [favourites, setFavourites] = useState<number[]>(() => {
    const saved = localStorage.getItem("viraFavourites");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  const toggleFavourite = (storeId: number) => {
    const newFavourites = favourites.includes(storeId)
      ? favourites.filter((id) => id !== storeId)
      : [...favourites, storeId];
    
    setFavourites(newFavourites);
    localStorage.setItem("viraFavourites", JSON.stringify(newFavourites));
    
    if (newFavourites.includes(storeId)) {
      toast.success("Added to favourites!");
    } else {
      toast.success("Removed from favourites");
    }
  };

  const filteredAndSortedStores = useMemo(() => {
    let filtered = storesData;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((store) =>
        store.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (store) =>
          store.name.toLowerCase().includes(query) ||
          store.category.toLowerCase().includes(query) ||
          store.seller.toLowerCase().includes(query)
      );
    }

    // Filter by favourites
    if (showFavouritesOnly) {
      filtered = filtered.filter((store) => favourites.includes(store.id));
    }

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case "popular":
        sorted.sort((a, b) => parseInt(b.sales) - parseInt(a.sales));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "a-z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [selectedCategory, searchQuery, sortBy, showFavouritesOnly, favourites]);

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 bg-background/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant={showFavouritesOnly ? "default" : "outline"}
                className="gap-2"
                onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}
              >
                <Heart className={`w-4 h-4 ${showFavouritesOnly ? "fill-current" : ""}`} />
                Favourites {favourites.length > 0 && `(${favourites.length})`}
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
          {filteredAndSortedStores.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">No stores found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedStores.map((store) => (
                <div key={store.id} className="glass rounded-2xl overflow-hidden hover-lift group">
                  <Link to={`/storefront/${store.id}`}>
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
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavourite(store.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full glass-dark flex items-center justify-center hover:bg-primary/20 transition-colors z-10"
                  >
                    <Heart
                      className={`w-4 h-4 text-white ${
                        favourites.includes(store.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Marketplace;
