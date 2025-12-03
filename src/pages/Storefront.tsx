import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle, Share2, Heart, ShoppingBag, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
const products = [
  {
    id: 1,
    name: "Handmade Ceramic Vase",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop",
    rating: 4.9,
    sales: 234,
  },
  {
    id: 2,
    name: "Artisan Coffee Mug Set",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    rating: 5.0,
    sales: 456,
  },
  {
    id: 3,
    name: "Decorative Pottery Bowl",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop",
    rating: 4.8,
    sales: 189,
  },
  {
    id: 4,
    name: "Ceramic Plant Pot",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    rating: 4.7,
    sales: 312,
  },
];

const Storefront = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handlePlaceOrder = (e: React.MouseEvent, product: typeof products[0]) => {
    e.stopPropagation();
    const existingOrders = JSON.parse(localStorage.getItem("viraOrders") || "[]");
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      items: 1,
      total: product.price,
      status: "processing",
      store: "Artisan Pottery Studio",
      products: [
        {
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ],
    };
    localStorage.setItem("viraOrders", JSON.stringify([newOrder, ...existingOrders]));
    toast.success("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Store Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1600&h=400&fit=crop"
            alt="Store Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-6 -mt-20 relative z-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Seller Profile Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-6 sticky top-24">
                {/* Profile Image */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-background shadow-strong">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                    alt="Seller"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-xl font-bold text-center mb-1">Artisan Pottery Studio</h2>
                <p className="text-sm text-muted-foreground text-center mb-4">Handmade Crafts</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-border/40">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">4.9</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">234</div>
                    <div className="text-xs text-muted-foreground">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">1.2K</div>
                    <div className="text-xs text-muted-foreground">Sales</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>Portland, Oregon</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 mb-4">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Seller
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="w-4 h-4 mr-2" />
                    Follow Store
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* About */}
                <div className="text-sm">
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Creating unique, handcrafted pottery since 2018. Each piece is made with love and attention to detail.
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary" className="text-xs">✓ Verified</Badge>
                  <Badge variant="secondary" className="text-xs">Fast Ship</Badge>
                  <Badge variant="secondary" className="text-xs">Top Rated</Badge>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="products" className="w-full">
                <TabsList className="glass w-full justify-start mb-6">
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="policies">Policies</TabsTrigger>
                </TabsList>

                <TabsContent value="products">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="glass rounded-2xl overflow-hidden hover-lift group cursor-pointer"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <button 
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full glass-dark flex items-center justify-center hover:bg-primary/20 transition-colors"
                          >
                            <Heart className="w-4 h-4 text-white" />
                          </button>
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xl font-bold text-primary">
                              ${product.price}
                            </span>
                            <div className="flex items-center gap-1 text-xs">
                              <Star className="w-3 h-3 text-accent fill-accent" />
                              <span className="font-medium">{product.rating}</span>
                              <span className="text-muted-foreground">({product.sales})</span>
                            </div>
                          </div>
                          
                          <Button 
                            onClick={(e) => handlePlaceOrder(e, product)}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                            size="sm"
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Place Order
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="about">
                  <div className="glass rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-4">Our Story</h3>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <p className="mb-4">
                        Welcome to Artisan Pottery Studio! We're a small, family-owned business dedicated to creating beautiful, functional pottery that brings joy to everyday life.
                      </p>
                      <p className="mb-4">
                        Each piece is carefully handcrafted using traditional techniques passed down through generations. We believe in sustainable practices and use locally-sourced clay whenever possible.
                      </p>
                      <p>
                        Thank you for supporting small businesses and handmade crafts!
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="glass rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-foreground mb-1">4.9</div>
                        <div className="flex gap-0.5 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">234 reviews</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">Customer reviews coming soon...</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="policies">
                  <div className="glass rounded-2xl p-8">
                    <h3 className="text-xl font-bold mb-4">Store Policies</h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Shipping</h4>
                        <p>All orders ship within 2-3 business days via USPS Priority Mail.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Returns</h4>
                        <p>30-day return policy. Items must be unused and in original packaging.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Custom Orders</h4>
                        <p>We accept custom orders! Message us to discuss your ideas.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Storefront;
