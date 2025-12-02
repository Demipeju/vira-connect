import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signup, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/marketplace");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const tab = form.dataset.tab;

    setTimeout(() => {
      if (tab === "signup") {
        const username = formData.get("signup-username") as string;
        const email = formData.get("signup-email") as string;
        const password = formData.get("signup-password") as string;
        signup(username, email, password);
      } else if (tab === "signin") {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        login(email, password);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-primary animate-sparkle" />
      <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-accent animate-sparkle" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/4 w-2 h-2 rounded-full bg-primary-glow animate-sparkle" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-md mx-auto">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>

          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
              <Store className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold">VIRA</span>
          </div>

          <div className="glass rounded-3xl p-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form data-tab="signin" onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="email" name="email" type="email" placeholder="you@example.com" className="pl-10 bg-background/50" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-10 bg-background/50" required />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-border" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <a href="#" className="text-primary hover:text-primary/80">Forgot password?</a>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form data-tab="signup" onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="signup-username" name="signup-username" type="text" placeholder="johndoe" className="pl-10 bg-background/50" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="signup-email" name="signup-email" type="email" placeholder="you@example.com" className="pl-10 bg-background/50" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="signup-password" name="signup-password" type="password" placeholder="••••••••" className="pl-10 bg-background/50" required />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <input type="checkbox" className="mt-1 rounded border-border" required />
                    <span className="text-muted-foreground">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:text-primary/80">Terms of Service</a> and{" "}
                      <a href="#" className="text-primary hover:text-primary/80">Privacy Policy</a>
                    </span>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Protected by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
