import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  MessageCircle,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,458",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-accent",
    },
    {
      title: "Total Orders",
      value: "342",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingBag,
      color: "text-primary",
    },
    {
      title: "Store Visits",
      value: "2,456",
      change: "+23.1%",
      trend: "up",
      icon: Eye,
      color: "text-primary-glow",
    },
    {
      title: "New Messages",
      value: "18",
      change: "-2.4%",
      trend: "down",
      icon: MessageCircle,
      color: "text-accent",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      product: "Handmade Ceramic Vase",
      customer: "Sarah Johnson",
      amount: "$89.99",
      status: "Completed",
    },
    {
      id: "ORD-002",
      product: "Artisan Coffee Mug Set",
      customer: "Mike Chen",
      amount: "$45.00",
      status: "Processing",
    },
    {
      id: "ORD-003",
      product: "Decorative Pottery Bowl",
      customer: "Emma Wilson",
      amount: "$65.00",
      status: "Shipped",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Seller <span className="text-gradient">Dashboard</span>
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your store.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              View Store
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === "up" ? "text-accent" : "text-destructive"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Revenue Chart Placeholder */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Revenue Overview</h3>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-xl">
                  <p className="text-muted-foreground">Chart coming soon...</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Recent Orders</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-muted/20 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-medium text-muted-foreground">{order.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "Completed"
                              ? "bg-accent/20 text-accent"
                              : order.status === "Processing"
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="font-medium text-sm">{order.product}</p>
                        <p className="text-xs text-muted-foreground">{order.customer}</p>
                      </div>
                      <span className="font-bold text-primary">{order.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Create Promotion
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    View Messages
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Profile
                  </Button>
                </div>
              </div>

              {/* Top Products */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Top Products</h3>
                <div className="space-y-3">
                  {[
                    { name: "Ceramic Vase", sales: 156 },
                    { name: "Coffee Mug Set", sales: 142 },
                    { name: "Pottery Bowl", sales: 98 },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{product.name}</span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {product.sales} sales
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
