import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, MapPin, Phone, Camera, Wallet, CreditCard, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              My <span className="text-gradient">Profile</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-6 text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-background shadow-strong"
                  />
                  <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover-glow">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-xl font-bold mb-1">John Doe</h2>
                <p className="text-sm text-muted-foreground mb-4">john.doe@example.com</p>
                <div className="flex items-center justify-center gap-2 text-xs text-accent mb-4">
                  <Shield className="w-4 h-4" />
                  <span>Verified Account</span>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Profile Picture
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="glass w-full justify-start mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="wallet">Wallet</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <div className="glass rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-6">Personal Information</h3>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="firstName"
                              defaultValue="John"
                              className="pl-10 bg-background/50"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="lastName"
                              defaultValue="Doe"
                              className="pl-10 bg-background/50"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="pl-10 bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            defaultValue="+1 (555) 123-4567"
                            className="pl-10 bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Textarea
                            id="address"
                            defaultValue="123 Main St, Portland, OR 97201"
                            className="pl-10 bg-background/50 min-h-[100px]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself..."
                          className="bg-background/50 min-h-[120px]"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          Save Changes
                        </Button>
                        <Button variant="outline">Cancel</Button>
                      </div>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="wallet">
                  <div className="space-y-6">
                    {/* Balance Card */}
                    <div className="glass rounded-2xl p-8 bg-gradient-hero text-primary-foreground">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-sm opacity-80 mb-1">Available Balance</p>
                          <h2 className="text-4xl font-bold">$1,245.80</h2>
                        </div>
                        <Wallet className="w-12 h-12 opacity-80" />
                      </div>
                      <div className="flex gap-3">
                        <Button className="bg-background/20 hover:bg-background/30 text-primary-foreground border border-primary-foreground/20">
                          Withdraw
                        </Button>
                        <Button className="bg-background/20 hover:bg-background/30 text-primary-foreground border border-primary-foreground/20">
                          Add Funds
                        </Button>
                      </div>
                    </div>

                    {/* Transaction History */}
                    <div className="glass rounded-2xl p-8">
                      <h3 className="text-2xl font-bold mb-6">Recent Transactions</h3>
                      <div className="space-y-4">
                        {[
                          { type: "Sale", amount: "+$89.99", date: "Jan 20, 2024", status: "completed" },
                          { type: "Purchase", amount: "-$45.00", date: "Jan 18, 2024", status: "completed" },
                          { type: "Withdrawal", amount: "-$200.00", date: "Jan 15, 2024", status: "pending" },
                        ].map((transaction, index) => (
                          <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                transaction.type === "Sale"
                                  ? "bg-accent/20"
                                  : transaction.type === "Purchase"
                                  ? "bg-primary/20"
                                  : "bg-muted"
                              }`}>
                                <CreditCard className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-medium">{transaction.type}</p>
                                <p className="text-sm text-muted-foreground">{transaction.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold ${
                                transaction.amount.startsWith("+") ? "text-accent" : "text-foreground"
                              }`}>
                                {transaction.amount}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {transaction.status}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <div className="glass rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-6">Preferences</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between py-3 border-b border-border/40">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive updates about your orders</p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border/40">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-muted-foreground">Receive promotional content</p>
                        </div>
                        <input type="checkbox" className="toggle" />
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border/40">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Get mobile notifications</p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security">
                  <div className="glass rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-6">Security Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Change Password</h4>
                        <div className="space-y-4">
                          <Input type="password" placeholder="Current password" className="bg-background/50" />
                          <Input type="password" placeholder="New password" className="bg-background/50" />
                          <Input type="password" placeholder="Confirm new password" className="bg-background/50" />
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Update Password
                          </Button>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border/40">
                        <h4 className="font-semibold mb-3">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="outline">Enable 2FA</Button>
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

export default Profile;
