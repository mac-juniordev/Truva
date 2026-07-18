import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from './auth.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (status: boolean) => void;
  setLoading: (status: boolean) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      
      setUser: (user) => set({ user }),
      
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      
      setLoading: (status) => set({ isLoading: status }),
      
      logout: () => {
        // Clear storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        // Reset state
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      
      hydrate: () => {
        // Check if user is stored
        const token = localStorage.getItem('access_token');
        if (token) {
          set({ isAuthenticated: true, isLoading: false });
        } else {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);