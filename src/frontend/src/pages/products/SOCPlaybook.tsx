import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useCreateCheckoutSession } from '@/hooks/useQueries';
import { toast } from 'sonner';
import type { ShoppingItem } from '@/backend';

export default function SOCPlaybook() {
  const createCheckout = useCreateCheckoutSession();

  const handlePurchase = async () => {
    const item: ShoppingItem = {
      productName: 'SOC Analyst Playbook - Practical Edition',
      productDescription: 'For L1/L2 Analysts and Cybersecurity Students',
      priceInCents: BigInt(299900),
      currency: 'INR',
      quantity: BigInt(1),
    };

    try {
      const session = await createCheckout.mutateAsync([item]);
      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }
      window.location.href = session.url;
    } catch (error) {
      toast.error('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] py-16 md:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Card
            className="bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: 'url(/assets/generated/product-card-bg.dim_600x400.png)' }}
          >
            <div className="absolute inset-0 bg-white/95" />
            <CardHeader className="relative z-10 text-center">
              <CardTitle className="text-3xl md:text-4xl text-navy mb-4">
                SOC Analyst Playbook – Practical Edition
              </CardTitle>
              <p className="text-lg text-gray-600">For L1 / L2 Analysts and Cybersecurity Students</p>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="mb-8">
                <h3 className="font-semibold text-navy mb-4 text-lg">Includes:</h3>
                <ul className="space-y-3">
                  {[
                    'Incident investigation checklist',
                    'MITRE mapping template',
                    'Alert triage decision tree',
                    'Phishing analysis worksheet',
                    'Incident report template',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6 text-center">
                <p className="text-4xl font-bold text-emerald-600 mb-2">₹2,999</p>
                <p className="text-gray-600">One-time payment</p>
              </div>

              <Button
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg"
                onClick={handlePurchase}
                disabled={createCheckout.isPending}
              >
                {createCheckout.isPending ? 'Processing...' : 'Download Now'}
              </Button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Instant digital download after purchase. Perfect for building practical SOC skills.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
