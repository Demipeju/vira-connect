import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (username: string, email: string, password: string) => void;
  logout: () => void;
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

  const signup = (username: string, email: string, password: string) => {
    const newUser = { username, email };
    localStorage.setItem("viraUser", JSON.stringify(newUser));
    localStorage.setItem("viraPassword", password);
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
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
