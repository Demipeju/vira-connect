import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: "buyer" | "seller";
  hasStore?: boolean;
  address?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (username: string, fullName: string, email: string, phone: string, password: string, role: "buyer" | "seller") => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("viraUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = (username: string, fullName: string, email: string, phone: string, password: string, role: "buyer" | "seller") => {
    const newUser: User = { username, fullName, email, phone, role, hasStore: false };
    localStorage.setItem("viraUser", JSON.stringify(newUser));
    localStorage.setItem("viraPassword", password);
    // Clear orders and messages for new users
    localStorage.removeItem("viraOrders");
    localStorage.removeItem("viraConversations");
    setUser(newUser);
    toast.success("Account created successfully!");
    navigate("/marketplace");
  };

  const login = (email: string, password: string): boolean => {
    const savedUser = localStorage.getItem("viraUser");
    const savedPassword = localStorage.getItem("viraPassword");
    
    if (!savedUser) {
      toast.error("No account found. Please sign up first.");
      return false;
    }

    const user = JSON.parse(savedUser);
    if (user.email === email && savedPassword === password) {
      setUser(user);
      toast.success(`Welcome back, ${user.username}!`);
      navigate("/marketplace");
      return true;
    } else {
      toast.error("Invalid email or password.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("viraUser", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
