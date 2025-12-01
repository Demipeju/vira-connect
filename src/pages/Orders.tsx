import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const orders = [
  {
    id: "ORD-2024-001",
    date: "Jan 15, 2024",
    items: 2,
    total: "$134.99",
    status: "delivered",
    store: "Artisan Pottery Studio",
    products: [
      {
        name: "Handmade Ceramic Vase",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=100&h=100&fit=crop",
        price: "$89.99",
      },
      {
        name: "Coffee Mug Set",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop",
        price: "$45.00",
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "Jan 18, 2024",
    items: 1,
    total: "$65.00",
    status: "shipped",
    store: "Artisan Pottery Studio",
    products: [
      {
        name: "Decorative Pottery Bowl",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=100&h=100&fit=crop",
        price: "$65.00",
      },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "Jan 20, 2024",
    items: 1,
    total: "$129.99",
    status: "processing",
    store: "Tech Gadgets Hub",
    products: [
      {
        name: "Wireless Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
        price: "$129.99",
      },
    ],
  },
];

const statusConfig = {
  delivered: {
    icon: CheckCircle,
    label: "Delivered",
    color: "bg-accent/20 text-accent",
  },
  shipped: {
    icon: Truck,
    label: "Shipped",
    color: "bg-primary/20 text-primary",
  },
  processing: {
    icon: Clock,
    label: "Processing",
    color: "bg-muted text-muted-foreground",
  },
  pending: {
    icon: Package,
    label: "Pending",
    color: "bg-muted text-muted-foreground",
  },
};

const Orders = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              My <span className="text-gradient">Orders</span>
            </h1>
            <p className="text-muted-foreground">
              Track and manage your purchases
            </p>
          </div>

          {/* Search */}
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, product name, or store..."
                className="pl-10 bg-background/50"
              />
            </div>
          </div>

          {/* Orders List */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="glass mb-6">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {orders.map((order) => {
                const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
                return (
                  <div key={order.id} className="glass rounded-2xl p-6 hover-lift">
                    {/* Order Header */}
                    <div className="flex items-start justify-between mb-4 pb-4 border-b border-border/40">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg">{order.id}</h3>
                          <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[order.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ordered on {order.date} • {order.items} {order.items === 1 ? "item" : "items"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          From {order.store}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Total</p>
                        <p className="text-2xl font-bold text-primary">{order.total}</p>
                      </div>
                    </div>

                    {/* Products */}
                    <div className="space-y-3 mb-4">
                      {order.products.map((product, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm font-semibold text-primary">{product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Write Review
                        </Button>
                      )}
                      {order.status === "shipped" && (
                        <Button variant="outline" size="sm">
                          <Truck className="w-4 h-4 mr-2" />
                          Track Order
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact Seller
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Buy Again
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="processing">
              <div className="glass rounded-2xl p-12 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders currently processing</p>
              </div>
            </TabsContent>

            <TabsContent value="shipped">
              <div className="glass rounded-2xl p-12 text-center">
                <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders currently shipped</p>
              </div>
            </TabsContent>

            <TabsContent value="delivered">
              <div className="glass rounded-2xl p-12 text-center">
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No delivered orders</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
