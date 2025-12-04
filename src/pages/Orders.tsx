import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, ShoppingBag, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Order {
  id: string;
  date: string;
  items: number;
  total: number;
  status: string;
  store: string;
  createdAt?: number;
  products?: { name: string; price: number; quantity: number; image: string; }[];
}

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("viraOrders");
    return saved ? JSON.parse(saved) : [];
  });

  const canCancelOrder = (order: Order) => {
    if (!order.createdAt) return false;
    const oneHourInMs = 60 * 60 * 1000;
    return (Date.now() - order.createdAt) < oneHourInMs && order.status === "processing";
  };

  const cancelOrder = (orderId: string) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: "cancelled" } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("viraOrders", JSON.stringify(updatedOrders));
    toast.success("Order cancelled successfully");
  };

  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (statusFilter !== "all") filtered = filtered.filter((order) => order.status === statusFilter);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((order) =>
        order.id.toLowerCase().includes(query) || order.store.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [orders, statusFilter, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-accent/20 text-accent";
      case "shipped": return "bg-primary/20 text-primary";
      case "processing": return "bg-amber-500/20 text-amber-600";
      case "cancelled": return "bg-destructive/20 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Your <span className="text-gradient">Orders</span></h1>
            <p className="text-muted-foreground">Track and manage all your purchases</p>
          </div>
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-10 bg-background/50" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 bg-background/50"><SelectValue placeholder="Filter by status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {filteredOrders.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-primary/50" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">When you make a purchase, your orders will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="glass rounded-2xl p-6 hover-lift">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Package className="w-6 h-6 text-primary" /></div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold">{order.id}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.store}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">${order.total.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      {canCancelOrder(order) && (
                        <Button variant="outline" size="sm" onClick={() => cancelOrder(order.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                          <X className="w-4 h-4 mr-1" />Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                  {order.products && order.products.length > 0 && (
                    <div className="border-t border-border/40 pt-4">
                      <div className="flex gap-4 overflow-x-auto pb-2">
                        {order.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-3 min-w-fit">
                            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                            <div>
                              <p className="text-sm font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground">Qty: {product.quantity} × ${product.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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

export default Orders;
