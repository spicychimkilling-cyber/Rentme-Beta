import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../lib/appwrite';
import { ID } from 'appwrite';

interface User {
  id: string;
  name?: string;
  email?: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await account.get();
      setUser({
        id: res.$id,
        name: res.name,
        email: res.email,
      });
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession({ email, password });
    await fetchUser();
  };

  // SIGNUP
  const signup = async (name: string, email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      await fetchUser();
    } catch (err) {
      // Surface rate limit or other Appwrite errors to callers
      const code = (err as any)?.code;
      const message = (err as any)?.message || 'Signup failed';
      if (code === 429) {
        // Throw a clearer error for UI to show
        throw new Error('Rate limit exceeded. Please wait and try again.');
      }
      // Re-throw original Appwrite error message for other cases
      throw new Error(message);
    }
  };


  const logout = async () => {
    await account.deleteSessions();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used in AuthProvider');
  return context;
};
