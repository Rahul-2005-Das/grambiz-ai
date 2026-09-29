import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  resetUser: () => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (val: boolean) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'user_demo_1',
  name: 'Ramesh',
  phone: '9876543210',
  state: 'West Bengal',
  district: 'Nadia',
  villageOrTown: 'Ranaghat Block',
  businessStatus: 'new',
  selectedBusiness: 'Mini Dairy & Fresh Milk Collection',
  businessCategory: 'Dairy',
  availableCapital: 35000,
  skills: ['Farming / Livestock'],
  hasSpaceOrShop: true,
  workPreference: 'full_time',
  onboardingCompleted: false,
  accessibility: {
    largeText: false,
    highContrast: false,
    voiceAssistance: true,
    largeButtons: false
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('grambiz_user');
      if (saved) {
        try {
          return { ...DEFAULT_USER, ...JSON.parse(saved) };
        } catch (e) {
          // ignore error
        }
      }
    }
    return DEFAULT_USER;
  });

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem('grambiz_user', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const setHasCompletedOnboarding = (val: boolean) => {
    updateUser({ onboardingCompleted: val });
  };

  const resetUser = () => {
    setUser({ ...DEFAULT_USER, onboardingCompleted: false });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('grambiz_user');
      localStorage.removeItem('grambiz_lang_chosen');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        resetUser,
        hasCompletedOnboarding: user.onboardingCompleted,
        setHasCompletedOnboarding
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
