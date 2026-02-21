import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useRecordLeadDownload } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { trackLinkedInConversion } from '@/lib/tracking';

export default function FreeChecklist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const recordLead = useRecordLeadDownload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      await recordLead.mutateAsync({ email, version: 'v1.0', source: 'Free Checklist Page' });
      
      // Fire LinkedIn conversion tracking
      trackLinkedInConversion('XXXXXXX');
      
      setSubmitted(true);
      toast.success('Success! Check your email for the checklist.');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12">
        <div className="container max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-emerald-500" />
              </div>
              <CardTitle className="text-3xl text-navy">Thank You!</CardTitle>
              <CardDescription className="text-lg">
                Your AI Risk Checklist is on its way to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Please check your email (including spam folder) for the download link. If you don't receive it within a
                few minutes, please contact us.
              </p>
              <p className="text-sm text-gray-500">
                While you wait, explore our{' '}
                <a href="/products/toolkit" className="text-emerald-600 hover:underline">
                  Security Toolkit
                </a>{' '}
                for comprehensive startup security solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12">
      <div className="container max-w-3xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl text-navy mb-4">
              AI Risk Self-Assessment Checklist for Indian Startups
            </CardTitle>
            <CardDescription className="text-lg">
              Identify your startup's AI & cyber risk exposure in 10 minutes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <h3 className="font-semibold text-navy mb-4">Includes:</h3>
              <ul className="space-y-3">
                {[
                  '25-question risk assessment',
                  'Risk scoring framework',
                  'Basic compliance awareness checklist',
                  'Quick action recommendations',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-navy">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                disabled={recordLead.isPending}
              >
                {recordLead.isPending ? 'Sending...' : 'Download Free Checklist'}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                By downloading, you agree to receive occasional emails about cybersecurity insights. Unsubscribe
                anytime.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
