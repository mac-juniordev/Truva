import { useEffect } from 'react';
import { useAuthStore } from '../features/auth/auth.store';
import { getCurrentUser } from '../features/auth/auth.api';

/**
 * Custom hook for authentication
 * Handles loading user data and managing auth state
 */
export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, setAuthenticated, setLoading, logout } = useAuthStore();

  // Load user data on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setAuthenticated(true);
      } catch (error) {
        console.error(error);
        
        // Token is invalid or expired
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [setUser, setAuthenticated, setLoading]);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
  };
}