import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Edit, Plus, MoreVertical, Package, TrendingUp, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

const sellerProducts = [
  {
    id: 1,
    name: "Professional Basketball",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop",
    stock: 24,
    sales: 156,
    status: "active",
  },
  {
    id: 2,
    name: "Premium Football",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop",
    stock: 32,
    sales: 203,
    status: "active",
  },
  {
    id: 3,
    name: "Soccer Jersey - Home Kit",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=400&h=400&fit=crop",
    stock: 45,
    sales: 312,
    status: "active",
  },
  {
    id: 4,
    name: "Professional Shin Guards",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1600679472829-3044539ce8ed?w=400&h=400&fit=crop",
    stock: 67,
    sales: 89,
    status: "active",
  },
  {
    id: 5,
    name: "Tennis Racquet Pro",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1617083934551-ac1f1c559cf4?w=400&h=400&fit=crop",
    stock: 12,
    sales: 78,
    status: "active",
  },
  {
    id: 6,
    name: "Athletic Performance Socks (6-Pack)",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop",
    stock: 120,
    sales: 445,
    status: "active",
  },
  {
    id: 7,
    name: "Running Sportswear Set",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
    stock: 28,
    sales: 167,
    status: "active",
  },
  {
    id: 8,
    name: "Baseball Bat - Aluminum",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=400&h=400&fit=crop",
    stock: 15,
    sales: 54,
    status: "low_stock",
  },
  {
    id: 9,
    name: "Yoga Mat Premium",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    stock: 0,
    sales: 234,
    status: "out_of_stock",
  },
  {
    id: 10,
    name: "Gym Gloves Pro",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
    stock: 56,
    sales: 189,
    status: "active",
  },
  {
    id: 11,
    name: "Compression Shorts",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=400&h=400&fit=crop",
    stock: 78,
    sales: 267,
    status: "active",
  },
  {
    id: 12,
    name: "Sports Water Bottle",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    stock: 95,
    sales: 512,
    status: "active",
  },
];

const SellerStore = () => {
  const { user } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-accent/20 text-accent border-accent/30">Active</Badge>;
      case "low_stock":
        return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Low Stock</Badge>;
      case "out_of_stock":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Out of Stock</Badge>;
      default:
        return null;
    }
  };

  const totalProducts = sellerProducts.length;
  const totalSales = sellerProducts.reduce((acc, p) => acc + p.sales, 0);
  const activeProducts = sellerProducts.filter(p => p.status === "active").length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Store Header */}
          <div className="glass rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Package className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">
                    {user?.username ? `${user.username}'s Sports Store` : "My Sports Store"}
                  </h1>
                  <p className="text-muted-foreground">Manage your products and inventory</p>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </div>

            {/* Store Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/40">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{totalProducts}</div>
                <div className="text-sm text-muted-foreground">Total Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{activeProducts}</div>
                <div className="text-sm text-muted-foreground">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{totalSales}</div>
                <div className="text-sm text-muted-foreground">Total Sales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="glass">
                <TabsTrigger value="all">All Products ({totalProducts})</TabsTrigger>
                <TabsTrigger value="active">Active ({activeProducts})</TabsTrigger>
                <TabsTrigger value="low_stock">Low Stock</TabsTrigger>
                <TabsTrigger value="out_of_stock">Out of Stock</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sellerProducts.map((product) => (
                  <div
                    key={product.id}
                    className="glass rounded-2xl overflow-hidden hover-lift group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-muted/50 transition-colors">
                        <MoreVertical className="w-4 h-4 text-foreground" />
                      </button>
                      <div className="absolute top-3 left-3">
                        {getStatusBadge(product.status)}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-primary">
                          ${product.price}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <TrendingUp className="w-3 h-3" />
                          <span>{product.sales} sold</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Stock: <span className={product.stock === 0 ? "text-destructive" : product.stock < 20 ? "text-yellow-600" : "text-accent"}>{product.stock}</span>
                        </span>
                        <Button size="sm" variant="outline" className="h-8">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sellerProducts.filter(p => p.status === "active").map((product) => (
                  <div
                    key={product.id}
                    className="glass rounded-2xl overflow-hidden hover-lift group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        {getStatusBadge(product.status)}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">${product.price}</span>
                        <span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="low_stock">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sellerProducts.filter(p => p.status === "low_stock").map((product) => (
                  <div
                    key={product.id}
                    className="glass rounded-2xl overflow-hidden hover-lift group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        {getStatusBadge(product.status)}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">${product.price}</span>
                        <span className="text-xs text-yellow-600">Stock: {product.stock}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {sellerProducts.filter(p => p.status === "low_stock").length === 0 && (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No low stock items
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="out_of_stock">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sellerProducts.filter(p => p.status === "out_of_stock").map((product) => (
                  <div
                    key={product.id}
                    className="glass rounded-2xl overflow-hidden hover-lift group opacity-75"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover grayscale"
                      />
                      <div className="absolute top-3 left-3">
                        {getStatusBadge(product.status)}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">${product.price}</span>
                        <Button size="sm" variant="outline">Restock</Button>
                      </div>
                    </div>
                  </div>
                ))}
                {sellerProducts.filter(p => p.status === "out_of_stock").length === 0 && (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No out of stock items
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerStore;