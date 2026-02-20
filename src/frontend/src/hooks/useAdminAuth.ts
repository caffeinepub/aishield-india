import { useInternetIdentity } from './useInternetIdentity';
import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useAdminAuth() {
  const { identity, loginStatus, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();

  const isAuthenticated = !!identity;

  const { data: isAdmin, isLoading: isCheckingAdmin } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  const isLoading = isInitializing || actorFetching || (isAuthenticated && isCheckingAdmin);

  return {
    isAuthenticated,
    isAdmin: isAdmin ?? false,
    isLoading,
    loginStatus,
  };
}
