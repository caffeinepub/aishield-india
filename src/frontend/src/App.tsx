import { lazy, Suspense, useEffect } from 'react';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/Layout';
import SecurityHeadersValidator from '@/components/SecurityHeadersValidator';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const SecurityAdvisory = lazy(() => import('@/pages/SecurityAdvisory'));
const AdvisoryConfirmation = lazy(() => import('@/pages/AdvisoryConfirmation'));
const FreeChecklist = lazy(() => import('@/pages/FreeChecklist'));
const SecurityToolkit = lazy(() => import('@/pages/products/SecurityToolkit'));
const SOCPlaybook = lazy(() => import('@/pages/products/SOCPlaybook'));
const SecurityToolkitPositioning = lazy(() => import('@/pages/products/SecurityToolkitPositioning'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('@/pages/TermsConditions'));
const RefundPolicy = lazy(() => import('@/pages/RefundPolicy'));
const PaymentSuccess = lazy(() => import('@/pages/PaymentSuccess'));
const PaymentFailure = lazy(() => import('@/pages/PaymentFailure'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <>
      {import.meta.env.DEV && <SecurityHeadersValidator />}
      <Layout />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Home />
    </Suspense>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <About />
    </Suspense>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Contact />
    </Suspense>
  ),
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Blog />
    </Suspense>
  ),
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/$postId',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BlogPost />
    </Suspense>
  ),
});

const securityAdvisoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/security-advisory',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SecurityAdvisory />
    </Suspense>
  ),
});

const advisoryConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/advisory-confirmation',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AdvisoryConfirmation />
    </Suspense>
  ),
});

const freeChecklistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/free-checklist',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <FreeChecklist />
    </Suspense>
  ),
});

const toolkitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/toolkit',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SecurityToolkit />
    </Suspense>
  ),
});

const socPlaybookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/soc-playbook',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SOCPlaybook />
    </Suspense>
  ),
});

const toolkitPositioningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/toolkit-positioning',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SecurityToolkitPositioning />
    </Suspense>
  ),
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PrivacyPolicy />
    </Suspense>
  ),
});

const termsConditionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-conditions',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <TermsConditions />
    </Suspense>
  ),
});

const refundPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/refund-policy',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RefundPolicy />
    </Suspense>
  ),
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  ),
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentFailure />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  contactRoute,
  blogRoute,
  blogPostRoute,
  securityAdvisoryRoute,
  advisoryConfirmationRoute,
  freeChecklistRoute,
  toolkitRoute,
  socPlaybookRoute,
  toolkitPositioningRoute,
  privacyPolicyRoute,
  termsConditionsRoute,
  refundPolicyRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Google Analytics page view tracking
function useGoogleAnalytics() {
  useEffect(() => {
    // Track initial page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: window.location.pathname + window.location.search,
        page_title: document.title,
      });
    }

    // Subscribe to route changes
    const unsubscribe = router.subscribe('onLoad', () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', {
          page_path: window.location.pathname + window.location.search,
          page_title: document.title,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
}

export default function App() {
  useGoogleAnalytics();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}
