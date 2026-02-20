import { Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import AdminNav from '@/components/admin/AdminNav';
import { Button } from '@/components/ui/button';
import { LogOut, Loader2 } from 'lucide-react';

export default function AdminLayout() {
  const { isAuthenticated, isAdmin, isLoading } = useAdminAuth();
  const { login, clear, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Not authenticated, stay on admin page to show login
    }
  }, [isLoading, isAuthenticated]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-navy to-navy/90">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-navy mb-2">Admin Panel</h1>
            <p className="text-gray-600">Sign in with Internet Identity to access the admin dashboard</p>
          </div>
          <Button
            onClick={handleLogin}
            disabled={loginStatus === 'logging-in'}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
          >
            {loginStatus === 'logging-in' ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🚫</span>
            </div>
            <h1 className="text-2xl font-bold text-navy mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access the admin panel.</p>
          </div>
          <div className="space-y-3">
            <Button onClick={handleLogout} variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
            <Button onClick={() => navigate({ to: '/' })} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav onLogout={handleLogout} />
      <div className="flex-1 ml-64">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
