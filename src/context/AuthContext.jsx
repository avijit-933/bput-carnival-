import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS } from '../data/mockData';

const AuthContext = createContext();

const LOCAL_STORAGE_KEY = 'meil_esg_auth_user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    }
    // Default to Dr. K. V. Rao (Admin)
    return DEMO_USERS[0];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentUser));
    } catch (e) {
      console.error('Failed to persist user to localStorage', e);
    }
  }, [currentUser]);

  const login = (email, password, roleHint = null) => {
    let matched = null;
    if (roleHint) {
      matched = DEMO_USERS.find(u => u.role.toUpperCase() === roleHint.toUpperCase());
    } else if (email) {
      matched = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    }
    if (!matched) {
      // Default to matching role or admin
      matched = DEMO_USERS.find(u => u.role === (roleHint || 'ADMIN')) || DEMO_USERS[0];
    }
    setCurrentUser(matched);
    return matched;
  };

  const switchRole = (newRole) => {
    const targetUser = DEMO_USERS.find(u => u.role === newRole);
    if (targetUser) {
      setCurrentUser(targetUser);
      return targetUser;
    }
    return currentUser;
  };

  const logout = () => {
    // For seamless testing, can either clear or redirect to login
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      currentRole: currentUser?.role || 'GUEST',
      isAuthenticated: !!currentUser,
      login,
      switchRole,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
