import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderProduct {
  name: string;
  image: string;
  price: string | number;
  quantity?: number;
}

interface Order {
  id: string;
  date: string;
  items: number;
  total: string | number;
  status: string;
  store: string;
  products: OrderProduct[];
}

const defaultOrders: Order[] = [
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("viraOrders") || "[]");
    // Combine stored orders with default orders
    setOrders([...storedOrders, ...defaultOrders]);
  }, []);

  const formatPrice = (price: string | number) => {
    if (typeof price === "number") {
      return `$${price.toFixed(2)}`;
    }
    return price;
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getOrdersByStatus = (status: string) => 
    filteredOrders.filter(order => order.status === status);

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Orders List */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="glass mb-6">
              <TabsTrigger value="all">All Orders ({filteredOrders.length})</TabsTrigger>
              <TabsTrigger value="processing">Processing ({getOrdersByStatus("processing").length})</TabsTrigger>
              <TabsTrigger value="shipped">Shipped ({getOrdersByStatus("shipped").length})</TabsTrigger>
              <TabsTrigger value="delivered">Delivered ({getOrdersByStatus("delivered").length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No orders found</p>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Package;
                  return (
                    <div key={order.id} className="glass rounded-2xl p-6 hover-lift">
                      {/* Order Header */}
                      <div className="flex items-start justify-between mb-4 pb-4 border-b border-border/40">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">{order.id}</h3>
                            <Badge className={statusConfig[order.status as keyof typeof statusConfig]?.color || "bg-muted"}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig[order.status as keyof typeof statusConfig]?.label || order.status}
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
                          <p className="text-2xl font-bold text-primary">{formatPrice(order.total)}</p>
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
                              <p className="text-sm font-semibold text-primary">{formatPrice(product.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-wrap">
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
                })
              )}
            </TabsContent>

            <TabsContent value="processing" className="space-y-4">
              {getOrdersByStatus("processing").length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No orders currently processing</p>
                </div>
              ) : (
                getOrdersByStatus("processing").map((order) => {
                  const StatusIcon = statusConfig.processing.icon;
                  return (
                    <div key={order.id} className="glass rounded-2xl p-6 hover-lift">
                      <div className="flex items-start justify-between mb-4 pb-4 border-b border-border/40">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">{order.id}</h3>
                            <Badge className={statusConfig.processing.color}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig.processing.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Ordered on {order.date} • {order.items} {order.items === 1 ? "item" : "items"}
                          </p>
                          <p className="text-sm text-muted-foreground">From {order.store}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Total</p>
                          <p className="text-2xl font-bold text-primary">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                      <div className="space-y-3 mb-4">
                        {order.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1">
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm font-semibold text-primary">{formatPrice(product.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Contact Seller</Button>
                      </div>
                    </div>
                  );
                })
              )}
            </TabsContent>

            <TabsContent value="shipped" className="space-y-4">
              {getOrdersByStatus("shipped").length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No orders currently shipped</p>
                </div>
              ) : (
                getOrdersByStatus("shipped").map((order) => {
                  const StatusIcon = statusConfig.shipped.icon;
                  return (
                    <div key={order.id} className="glass rounded-2xl p-6 hover-lift">
                      <div className="flex items-start justify-between mb-4 pb-4 border-b border-border/40">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">{order.id}</h3>
                            <Badge className={statusConfig.shipped.color}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig.shipped.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Ordered on {order.date} • {order.items} {order.items === 1 ? "item" : "items"}
                          </p>
                          <p className="text-sm text-muted-foreground">From {order.store}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Total</p>
                          <p className="text-2xl font-bold text-primary">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                      <div className="space-y-3 mb-4">
                        {order.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1">
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm font-semibold text-primary">{formatPrice(product.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button variant="outline" size="sm"><Truck className="w-4 h-4 mr-2" />Track Order</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Contact Seller</Button>
                      </div>
                    </div>
                  );
                })
              )}
            </TabsContent>

            <TabsContent value="delivered" className="space-y-4">
              {getOrdersByStatus("delivered").length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No delivered orders</p>
                </div>
              ) : (
                getOrdersByStatus("delivered").map((order) => {
                  const StatusIcon = statusConfig.delivered.icon;
                  return (
                    <div key={order.id} className="glass rounded-2xl p-6 hover-lift">
                      <div className="flex items-start justify-between mb-4 pb-4 border-b border-border/40">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">{order.id}</h3>
                            <Badge className={statusConfig.delivered.color}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig.delivered.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Ordered on {order.date} • {order.items} {order.items === 1 ? "item" : "items"}
                          </p>
                          <p className="text-sm text-muted-foreground">From {order.store}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Total</p>
                          <p className="text-2xl font-bold text-primary">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                      <div className="space-y-3 mb-4">
                        {order.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1">
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm font-semibold text-primary">{formatPrice(product.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button variant="outline" size="sm">Write Review</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Contact Seller</Button>
                        <Button variant="outline" size="sm">Buy Again</Button>
                      </div>
                    </div>
                  );
                })
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
