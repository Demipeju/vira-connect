import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle, Share2, Heart, ShoppingBag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { storesData } from "@/data/stores";

const Storefront = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const store = storesData.find(s => s.id === parseInt(id || "1")) || storesData[0];
  const products = store.products;

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleMessageSeller = () => {
    navigate(`/chat?store=${store.id}`);
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
      store: store.name,
      createdAt: Date.now(),
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
            src={store.banner}
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
                    src={store.image}
                    alt="Seller"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-xl font-bold text-center mb-1">{store.name}</h2>
                <p className="text-sm text-muted-foreground text-center mb-4">{store.category}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-border/40">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{store.rating}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{store.reviews}</div>
                    <div className="text-xs text-muted-foreground">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{store.sales}</div>
                    <div className="text-xs text-muted-foreground">Sales</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{store.location}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 mb-4">
                  <Button 
                    onClick={handleMessageSeller}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
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
                    {store.description}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {store.verified && <Badge variant="secondary" className="text-xs">✓ Verified</Badge>}
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
                              ${product.price.toFixed(2)}
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
                        Welcome to {store.name}! {store.description}
                      </p>
                      <p className="mb-4">
                        We take pride in offering quality products and excellent customer service. Each item in our store is carefully curated to ensure you get the best value.
                      </p>
                      <p>
                        Thank you for visiting our store!
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="glass rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-foreground mb-1">{store.rating}</div>
                        <div className="flex gap-0.5 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">{store.reviews} reviews</div>
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
                        <p>All orders ship within 2-3 business days via standard shipping.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Returns</h4>
                        <p>30-day return policy. Items must be unused and in original packaging.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Customer Support</h4>
                        <p>Contact us via the Message Seller button for any questions or concerns.</p>
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
