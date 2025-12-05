import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { storesData } from "@/data/stores";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = parseInt(id || "1");
  
  let foundProduct = null;
  let foundStore = null;
  for (const store of storesData) {
    const product = store.products.find(p => p.id === productId);
    if (product) { foundProduct = product; foundStore = store; break; }
  }
  const product = foundProduct || storesData[0].products[0];
  const store = foundStore || storesData[0];

  const handlePlaceOrder = () => {
    const existingOrders = JSON.parse(localStorage.getItem("viraOrders") || "[]");
    const newOrder = {
      id: `ORD-${Date.now()}`, date: new Date().toISOString().split("T")[0], items: 1, total: product.price,
      status: "processing", store: store.name, createdAt: Date.now(),
      products: [{ name: product.name, price: product.price, quantity: 1, image: product.image }],
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass rounded-2xl overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-[500px] object-cover" />
            </div>
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">{store.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-muted-foreground">({product.sales} sold)</span>
                  </div>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">By {store.name}</span>
                </div>
              </div>
              <div className="glass rounded-2xl p-6">
                <span className="text-4xl font-bold text-primary mb-4 block">${product.price.toFixed(2)}</span>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm"><Truck className="w-5 h-5 text-primary" /><span>Free shipping on orders over $50</span></div>
                  <div className="flex items-center gap-3 text-sm"><Shield className="w-5 h-5 text-primary" /><span>Buyer protection guaranteed</span></div>
                  <div className="flex items-center gap-3 text-sm"><RotateCcw className="w-5 h-5 text-primary" /><span>30-day return policy</span></div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handlePlaceOrder} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                    <ShoppingBag className="w-5 h-5 mr-2" />Buy Now
                  </Button>
                  <Button variant="outline" size="lg"><Heart className="w-5 h-5" /></Button>
                </div>
              </div>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={store.image} alt={store.name} className="w-16 h-16 rounded-full object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{store.name}</h3>
                    <p className="text-sm text-muted-foreground">{store.location}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => navigate(`/storefront/${store.id}`)}>Visit Store</Button>
                  <Button variant="outline" className="flex-1" onClick={() => navigate(`/chat?store=${store.id}`)}>
                    <MessageCircle className="w-4 h-4 mr-2" />Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Product;