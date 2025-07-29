import React, { createContext, useState, useEffect, useCallback, useContext } from 'react'; // Added useContext

const UserContext = createContext();
const URL = import.meta.env.VITE_API_BASE_URL;
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  const refreshUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setUser(null);
        return;
      }

      const response = await fetch('${URL}/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data); // Ensure avatar is included
      } else {
        throw new Error(data.message || 'Failed to refresh user data');
      }
    } catch (error) {
      console.error('Refresh user data error:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }, []);

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  // Trigger refresh on auth state change
  useEffect(() => {
    if (isAuthenticated) {
      refreshUserData();
    } else {
      setUser(null); // Explicitly clear user on logout
    }
  }, [isAuthenticated, refreshUserData]);

  return (
    <UserContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated, refreshUserData, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export const useUser = () => useContext(UserContext); // Ensure useContext is imported
