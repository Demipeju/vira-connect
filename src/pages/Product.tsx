import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Share2, ShoppingCart, MessageCircle, Shield, Truck, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const productImages = [
  "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop",
];

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();

  const handlePlaceOrder = () => {
    const existingOrders = JSON.parse(localStorage.getItem("viraOrders") || "[]");
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      items: quantity,
      total: 89.99 * quantity,
      status: "processing",
      store: "Artisan Pottery Studio",
      products: [
        {
          name: "Handmade Ceramic Vase",
          price: 89.99,
          quantity: quantity,
          image: productImages[0],
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
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="glass rounded-2xl overflow-hidden aspect-square">
                <img
                  src={productImages[selectedImage]}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`glass rounded-lg overflow-hidden aspect-square hover-lift ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    Handmade Ceramic Vase
                  </h1>
                  <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover-lift">
                    <Heart className="w-5 h-5 text-foreground" />
                  </button>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                    <span className="text-sm font-medium ml-2">4.9</span>
                    <span className="text-sm text-muted-foreground">(234 reviews)</span>
                  </div>
                  <span className="text-sm text-muted-foreground">1.2K sold</span>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold text-primary">$89.99</span>
                  <span className="text-xl text-muted-foreground line-through">$129.99</span>
                  <Badge className="bg-accent text-accent-foreground">30% OFF</Badge>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  A beautiful handcrafted ceramic vase, perfect for displaying flowers or as a standalone decorative piece. Each vase is unique and made with premium clay.
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="glass rounded-xl p-4">
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground ml-2">
                    Only 12 left in stock
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground hover-glow">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="flex-1" onClick={handlePlaceOrder}>
                  Buy Now
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="glass rounded-lg p-4 text-center">
                  <Shield className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-xs font-medium">Secure Payment</p>
                </div>
                <div className="glass rounded-lg p-4 text-center">
                  <Truck className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-xs font-medium">Fast Shipping</p>
                </div>
                <div className="glass rounded-lg p-4 text-center">
                  <RotateCcw className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-xs font-medium">Easy Returns</p>
                </div>
              </div>

              {/* Seller Info */}
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
                    alt="Seller"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">Artisan Pottery Studio</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      <span>4.9 (234 reviews)</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      Visit Store
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="glass w-full justify-start mb-6">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="mb-4">
                    This handcrafted ceramic vase is a testament to traditional pottery techniques combined with modern aesthetics. Each piece is individually thrown on the wheel and carefully shaped by skilled artisans.
                  </p>
                  <p className="mb-4">
                    The unique glaze creates a beautiful texture that catches the light beautifully. Perfect for displaying fresh or dried flowers, or as a standalone decorative piece.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>100% handmade with premium clay</li>
                    <li>Food-safe, non-toxic glaze</li>
                    <li>Dishwasher safe</li>
                    <li>Each piece is unique</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Specifications</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium text-muted-foreground">Height</dt>
                    <dd className="text-foreground">12 inches</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">Diameter</dt>
                    <dd className="text-foreground">6 inches</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">Material</dt>
                    <dd className="text-foreground">Ceramic</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">Weight</dt>
                    <dd className="text-foreground">2.5 lbs</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">Color</dt>
                    <dd className="text-foreground">Natural Earth Tone</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">Care</dt>
                    <dd className="text-foreground">Dishwasher safe</dd>
                  </div>
                </dl>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                <div className="text-muted-foreground">Reviews coming soon...</div>
              </div>
            </TabsContent>

            <TabsContent value="shipping">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>Ships within 2-3 business days via USPS Priority Mail.</p>
                  <p>Free shipping on orders over $100.</p>
                  <p>International shipping available with additional fees.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
