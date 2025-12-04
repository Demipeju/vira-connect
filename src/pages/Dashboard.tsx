import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, ShoppingBag, Eye, MessageCircle, ArrowUpRight, Package, User, Heart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const isSeller = user?.role === "seller";
  const hasStore = user?.hasStore;

  const emptyRevenueData = [
    { month: "Jan", revenue: 0 }, { month: "Feb", revenue: 0 }, { month: "Mar", revenue: 0 },
    { month: "Apr", revenue: 0 }, { month: "May", revenue: 0 }, { month: "Jun", revenue: 0 },
    { month: "Jul", revenue: 0 }, { month: "Aug", revenue: 0 }, { month: "Sep", revenue: 0 },
    { month: "Oct", revenue: 0 }, { month: "Nov", revenue: 0 }, { month: "Dec", revenue: 0 },
  ];

  const stats = isSeller ? [
    { title: "Total Revenue", value: "$0.00", change: "0%", icon: DollarSign, color: "text-accent" },
    { title: "Total Orders", value: "0", change: "0%", icon: ShoppingBag, color: "text-primary" },
    { title: "Store Visits", value: "0", change: "0%", icon: Eye, color: "text-primary" },
    { title: "New Messages", value: "0", change: "0%", icon: MessageCircle, color: "text-accent" },
  ] : [
    { title: "Total Spent", value: "$0.00", change: "0%", icon: DollarSign, color: "text-accent" },
    { title: "Orders Placed", value: "0", change: "0%", icon: ShoppingBag, color: "text-primary" },
    { title: "Wishlist Items", value: "0", change: "0%", icon: Heart, color: "text-primary" },
    { title: "Messages", value: "0", change: "0%", icon: MessageCircle, color: "text-accent" },
  ];

  const handleCreateStore = () => { updateUser({ hasStore: true }); navigate("/seller-store"); };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{isSeller ? "Seller" : "Buyer"} <span className="text-gradient">Dashboard</span></h1>
              <p className="text-muted-foreground">Welcome back, {user?.username}!</p>
            </div>
            {isSeller && (
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={hasStore ? () => navigate("/seller-store") : handleCreateStore}>
                {hasStore ? "View Store" : "Create Store"}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-accent"><ArrowUpRight className="w-4 h-4" /><span>{stat.change}</span></div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-1">{isSeller ? "Monthly Revenue" : "Monthly Spending"}</h3>
                <p className="text-2xl font-bold text-primary mb-4">$0.00</p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={emptyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">{isSeller ? "Recent Orders" : "Recent Purchases"}</h3>
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-24 h-24 mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Package className="w-12 h-12 text-primary/50" />
                  </div>
                  <p className="text-sm text-muted-foreground">{isSeller ? "Start selling to see orders" : "Your purchases will appear here"}</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate(isSeller ? "/seller-store" : "/marketplace")}>
                    <ShoppingBag className="w-4 h-4 mr-2" />{isSeller ? (hasStore ? "Add Product" : "Create Store") : "Browse Marketplace"}
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/chat")}>
                    <MessageCircle className="w-4 h-4 mr-2" />View Messages
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/profile")}>
                    <User className="w-4 h-4 mr-2" />Manage Profile
                  </Button>
                </div>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">{isSeller ? "Top Products" : "Wishlist"}</h3>
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    {isSeller ? <TrendingUp className="w-10 h-10 text-accent/50" /> : <Heart className="w-10 h-10 text-accent/50" />}
                  </div>
                  <p className="text-sm text-muted-foreground text-center">{isSeller ? "Start selling to view top products" : "Save items to your wishlist"}</p>
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
