import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { useCreateCheckoutSession } from '@/hooks/useQueries';
import { toast } from 'sonner';
import type { ShoppingItem } from '@/backend';

export default function SecurityToolkit() {
  const createCheckout = useCreateCheckoutSession();

  const handlePurchase = async (tier: 'basic' | 'pro' | 'proplus') => {
    const items: Record<string, ShoppingItem> = {
      basic: {
        productName: 'AI & Startup Security Toolkit - Basic',
        productDescription: 'PDF templates for startup security',
        priceInCents: BigInt(799900),
        currency: 'INR',
        quantity: BigInt(1),
      },
      pro: {
        productName: 'AI & Startup Security Toolkit - Pro',
        productDescription: 'PDF + Editable Docs',
        priceInCents: BigInt(999900),
        currency: 'INR',
        quantity: BigInt(1),
      },
      proplus: {
        productName: 'AI & Startup Security Toolkit - Pro+',
        productDescription: 'Editable Docs + Bonus SOC Mini Playbook',
        priceInCents: BigInt(1499900),
        currency: 'INR',
        quantity: BigInt(1),
      },
    };

    try {
      const session = await createCheckout.mutateAsync([items[tier]]);
      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }
      window.location.href = session.url;
    } catch (error) {
      toast.error('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-navy/90" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Most Indian Startups Are One AI Mistake Away from a Data Breach
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Implement structured AI governance and cybersecurity systems in 30 days with our complete toolkit.
            </p>
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8">
              <a href="#pricing">Get Started</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Mockup Previews */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 text-center">
              Professional Security Deliverables
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center">
              Digital security systems should not appear abstract. Here's what you'll receive:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <img
                  src="/assets/generated/ai-governance-policy-mockup.dim_800x600.png"
                  alt="AI Governance Policy Template"
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                <h3 className="text-xl font-semibold text-navy mb-2">AI Governance Policy Template</h3>
                <p className="text-gray-600">Comprehensive policy framework for AI tool usage and data handling</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <img
                  src="/assets/generated/risk-register-dashboard-mockup.dim_800x600.png"
                  alt="Risk Register Dashboard"
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                <h3 className="text-xl font-semibold text-navy mb-2">Risk Register Dashboard</h3>
                <p className="text-gray-600">Track and manage security risks with visual priority indicators</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <img
                  src="/assets/generated/incident-response-playbook-mockup.dim_800x600.png"
                  alt="Incident Response Playbook"
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                <h3 className="text-xl font-semibold text-navy mb-2">Incident Response Playbook</h3>
                <p className="text-gray-600">Step-by-step procedures for handling security incidents</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <img
                  src="/assets/generated/executive-kpi-dashboard-mockup.dim_800x600.png"
                  alt="Executive Security KPI Dashboard"
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                <h3 className="text-xl font-semibold text-navy mb-2">Executive Security KPI Dashboard</h3>
                <p className="text-gray-600">Monitor security metrics and compliance status at a glance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
              Complete Security System in One Package
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-navy flex items-center gap-2">
                    <Shield className="h-6 w-6 text-emerald-600" />
                    Module 1: AI Governance Framework
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">AI Tool Usage Policy</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Data Classification Guidelines</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Approved AI Tools List</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Employee Training Checklist</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-navy flex items-center gap-2">
                    <Shield className="h-6 w-6 text-emerald-600" />
                    Module 2: Compliance & Risk Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">DPDP Act 2023 Compliance Checklist</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Risk Register Template</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Vendor Security Assessment</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Audit Trail Documentation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-navy flex items-center gap-2">
                    <Shield className="h-6 w-6 text-emerald-600" />
                    Module 3: Incident Response System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Incident Response Playbook</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Breach Notification Templates</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Communication Scripts</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Post-Incident Review Framework</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-navy flex items-center gap-2">
                    <Shield className="h-6 w-6 text-emerald-600" />
                    Module 4: Executive Dashboards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Security KPI Dashboard</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Monthly Security Report Template</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Board-Ready Security Summary</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Compliance Status Tracker</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 text-center">Choose Your Tier</h2>
            <p className="text-lg text-gray-600 mb-12 text-center">
              All tiers include the complete 4-module security system
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Tier */}
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <Badge className="w-fit mb-2">Basic</Badge>
                  <CardTitle className="text-navy">PDF Templates</CardTitle>
                  <CardDescription>Perfect for getting started quickly</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-navy">₹7,999</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">All 4 modules (PDF format)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Instant download</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Implementation guide</span>
                    </li>
                  </ul>
                  <Button
                    onClick={() => handlePurchase('basic')}
                    disabled={createCheckout.isPending}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    {createCheckout.isPending ? 'Processing...' : 'Get Basic'}
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Tier */}
              <Card className="border-2 border-emerald-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-emerald-600">Most Popular</Badge>
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-emerald-100 text-emerald-700">Pro</Badge>
                  <CardTitle className="text-navy">PDF + Editable Docs</CardTitle>
                  <CardDescription>Customize for your startup</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-navy">₹9,999</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Everything in Basic</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Editable Word/Excel files</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Customization instructions</span>
                    </li>
                  </ul>
                  <Button
                    onClick={() => handlePurchase('pro')}
                    disabled={createCheckout.isPending}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    {createCheckout.isPending ? 'Processing...' : 'Get Pro'}
                  </Button>
                </CardContent>
              </Card>

              {/* Pro+ Tier */}
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-navy text-white">Pro+</Badge>
                  <CardTitle className="text-navy">Complete Package</CardTitle>
                  <CardDescription>Maximum value with bonus content</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-navy">₹14,999</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Everything in Pro</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Bonus: SOC Mini Playbook</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Priority email support</span>
                    </li>
                  </ul>
                  <Button
                    onClick={() => handlePurchase('proplus')}
                    disabled={createCheckout.isPending}
                    className="w-full bg-navy hover:bg-navy/90"
                  >
                    {createCheckout.isPending ? 'Processing...' : 'Get Pro+'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Upsell Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-500/10 via-navy/5 to-emerald-500/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Need Hands-On Implementation Support?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Upgrade to Founder Advisory for guided execution. Get personalized strategy sessions, implementation roadmaps, and ongoing security oversight.
            </p>
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8">
              <Link to="/security-advisory">
                Explore Founder Advisory <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  How is this different from generic security templates?
                </AccordionTrigger>
                <AccordionContent>
                  These templates are built specifically for Indian startups, with DPDP Act 2023 compliance built in,
                  AI governance focus, and practical implementation guidance from real SOC experience.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Do I need technical expertise to use this?</AccordionTrigger>
                <AccordionContent>
                  No. The toolkit is designed for founders and non-technical teams. Each template includes clear
                  instructions and implementation steps.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">What format are the files delivered in?</AccordionTrigger>
                <AccordionContent>
                  Basic tier: PDF files. Pro tier: PDF + editable Word/Excel files. Pro+ tier: All formats plus bonus
                  content.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">Is there a refund policy?</AccordionTrigger>
                <AccordionContent>
                  Yes. We offer a 7-day no-risk guarantee. If you're not satisfied, contact us for a full refund.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">Can I get help implementing these systems?</AccordionTrigger>
                <AccordionContent>
                  Yes. Consider our Founder Advisory program for hands-on implementation support, strategy sessions, and
                  ongoing security oversight.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
