import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BlogPost, ShoppingItem } from '@/backend';

export function useGetBlogPosts() {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      if (!actor) return [];
      const posts = await actor.getBlogPostsByTag('');
      return posts.sort((a, b) => Number(b.publishDate) - Number(a.publishDate));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBlogPost(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPost | null>({
    queryKey: ['blogPost', id],
    queryFn: async () => {
      if (!actor) return null;
      const posts = await actor.getBlogPostsByTag('');
      return posts.find((post) => post.id.toString() === id) || null;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; company: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactForm(data.name, data.email, data.company, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
  });
}

export function useRecordLeadDownload() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: { email: string; version: string; source: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.recordLeadDownload(data.email, data.version, data.source);
    },
  });
}

export function useSubmitAdvisoryApplication() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      fullName: string;
      workEmail: string;
      companyName: string;
      companyWebsite: string;
      companySize: string;
      industry: string;
      fundingStage: string;
      currentSecuritySetup: string;
      primaryConcern: string;
      estimatedBudgetRange: string;
      source: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitAdvisoryApplication(
        data.fullName,
        data.workEmail,
        data.companyName,
        data.companyWebsite,
        data.companySize,
        data.industry,
        data.fundingStage,
        data.currentSecuritySetup,
        data.primaryConcern,
        data.estimatedBudgetRange,
        data.source
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advisoryApplications'] });
    },
  });
}

export type CheckoutSession = {
  id: string;
  url: string;
};

export function useCreateCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (items: ShoppingItem[]): Promise<CheckoutSession> => {
      if (!actor) throw new Error('Actor not available');
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/payment-failure`;
      const result = await actor.createCheckoutSession(items, successUrl, cancelUrl);
      const session = JSON.parse(result) as CheckoutSession;
      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }
      return session;
    },
  });
}
