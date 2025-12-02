import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const tab = form.dataset.tab; // "signin" or "signup"

    setTimeout(() => {
      if (tab === "signup") {
        // Save user in localStorage
        const newUser = {
          name: formData.get("signup-name"),
          email: formData.get("signup-email"),
          password: formData.get("signup-password"),
          accountType: formData.get("account-type"),
        };
        localStorage.setItem("viraUser", JSON.stringify(newUser));
        navigate("/marketplace"); // redirect after signup
      } else if (tab === "signin") {
        const savedUser = localStorage.getItem("viraUser");
        if (!savedUser) {
          setError("No user found. Please sign up first.");
          setIsLoading(false);
          return;
        }
        const user = JSON.parse(savedUser);
        if (
          user.email === formData.get("email") &&
          user.password === formData.get("password")
        ) {
          // Successful login
          navigate("/marketplace"); // redirect after login
        } else {
          setError("Invalid email or password.");
        }
      }
      setIsLoading(false);
    }, 1000);
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

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form data-tab="signup" onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="signup-name" name="signup-name" type="text" placeholder="John Doe" className="pl-10 bg-background/50" required />
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

                  <div className="space-y-2">
                    <Label htmlFor="account-type">I want to</Label>
                    <select id="account-type" name="account-type" className="w-full px-3 py-2 rounded-lg border border-input bg-background/50 text-foreground">
                      <option value="buyer">Buy products</option>
                      <option value="seller">Sell products</option>
                      <option value="both">Both</option>
                    </select>
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
